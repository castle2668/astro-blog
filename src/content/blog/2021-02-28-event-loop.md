---
title: 'Understand JavaScript #6 Event Loop'
excerpt: 'Event Loop 負責排程處理同步與非同步的工作，有了這位任務管理員，你的網站才不會卡卡的喔。'
tags: ['javascript']
date: 2021-02-28
author: '海豹人 Sealman'
image: 'javascript.png'
slug: 2021-02-28-event-loop
---

## 單執行緒 (Single Threaded) 與同步執行 (Synchronous Execution)

JavaScript 是單執行緒，且同步執行的。

- 單執行緒 (Single Threaded)：一次只執行一個指令
- 同步執行 (Synchronous Execution)：程式碼會依照出現的順序，一次執行一行

> 至於非同步 (Asynchronous) 的例子，有像是 JavaScript 網路應用中的非同步請求 (Asynchronous Requests)，其中 AJAX 的 A 其實也就是 Asynchronous 的意思。

## 非同步回呼 (Asynchronous Callbacks)

![瀏覽器](https://i.imgur.com/YGE52Jd.png)

關於 JavaScript 的非同步事件，有以下幾個重點：

- 直到執行堆是空的（即 JavaScript 已經逐行執行完程式）才會處理**事件佇列**
- 並不是真正的非同步，而是瀏覽器非同步地把東西放到事件佇列，但原本的程式仍繼續一行行執行
- 非同步的部分是發生在 JavaScript 引擎外
- 持續檢查 (Continuous Check)：JavaScript 會用同步的方式處理非同步事件，根據這些非同步事件的順序一一完成

## Event Loop

- 同步的工作，瀏覽器會一個一個執行
- 非同步的工作，先放到 **Task Queue** 等待，直到瀏覽器沒有其他工作時，才會將它們從事件佇列中拿出來執行
  - 例如：Call API、`setTimeout`
- Micro Tasks，會在下一次頁面渲染之前執行，接著才執行 Task Queue，最後渲染畫面
  - 優先於渲染頁面之前開始執行，因為這些動作有可能會操作 DOM，所以要確保在同一個 Event Loop 執行後，頁面的渲染只會有一次
  - 例如：Promise

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- 單執行緒與多執行緒的差異
- JavaScript 是屬於單執行緒
- JavaScript 的非同步事件
- Event Loop

## References

- [JavaScript: Understanding the Weird Parts](https://www.udemy.com/course/understand-javascript/)
