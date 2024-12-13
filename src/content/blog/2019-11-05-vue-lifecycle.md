---
title: 'Vue 生命週期 (Lifecycle)'
excerpt: '本文簡單介紹 Vue 的生命週期，瞭解 Vue 的生命週期對於熟悉 Vue.js 會有很大的幫助。'
tags: ['vue']
date: 2019-11-05
author: 'Huang, Yung-Hsiang'
image: 'development.jpg'
slug: 2019-11-05-vue-lifecycle
---

## Lifecycle (Vue Hooks)

當生命週期到某個時間點，就會觸發某個 Hook，以下會依序介紹這些時間點。

### BeforeCreate

Vue 已經開始運行，但是資料還沒準備完成，資料還沒有辦法掛載上去。

### Created

資料已經準備完成！  
如果要做 AJAX、Axios 或者其他資料操作，至少要在這個階段之後才能做。

### BeforeMount

準備開始繪製 Vue 的一些元件。

### Mounted

DOM 元素已經掛載到 Vue 實體上，但還沒被渲染出來，這時候可以做一些與 DOM 有關的操作了。

### BeforeUpdate

當有資料變動時，會觸發 beforeUpdate 事件，等到畫面繪製完成後，才接著觸發 updated 事件。

### Updated

操作資料狀態、更新資料時，都會觸發 updated，像是修改文字，或是用 jQuery 操作 HTML 的 DOM 元素之類的。

### BeforeDestroy

資料狀態還存在，準備要移除。

### Destroyed

資料同步被移除。如果再次呼叫元件，元件會重建，即資料會被釋放掉。

※ 這邊假設還沒加上 `<keep-alive>`，所以沒有 activated 與 deactivated 的 Hook。

## 加上 Keep-Alive 讓元件資料狀態不被移除

有時候我們不希望資料重建，像是在做**切換頁籤**的動作時，我們會希望維持資料狀態，不要觸發 destroyed 這個 Hook，此時我們可以使用 `<keep-alive>` 標籤將元件包起來。

使用 `<keep-alive>` 標籤包起來的元件，在移除時就不會觸發 destroyed 事件了，而且下次呼叫回來時，資料狀態也不會改變。

### Activated

當我們再次呼叫元件，會發現前面的 created 沒有觸發，而是會直接跳到 activated 這個 Hook 裡面，而且資料狀態都有保留。

### Deactivated

這個 Hook 階段代表我們已經完成再次呼叫資料 (Activated) 的動作了，而且可以發現資料狀態確實是保留的。

這時候就不會出現 beforeDestroy 與 destroyed 這兩個 Hook，因為它們是當元件沒加上 `<keep-alive>` 時，將元件完全釋放，才會觸發的 Hook。  
因此，只要有加上 `<keep-alive>` 就會改為觸發 deactivated。

## 總結

1. 通常開發初期最常使用到 Created 與 Mounted 這兩個 Hook
2. 如果要使用 AJAX 等方法，至少要到 Created 之後才能用
3. 想要維持資料狀態的話，可以使用 `<keep-alive>` 標籤

最後，官方也有一張 [Lifecycle Diagram](https://vuejs.org/images/lifecycle.png) 的示意圖，也可以參考看看 :D

> 以上資源是我自己整理過後的筆記，若有錯誤歡迎隨時和我聯繫
