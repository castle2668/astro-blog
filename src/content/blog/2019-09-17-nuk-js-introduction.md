---
title: 'NUK JavaScript #1：let、const、型別'
excerpt: '這學期終於選到 JS 課程了，很期待但又怕很難哈哈。總之就整理筆記，幫忙加深印象吧，往後複習期中期末考試應該有幫助。此篇將會介紹環境安裝、型別，與 ES6 的 let、const。'
tags: ['nuk', 'javascript']
date: 2019-09-17
author: 'Huang, Yung-Hsiang'
image: 'javascript.png'
slug: 2019-09-17-nuk-js-introduction
---

## 環境安裝

![Visual Studio Code](https://i.imgur.com/0xVhFCW.png)

軟體名稱：Visual Studio Code  
下載連結：[https://code.visualstudio.com](https://code.visualstudio.com)  
使用步驟：

1. 新增一個資料夾，名稱通常會取做 project
2. 在資料夾裡新增 index.html 與 all.js 兩個檔案
3. 用編輯器 (VSCode) 開啟 index.html 檔案
4. 在 HTML 檔案裡面，輸入一個驚嘆號，接著在驚嘆號後面按下 tab 按鍵，即可展開 HTML 環境
5. 在 `<body></body>` 裡面新增一串文字像是 `Hello World!`
6. 打開網頁看看是否有出現東西
7. 在 `<head></head>` 裡面輸入以下程式碼 `<script src="all.js"></script>`
8. 在 all.js 裡面新增一段語法 `alert('hello')`，看 JS 是否有成功載入

## let 與 const

在 ES5 我們會用 var 來做宣告，但到了 ES6 我們不想要汙染全域變數，因此使用 let 與 const 來宣告變數。

```javascript
let Ming = '小明'
let Sean = '小翔'
console.log(Ming)
console.log(Sean)
```

上面兩行 Code 以白話文翻譯就是：

1. 我要命名一個變數，這個變數的名稱叫做 Ming
2. 我要命名一個變數，這個變數的名稱叫做 Sean
3. 我要賦予 Ming 這個變數的值為小明
4. 我要賦予 Sean 這個變數的值為小翔

### 特性一：無法重新賦予值

看了上面的例子，我們都知道如何以 let 或 const 宣告變數了，但是 let 與 const 有什麼不同呢？  
以下我們用 let 與 const 宣告變數，不過這一次我們還想要重新賦予值給變數：

```javascript
let a = 1
a = 2 // let 可以重新賦予值
const b = 1
b = 2 // const 不可以重新賦予值
```

運行上面的程式碼後，我們會發現 const 所宣告的變數 b 是無法重新賦予值的，這就是因為 const 不可變動的特性而出現的錯誤！

> 在 Chrome 瀏覽器中，按下 F12 可以開啟開發人員工具。  
> 開發人員工具中的 console 能夠檢視我們的 JavaScript 是否有執行成功。

Q：為什麼 const 需要這種「不能被更動」的特性呢？  
A：因為某些狀況下，開發者並不希望某一些資訊是可以被改變的。例如：銀行帳號、重要資訊、API、網址、錢包地址（區塊鏈）、身份證字號、訂單編號。

### 特性二：Hoisting

什麼是 Hoisting？

首先，我們先來看以下的範例程式碼：

```javascript
var a = 1
var b = 'hello'
// var c = a + b;
console.log(c)
var c = a + b // Hoisting
```

上述的程式碼中，我們分別宣告了 a 與 b 兩個變數並賦予其值，再宣告變數 c = a + b 並回傳其值。  
在這個例子中，不管 c 是在第三行宣告的，還是在最後才宣告，console.log 都能抓到 c 的值。

但是！如果使用 let 來宣告，狀況可就不同了：

```javascript
let a = 1
b = 'hello'
// let c = a + b;
console.log(c)
let c = a + b // let 無法 Hoisting
```

這個例子中，我們只是把 var 換成 let，但是 console 卻傳來錯誤訊息，並表示無法存取到 c 這個變數。

為什麼呢？

因為 Hoisting 只會將 var 宣告的變數向上提升，而不會將 let 或 const 所宣告的變數向上提升。  
因此，在上面這個範例中，let c = a + b; 不可以到了第五行才宣告，必須在第三行就宣告。

Hoisting 結論：var 會向上提升，let 與 const 不會。

## 型別 (Types)

- 數字
- 字串
- 布林 (true、false)
- undefined

我們剛才宣告的型別都是數字，現在我們來試著宣告一個字串型別的值：

```javascript
let a = 1
let b = 'hello'
```

如果我們將 a 與 b 相加，會得到什麼結果呢？  
我們會得到 1hello 的字串！

```javascript
let a = 1
let b = 'hello'
console.log(a + b)
```

此外，不只數字跟數字、數字跟字串可以相加，布林值與字串也可以相加。  
以下我們會得到 true + hello，也就是 truehello 的字串。

```javascript
let a = true
let b = 'hello'
console.log(a + b)
```

這一篇介紹了 let 與 const 的特性，包含重新賦予值以及 Hoisting，在最後也稍微介紹了型別的觀念。  
下一篇會介紹函式，並且透過一些小題目來熟悉函式。

> 以上資源是我自己整理過後的筆記，若有錯誤歡迎隨時和我聯繫
