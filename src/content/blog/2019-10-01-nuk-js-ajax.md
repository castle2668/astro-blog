---
title: 'NUK JavaScript #5：AJAX 撈取資料'
excerpt: '這次要介紹如何用 AJAX 撈取資料。'
tags: ['nuk', 'javascript']
date: 2019-10-01
author: 'Huang, Yung-Hsiang'
image: 'javascript.png'
slug: 2019-10-01-nuk-js-ajax
---

## 如何用 AJAX 撈取資料

> 使用資料：Open1999 派工受理案件資料  
> 資料網址：https://data.kcg.gov.tw/dataset/open1999

首先，建立一個 XMLHttpRequest，它可以傳送一個網路請求到對方伺服器去要資料，並準備取得 (get) 網址資料。

> 此時資料還沒回傳

```javascript
let xhr = new XMLHttpRequest()
xhr.open(
  'get',
  'https://soweb.kcg.gov.tw/open1999/ServiceRequestsQuery.asmx/ServiceRequestsQuery?startdate=&enddate='
)
```

待對方的伺服器確認我們的身分後，會回傳資料給我們，拿到資料後再看要怎麼處理。

> 資料會回傳到 `response` 跟 `responseText`

```javascript
xhr.send()
```

## ReadyState

撈取資料時，會出現以下幾種狀態，不同 readyState 代表不同的意思：

- 0：已經新增一個 XMLHttpRequest，但是還沒連結到要撈的資料
- 1：已發出網路請求，準備取得網址資料，但是對方還沒傳資料
- 2：偵測到你有用 send()
- 3：資料 Loading 中
- 4：已接收到資料，資料會回傳到 response 跟 responseText

## 處理取得的資料

撈到 JSON 資料後，我們要先將字串轉型成 JSON 格式，使用 `JSON.parse()` 方法。

使用範例：

```javascript
// JSON.parse(字串)

let b = JSON.parse(a)
console.log(b[0])

JSON.parse(xhr.responseText)
console.log(data[1].ZipName_)
```

## Onload 非同步

如果用 VSCode 在練習的話，可能會發現資料都跑不出來？  
但是在瀏覽器的 Console 上面卻可以跑出資料，為什麼會這樣子呢？

原因是 XHR 被放在等待區，此時資料還沒回傳。  
但是程式碼編譯很快，所以馬上執行的話，撈出來的資料還是空值。

這邊可以加上 **onload** 語法解決這個問題，讓 XHR 裡面的程式碼 **等到資料回傳時才會觸發**。

```javascript
xhr.onload = function () {
  let data = JSON.parse(xhr.responseText)
  console.log(data[1].ZipName_)
}
```

以下程式碼中，加上 onload 之後 XHR 裡面的程式碼不會立刻執行，可以用 console.log 查看執行狀況。  
前兩個 console.log(xhr.responseText) 回傳的都是空值，而且會等到最後資料回傳時才會觸發 onload 裡面的程式碼。

```javascript
console.log(xhr.responseText) // #1

xhr.onload = function () {
  console.log(1) // #4
  let data = JSON.parse(xhr.responseText)
  console.log(data[0].ZipName_) // #5
}

console.log(xhr.responseText) // #2
console.log(2) // #3
```

## AJAX 題目練習

題目：撈出鼓山區總共有多少案件

> 1999 API：https://data.kcg.gov.tw/dataset/open1999

```html
<!-- HTML -->

<h2>鼓山區有幾筆案件哩 :P</h2>
<p>總共有 <span class="total"></span> 筆案件</p>
```

```javascript
// JavaScript

let xhr = new XMLHttpRequest()
xhr.open(
  'get',
  'https://soweb.kcg.gov.tw/open1999/ServiceRequestsQuery.asmx/ServiceRequestsQuery?startdate=&enddate='
)
xhr.send()

xhr.onload = function () {
  let data = JSON.parse(xhr.responseText)
  let dataLen = data.length
  let total = document.querySelector('.total')
  let totalNum = 0

  for (let i = 0; i < dataLen; i++) {
    if (data[i].ZipName_ == '鼓山區') {
      totalNum += 1
    }
  }

  total.innerHTML = totalNum
  console.log('鼓山區總共有' + totalNum + '筆案件')
}
```

> 以上資源是我自己整理過後的筆記，若有錯誤歡迎隨時和我聯繫
