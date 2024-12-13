---
title: '使用 Vuex 模組化管理資料'
excerpt: '本文延續上篇的 Vuex 基礎入門文章，將介紹該如何透過 Vuex 管理專案的元件與資料狀態，也會介紹如何將 Store 的資料模組化，以減少專案程式碼的重複性，並提升程式碼的可讀性。'
tags: ['vue', 'vuex']
date: 2020-03-13
author: 'Huang, Yung-Hsiang'
image: 'development.jpg'
slug: 2020-03-13-vuex-module
---

## 複習：使用 Actions 取得遠端資料

接續上篇筆記，除了讀取效果 (`LOADING`) 以外，我們也能把取得資料（商品、購物車）等非同步行為，使用 Vuex 的 `actions` 來完成。

步驟就如上一篇所述：

1. 將元件的 `methods` 搬移至 Vuex 倉庫 (Store) 的 `actions` 裡面
2. 將儲存遠端資料的行為移到 `mutations`
3. 在元件中使用 `dispatch` 取用方法
4. 在元件中透過 `computed` 將資料呈現到畫面上

另外，雖然 Vue 元件能直接用 `this` 呼叫 Axios 使用 `$http` 的行為，但是 index.js 並非 Vue 元件，所以會出現錯誤。  
因此，這裡要再導入 Axios 並把 `this.$http.get(url)` 改成 `axios.get(url)`。

如果想在 Actions 中使用同樣在 Vuex 裡的方法，可透過 `context.dispatch('事件名稱')` 取用。

## Part 1：使用 Payload 傳遞參數

當要傳遞參數進入 Vuex 的 Actions 時，元件只能傳一個參數，如果真的需要兩個以上的參數，可以使用**物件**的形式把多個參數包起來再傳，例如：

```javascript
methods: {
  addtoCart(id, qty = 1) {
    this.$store.dispatch('addtoCart', { id, qty });
  },
},
```

傳遞之後，Store 可再透過**解構**的方式把物件裡的值給讀出來，例如：

```javascript
actions: {
  addtoCart(context, { id, qty }) {
    console.log(context, id, qty);
  },
},
```

透過這個方式，就能解決元件只能傳一個參數的問題囉。

## Part 2：Vuex 的 mapGetters 與 mapActions

官方稱 mapGetters 與 mapActions 為**輔助函數**，其實它們就只是把 Store 裡的東西直接拿（映射）到元件上用，可以讓程式碼乾淨一些。  
如果要使用的話，必須先在 Vue 元件中以**解構**的方式將套件引入：

```javascript
import { mapGetters, mapActions } from 'vuex'
```

### 1. 使用 mapGetters 與 Getters 呈現畫面內容

如果在多個 Vue 元件內，都有個共同的計算屬性 (`computed`) 要用來呈現在畫面，例如：

```javascript
computed: {
  categories() {
    this.$store.state.categories;
  },
},
```

我們可以把它移過來 Vuex 的 Getters 中做統一管理，如以下寫法：

```javascript
getters: {
  categories(state) {
    return state.categories;
  },
}
```

把資料移到 Getters 之後，我們如果想要在元件中使用這個資料，可利用**展開** (`...mapGetters`) 的方式，透過 `mapGetters` 把所有的 `getters` 都取出來。  
又因為是透過陣列的方式取出，所以我們也可以一次取多個 `getters`，例如：

```javascript
computed: {
  ...mapGetters(['categories', 'products']),
},
```

### 2. 使用 mapActions 取用 Actions

剛才的 `mapGetters` 是使用 `getters` 取代 `computed`，而這個 `mapActions` 則是將 Vuex Store 中的 `actions` 取出來在 Vue 元件中直接使用，例如：

```javascript
methods: {
  ...mapActions(['getCart']),
},
```

然而，如果該事件帶有參數的話，其實是無法使用 `mapActions` 來取用 `actions` 的。  
這種時候就只能乖乖透過 `dispatch` 去呼叫 Vuex 裡面的 `actions` 並加上後方要傳入的參數哩。

## Part 3：模組化資料

如果執行的是大型專案，Store 的程式碼可能會很雜亂！可能會有一部分的 Code 是與商品有關的，而另一部分則與購物車有關，其他可能還有訂單、優惠券等等。  
在這種情況下，我們其實可以透過**模組化**的方式，將這些程式碼分門別類，各自再區分到不同的檔案之中。  
例如：從 index.js 中，把與產品有關的程式碼拆分到 products.js。

### 如何拆分

拆分的程式碼結構其實就與原本的檔案相同，把要拆的部分剪下來貼過去就可以了。  
在拆好 Modules 之後，還要記得把 products.js 載進 index.js 之中，並新增 `modules` 物件。

#### index.js

```javascript
import productsModules from './products'

export default new Vuex.Store({
  modules: {
    productsModules,
  },
})
```

### 如何共用資料

在拆分出去的模組中，`state` 是屬於模組的區域變數，而 `actions`、`mutations`、`getters` 都是屬於全域變數。  
這裡會建議再加上 `namespaced: true` 這個屬性，把它們都改為區域變數，避免重複使用到相同名稱。

以下是幾個「在元件中使用模組」的範例：

1. 使用 mapGetters：`...mapGetters('productsModules', ['categories', 'products'])`
2. 使用 mapActions：`...mapActions('productsModules', ['getProducts'])`
3. 取得模組內的資料：`this.$store.state.productsModules.products`
4. 透過 Dispatch 取用模組的 Actions：`this.$store.dispatch('productsModules/getAllProducts', page)`

如果要「在模組中使用 Global 資料」則需要加上 `{ root: true }`，例如：

```javascript
context.commit('LOADING', false, { root: true })
```

> 以上資源是我自己整理過後的筆記，若有錯誤歡迎隨時和我聯繫
