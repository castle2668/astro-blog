---
title: '使用 Quasar CLI 建構 SSR 網站'
excerpt: '最近專案要從 SPA 改成 SSR，雖然一般而言 SSR 是在專案開發前或者開發初期就得考量，但是事情總有個萬一，俗話說的好，需求是會成長的？總之好險 Quasar 有提供建構 SSR 的方法，這對於轉換到 SSR 會減少許多麻煩。'
tags: ['quasarframework']
date: 2020-11-29
author: '海豹人 Sealman'
image: 'development.jpg'
slug: 2020-11-29-quasar-ssr
---

## 新增 SSR 模式

透過 Quasar CLI 我們幾乎可以直接用 SPA 程式碼打造出一份 SSR 的程式碼，我們先把 SSR 模式加進去，再來看後續怎麼處理吧！

1. 首先輸入 `quasar mode add ssr` 幫我們的 Quasar 專案加上 SSR 模式
2. 成功新增模式後，透過 `quasar dev -m ssr` 運行專案
3. 順利執行後，專案底下會多出一個名為 `src-ssr` 的資料夾，裡面的檔案基本上使用預設的設定即可

## 使用 SSR 的注意事項

轉換成 SSR 模式後，首先就是要注意 SSR 與 SPA 的不同，這裡也可以參考 Vue 官方寫的 [Vue SSR Guide](https://ssr.vuejs.org/)，因為 Quasar SSR 就是基於 Vue SSR 去做包裝之後的應用。

舉例來說，透過 SSR 模式開啟網頁的話，Lifecycle 裡面的 Hooks 只有 `beforeCreate` 與 `created` 會有作用，因此我們寫在這兩個 Hooks 以外的程式碼，都需要考慮到是否會造成影響。

## 加入 PreFetch 機制

每當有人點開我們的 SSR 網站時，會類似於進入一個已經抓取好資訊的網頁，而這些資料我們會用 Vuex 來預先儲存起來。這個預存的動作就是 `PreFetch`，如果想要使用 `PreFetch` 預存資料，我們需要在 Quasar 設定檔案中加入以下程式碼。

```javascript
// quasar.conf.js
return {
  preFetch: true,
}
```

使用時要注意，其實 Quasar 在 Server 與 Client 環境下都會觸發 `preFetch` 再接著執行 `created`。

因此，如果我們有些內容需要在畫面渲染之前，就透過呼叫 API 等方式呈現給 Server 看的話，我們會使用到 `PreFetch` 這個 Hook 來率先取得資訊，而非使用 `created`。

另外，在使用 `PreFetch` 時因為不能使用 `this` 來存取資料，所以如果想要使用 `data` 裡面的某些變數，可以將它們改為存放在 Vuex，這樣就能在 `PreFetch` 中使用這些資料哩。

```javascript
// 這是一個被設定為路由的 .vue 檔案
async created() {
  if (process.env.SERVER) {
    return;
  }
  if (!this.isPreFetch) {
    await this.$store.dispatch(
      'store-name/fetchDataById',
      this.$route.params.uid,
    );
  }
},
async preFetch({ store, currentRoute }) {
  if (process.env.CLIENT) {
    return;
  }
  await store.dispatch(
    'store-name/fetchDataById',
    currentRoute.params.uid,
  );
},
```

上述範例程式碼中，我新增 `process.env` 去判斷 Server 與 Client 環境，因為我在兩個 Hook 所執行的動作是相同的，差別只在是否要給 Server 預存。如果是 Server 環境，那我就只會執行 `preFetch` 這個 Hook；如果是 Client 環境，就只會執行 `created` 的 Hook。

另外，`preFetch` 只會被路由檔案 (`src/router/routes.js`) 中直接設定的元件觸發，元件內使用到的子元件是不會觸發 `preFetch` 的。

## SEO 設定

SEO 應該是我們會從 SPA 改為 SSR 的主要原因之一，像是某些頁面或是某個商品想要被分享出去，而分享時所呈現的連結資訊就得靠 SSR 去提供，像是縮圖、標題、敘述、網址……等內容。

藉由 Quasar CLI 的插件 [Quasar Meta Plugin](https://quasar.dev/quasar-plugins/meta)，我們能夠動態地將 HTML 的 `<meta>` 標籤放入頁面的 DOM 元素中。

舉個例子，我們可以直接在 `.vue` 檔案加入 `meta` 這個屬性，並且可以使用 `data` 裡的資料，來組合出我們想要呈現的 Meta 資訊，以下提供一個簡單的範例。

```javascript
// Product.vue
export default {
  data() {
    return {
      title: '商品頁面',
    }
  },
  meta() {
    return {
      meta: {
        description: {
          name: 'description',
          content: `網站描述 - ${this.data.content}`,
        },
        ogTitle: {
          name: 'og:title',
          content: `${this.data.subtitle} - ${this.data.title}`,
        },
        ogDescription: {
          name: 'og:description',
          content: this.data.content,
        },
        ogImage: {
          name: 'og:image',
          content: this.data.image,
        },
        ogUrl: {
          name: 'og:url',
          content: this.$route.fullpath,
        },
      },
    }
  },
}
```

設定完成後，你可以透過 [Meta Tags](https://metatags.io/) 這個網站進行測試並預覽呈現結果。

以上就是這次使用 Quasar SSR 的過程，主要就是加上 SSR 模式、PreFetch 機制、SEO 設定，以及轉移資料至 Vuex 等等。其中，把元件資料轉移至 Vuex，與各個元件 Hook 的修改會比較麻煩，以我個人而言更動還滿多的 😅，或許是專案規模比較龐大一些。

此外，我自己還有出現一些比較難解決的錯誤，像是 HTML 結構 Client Side Hydration 的問題等等，但是這跟我個人的寫法比較有關係，所以這邊就沒有提到哩。

> 以上資源是我自己整理過後的筆記，若有錯誤歡迎隨時和我聯繫
