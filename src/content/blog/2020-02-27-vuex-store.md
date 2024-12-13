---
title: '使用 Vuex 管理資料狀態'
excerpt: '瞭解 Vue 的指令、元件、路由配置等概念後，我們用 Vue CLI 製作的網站差不多告一段落了！然而 Vue 生態圈還有一個必備技能是 Vuex，我們現在就來把 Vuex 也加入專案，讓我們的資料狀態可以跨元件同步。'
tags: ['vue', 'vuex']
date: 2020-02-27
author: 'Huang, Yung-Hsiang'
image: 'development.jpg'
slug: 2020-02-27-vuex-store
---

## Why Vuex

我們之前要做父子元件間的資料傳遞時，會使用 Props 與 Emit，同層級元件間則使用 Event Bus，透過以上方式我們就能在各個元件間互相溝通了。

但是，在多層的情況下，相當不推薦用 Props 與 Emit 一層傳一層，而 Event Bus 如果跨很多層或資料量大，也不建議使用，這時我們就需要一個更完善的跨元件溝通方式哩，而 Vuex 就是在提供一個狀態管理中心，將原先「通知」的概念，直接昇華到「共享狀態」的層次。

## What is Vuex

其實 Vuex 的概念簡單來說就是把 Vue 元件裡面的資料或方法移到 Vuex 去做管理。

在這個統一管理的概念下，任何一個元件都能呼叫 Vuex 裡頭的方法，並且維持雙向綁定的特性，而這些存進來統一管理的資料與方法，在 Vuex 中我們叫它[Store](https://vuex.vuejs.org/zh/api/#vuex-store)。

## Getting Started - 運作流程與使用方式

首先 Vuex 有 State、Getters、Actions、Mutations 這四個主要核心元素，先來簡單敘述一下這四個元素是用來幹嘛的。

- State：各元件間共享的資料狀態，在使用上類似於元件裡面的 `data`
- Getters：類似 `computed` 的感覺～
- Actions：用法如同 `methods`，但是只做**非同步**行為、取得資料等等，不能改變 `state` 裡面的資料
- Mutations：這裡可以進行改變資料內容的方法，只做**同步**的行為

在 Vue 的 Single File Components 裡面，我們會用以下流程操作 Vuex 來存取共享的資料狀態：

1. 透過[Dispatch](https://vuex.vuejs.org/zh/api/#dispatch)方法觸發 Actions 裡面的 Function 完成非同步行為，像是去取得遠端資料（透過 AJAX、Axios 呼叫遠端 API）
2. 使用[Commit](https://vuex.vuejs.org/zh/api/#commit)呼叫 Mutations 來改變 State（改變資料狀態）
3. 最後把資料渲染回到畫面上呈現

第一步的 Actions 是在取得資料，還沒有改變 State 裡面的資料，改變資料狀態要到 Mutations 這個階段才會更改。  
以上這三個步驟大概就是 Vuex 的運作流程了，比較進階一些的使用方式我們先留到下一篇再介紹，接下來我們先透過範例操作一次吧！

### STEP 1：監聽資料狀態

這邊就以我自己的專案[MapleStory Shop](https://sealman234.github.io/MapleStoryShopV4/#/index)資料轉移到 Vuex 的過程作為範例。  
專案中我使用 vue-loading-overlay 套件來製作過場動畫，因為這個效果各頁面都會呼叫去做轉圈圈的動畫，所以就需要跨元件溝通哩。

基本的建置環境與安裝方式可參考[Vuex 官方文件](https://vuex.vuejs.org/zh/installation.html)，這邊主要會說明使用方式。

首先，因為我們要管理 `isLoading` 這個資料狀態，所以我先新增 `isLoading` 到 `state` 之中。

```javascript
// store/index.js

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
  },
})
```

接著在元件中透過 `computed` 監聽資料的變化。

```javascript
// App.vue

export default {
  name: 'App',
  computed: {
    isLoading() {
      return this.$store.state.isLoading
    },
  },
}
```

### STEP 2：實作 Actions

新增資料後，我們可以在 `store` 中註冊 `actions` 方法來觸發事件。

首先，Actions 可以帶兩個參數，第一個是必要的參數 `context`，而第二個參數是可選的參數，如果你懶得想名稱，可以都用官方定義的 `payload`（載荷）就好，不過建議替換成符合當下用途、語意化的名稱。  
這個 `payload` 用來把方法中會使用到的參數帶進來，如果超過一個可以用物件的方式放入參數，像是 `context.commit('LOADING', {param1, param2})`。

```javascript
actions: {
  updateLoading(context, status) {
    context.commit('LOADING', status);
  },
},
```

### STEP 3：實作 Mutations

前面有提到 `actions` 的方法只是在取得資料，並不能操作資料狀態，要操作資料狀態必須是在 `mutations` 裡面。

所以我們就來註冊一個 `mutations`，它也有兩個參數，與 `actions` 一樣，第一個參數固定是 `state`，就是我們上面提到的資料狀態，而另一個也是 `payload`，是從外部傳進來的參數。  
這個 `payload` 就是從剛才的 `updateLoading` 傳過來的 `status`，所以這裡直接帶入 `status` 作為第二個參數即可。

```javascript
mutations: {
  LOADING(state, status) {
    state.isLoading = status;
  },
},
```

現在我們就可以藉由 `acions` 裡面的 `context.commit('LOADING', status)` 來觸發 `LOADING` 這個 `mutations` 來修改資料狀態哩。  
在元件裡面就是透過 `Dispatch` 去操作 `actions` 裡面的方法，達到共享資料狀態的效果！

> 官方建議 Mutations 以常數（全部大寫）的方式來命名，這樣會比較好辨識。

## 簡單說明 Actions 與 Mutations 的差異

Actions 與 Mutations 的主要差別就是 Actions 做非同步行為，而 Mutations 做同步行為。

舉例來說，像是 AJAX 或是 `setTimeout` 這種非同步的行為，因為會讓資料狀態與 `payload` 不一致，所以這些非同步行為應該在 `actions` 裡面完成，不要在 `mutations` 在更換資料時使用。

如果怕不小心寫錯，建議可以加上 `strict: true` 來啟用[嚴謹模式](https://vuex.vuejs.org/zh/api/#strict)。  
開啟後，如果你不小心透過 Mutations 以外的方法來改 `state` 的數值，像是在 Actions 裡面直接做更改的話，Vuex 會自動跳出警告，提醒你這並非正確的撰寫方式囉，建議開起來以免寫錯哩！

> 以上資源是我自己整理過後的筆記，若有錯誤歡迎隨時和我聯繫
