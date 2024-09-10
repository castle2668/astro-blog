---
title: "終結內容農場！透過瀏覽器套件避免你誤入農場"
excerpt: "前陣子發現自己的文章未經同意被搬運到中國的農場網站，甚至也沒有註明出處，讓我開始重視內容農場的問題，最近也發現了一個瀏覽器套件可以幫忙抵制內容農場發展，結果安裝後發現搜尋結果一堆農場哈哈。"
tags: ["Life"]
date: 2020-05-17
author: "Sean Huang"
image: "javascript.png"
slug: 2020-05-17-content-farm-terminator
---

## 什麼是內容農場

**內容農場**（英語：Content Farm）是指圖謀網路廣告等商業利益，以取得網路流量為主要目標，而以各種合法、非法手段大量、快速生產品質不穩定網路文章的網站或企業。

> [內容農場 - 維基百科，自由的百科全書](https://zh.wikipedia.org/wiki/%E5%85%A7%E5%AE%B9%E8%BE%B2%E5%A0%B4)

舉例來說，有時候我們想找一些小知識或網站，打了一些關鍵字像是「Sean」，會發現搜尋出來的第一個結果是每日頭條之類的網站（我自己搜都是這個結果…）。

這個網站通常會把文章標題寫得很誇大，點進去看，會發現內容真假難辨，時常在宣導一些未經求證的假知識、假消息。然而這種垃圾資訊卻充斥著整個網路生態，真正有用或原創的內容反而難以被看見。

為了解決以上問題，我們可以在瀏覽器上安裝「終結內容農場」這個套件，一起來阻止內容農場繼續發展 🙏

## 「終結內容農場」瀏覽器套件

### 套件資訊介紹

- 作者：[Danny Lin](https://github.com/danny0838)
- 套件下載連結：[終結內容農場 - Chrome 線上應用程式商店](https://chrome.google.com/webstore/detail/content-farm-terminator/lcghoajegeldpfkfaejegfobkapnemjl?hl=zh-TW)
- GitHub Repository：[danny0838/content-farm-terminator: 「終結內容農場」瀏覽器套件 / Content Farm Terminator browser extension](https://github.com/danny0838/content-farm-terminator)

### 安裝與使用

在 Chrome 與 Firefox 瀏覽器上都有「終結內容農場」這個擴充程式，只要點選安裝就可以使用了。  
不過以下還有一些簡單的設定步驟，可以更進一步防止我們誤入內容農場 💪

![終結內容農場套件](https://i.imgur.com/eGbjaPQ.png)

### 自訂黑名單

套件安裝完成後，我們點選瀏覽器右上方的「終結內容農場」圖示選項，可以查看目前正在作用的黑名單。  
此時會發現裡面已經有一份**預設的封鎖清單**了，而下方的**自訂黑名單**與**自訂白名單**，可以讓我們自己決定哪些網站應該封鎖與解鎖。

![自訂黑名單設定](https://i.imgur.com/ToygZzP.png)

### 更完整的內容農場清單

除了預設加入的**標準內容農場清單**，我們還可以進到 [終結內容農場後台資料庫](https://github.com/danny0838/content-farm-terminator/tree/gh-pages)，將作者列出的其他內容農場網路黑名單，例如**類內容農場清單**、**社群內容農場清單**、**假新聞網站清單**、**詐騙網站清單**……等都加入我們的網路黑名單裡面，如此一來我們就封鎖得更完整哩 👍

### 完善的三段阻擋功能

#### 第一段阻擋：自動標記出哪個網站是內容農場

完成以上設定後，我們如果在瀏覽器的搜尋結果頁，或是其他帶有連結的地方看到了一個紅色驚嘆號 ❗️ 的標示，這代表該網站被歸類在黑名單中，藉由這個功能可以提醒我們不要去點擊這些網站。

![自動標記出農場](https://i.imgur.com/IrF7NRF.png)

#### 第二段阻擋：防止你誤入農場

如果我們不小心手滑點到內容農場，瀏覽器會跳出以下的警告畫面，提示我們這是內容農場，這樣就能防止我們誤入內容農場哩 😊

![防止誤入農場](https://i.imgur.com/uyiPfHE.png)

### 第三段阻擋：檢視無廣告流量頁面

最後，其實有時候內容農場抄襲的資訊，很遺憾地找不到原文，真的是實際翻了好幾頁搜尋結果都找不到…，這時候「終結內容農場」也有提供**檢視**的功能（上圖左下方的檢視按鈕），讓我們依然能進入頁面。

但是它會移除掉農場網站裡面的廣告與相關程式碼，讓內容農場賺不到我們進去檢視的廣告與流量收益！

這算是逼不得已的最後手段，希望大家看到有興趣的文章時，還是花點時間再搜尋一下原文，支持原作者哩 😭

> 以上資源是我自己整理過後的筆記，若有錯誤歡迎隨時和我聯繫