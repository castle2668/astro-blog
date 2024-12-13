---
title: 'Vue.js Methods、Computed 與 Watch 的差異'
excerpt: '在 Vue.js 中 Methods、Computed、Watch 裡面都可以寫函式，這三種屬性有什麼差異呢？'
tags: ['vue']
date: 2019-10-31
author: 'Huang, Yung-Hsiang'
image: 'development.jpg'
slug: 2019-10-31-vue-methods-computed-watch
---

## Methods：主動觸發，且可以重複觸發

Methods 裡的 Function 通常會藉由一個「按鈕」之類的 Trigger 來啟用功能，把資料重新繪製到畫面上。

## Computed：資料出現變化時改變畫面

Computed 不是透過 Trigger 觸發，而是當相關的計算資料出現變化時，會馬上透過 Function 改變畫面。

例如：使用 Computed 過濾資料就不需要用一個按鈕去觸發 Method，可以直接去計算畫面的訊息，速度比較快。  
但如果資料量大，效能上可能會有影響。

## Watch：監控特定資料變化

Watch 通常用於「監控」特定的變數，當變數產生變化時，可以執行特定的事件。

例如：按下按鈕 (trigger) 讓畫面產生變化，並觸發 Watch 裡面的事件。

## 三者之間的差異

- Methods：需要「主動觸發」，且可以多次重複觸發
- Computed：當「資料出現變化」時需要改變畫面的 Function 放這裡
- Watch：「監控」特定資料變化的 Function 放這裡

其中 Computed 與 Watch 很像，因為都會隨著資料做變化，但是這兩種最大的差異在於「效能」，而效能的主要差異就在於會不會調整資料：

- Computed 是用來呈現在畫面上的 Function
- Watch 則會變動其它資料

因此通常使用 Watch 的時候比較少，因為效能負擔較多，而 Computed 若資料量不大就比較不會影響效能，常常被拿來做各種動態計算的應用。

> 以上資源是我自己整理過後的筆記，若有錯誤歡迎隨時和我聯繫
