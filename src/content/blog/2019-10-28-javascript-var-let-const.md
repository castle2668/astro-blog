---
title: 'JavaScript var & let & const 的特點與差異'
excerpt: '本篇文章介紹 JavaScript ES6 裡面 let 與 const 的重要觀念，以及使用上的注意事項。'
tags: ['javascript']
date: 2019-10-28
author: 'Huang, Yung-Hsiang'
image: 'javascript.png'
slug: 2019-10-28-javascript-var-let-const
---

## ES5 var & window

之前在 ES5 我們會用 var 宣告變數，但是使用 var 宣告變數會「汙染全域環境」，實際情況見以下範例。

```javascript
var a = 1
console.log(a)
for (var i = 0; i < 3; i++) {
  console.log(i)
}
```

這是一個經典的範例，我們 Log 出來的值都是 `3` 而非 `1, 2, 3` 的結果，透過開發人員工具輸入 `window` 去搜尋，也能看到最上方出現 `a` 這一個全域變數。

到了 ES6 我們希望可以避免這個問題，因此出現了新的變數宣告方式 let 與 const，它們擁有「區塊域」的概念，能避免 var 汙染全域變數的副作用。

## ES6 let & const

- 優點
  - 解決 ES5 的 BUG 與不方便
  - 盡量避免汙染全域環境 → 維護性較高，不會污染到其他開發者使用的變數
- 缺點
  - 舊版瀏覽器的小問題 → 使用 Babel + Gulp 等方式即可解決

ES6 解決了 ES5 的 BUG 與不便之處，由於不會汙染全域變數，因此維護性較高，不會影響到其他開發者寫的程式功能。

缺點是 ES6 在舊版瀏覽器上會出現一些小問題，不過這些都可以藉由 Babel 與 Gulp 等工具解決。

### 避免污染全域

- let 與 const 不會出現在全域變數 (window) 裡面

```javascript
let a = 1
const b = 1
var c = 1
```

範例中的變數 a 跟 b 不會出現在 `window` 裡，c 則會出現在 `window` 裡，因為 c 是全域變數。

這也是為什麼使用 let 與 const 能避免掉使用 var 會汙染全域變數的副作用。

## ES6 Block Scope

let 與 const 用來宣告「區塊」裡的變數，即「區域變數」。所謂的「區塊」是指大括號 `{}` 裡面的東西，因此區塊域我習慣稱之為「大括號作用域」。

Block Scope 具體的作用是什麼呢，我們可以透過下面範例來理解。

在 `function changeA(){...}` 裡面的變數 `a` 只會存活在那個 Function 的大括號區塊內，函式裡面的 `a = 1` 並不會變更到外面全域的 `a`，也因此最後的 `console.log(a)` 仍會回傳全域的 `a` 即為 0。

```javascript
var a = 0 // 這個 a 是全域變數

function changeA() {
  let a = 0 // 這個 a 是區域變數
  a = 1
  console.log(a) // 結果為 1
}

changeA()
console.log(a) // 結果為 0
```

> 註：ES6 建議將 JS 都寫成「函數式」，盡量以函式呼叫的方式去做設計，不要使用到 var。

### 範例：在 For Loop 中使用 let 與 var 的差異

我們透過使用 For 迴圈的情境，來幫助理解 Block Scope 的特性。

在範例中，我們希望列表被點擊時，會跳出 Alert 來通知我們是點到哪一個列表，所以我們先監聽 `li` 並加上 `click` 事件。

```html
<!-- HTML -->
<ul class="list">
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

```javascript
// Javascript
const listLength = document.querySelectorAll('.list li').length
for (var i = 0; i < listLength; i++) {
  document
    .querySelectorAll('.list li')
    [i].addEventListener('click', function () {
      alert(i + 1)
    })
}
```

這時候點擊 `li` 確實會彈出 Alert，但是可以發現不管點擊的是哪一個 `li`，彈跳出來的 Alert 的內容都是 `3`，而非預期的 `1, 2, 3`。

這是因為 `i` 的值已經被「全域變數」所影響，當 For 迴圈跑完之後 `i` 的值已經等於 `i++` 三次之後的結果，並且汙染了全域變數。

### 透過 Block Scope 解決問題

由於 Block Scope 的作用，讓 For 迴圈每次執行時，裡面的 `let i` 都可以存活在個別的「大括號作用域」裡面，所以彼此執行的內容不像 var 一樣會被干擾。

```javascript
const listLength = document.querySelectorAll('.list li').length
for (let i = 0; i < listLength; i++) {
  document
    .querySelectorAll('.list li')
    [i].addEventListener('click', function () {
      alert(i + 1) // 用 let 的話，會在大括號區塊內重新綁定
    })
}
```

程式碼背後運行的方式就像：

1. 執行 `let i = 0`，此時的 i 存活在等於 0 的大括號作用域裡面，執行的 `function (){ alert(i+1)}` 會等於 `alert(1)`
2. 執行 `let i = 1`，此時的 i 存活在等於 1 的大括號作用域裡面，執行的 `function (){ alert(i+1)}` 會等於 `alert(2)`

## 唯讀變數 const 無法被重新賦予值

`const` 是唯讀變數，即不能去做修改，常用在一些不能被變更的變數，例如：圓周率、銀行帳號、API、網址、錢包地址（區塊鏈）、身份證字號、訂單編號，或是其他重要資訊等。

在這些狀況下，開發者並不希望某一些資訊可以被改變，就能夠利用這個「不能被更動」的特性。

不過這裡有一個漏洞，那就是物件與陣列的內容還是可以被更改，如果要完全避免掉，可以使用 `freeze()` 這個方法來解決。

### 凍結物件：Object.freeze()

顧名思義，它的功能就是「凍結」一個物件，用來防止物件被新增屬性，或是防止原有的屬性被刪除。

如果有預設的東西不想被干擾或更改的時候，而且型別是物件或陣列時，就可以使用 `const` 與 `freeze` 來處理。

```javascript
const obj = {
  url: 'https://www.seanhuang.dev',
}
Object.freeze(obj) // 使用 freeze 就不能修正了
obj.url = '30'
console.log(obj.url) // 30 -> https://www.seanhuang.dev
```

## var 有 Hoisting；let 與 const 有 TDZ

ES5 使用 var 宣告變數具有 Hoisting 的特性，會將宣告的變數向上提升。

```javascript
// var a; // 相當於有這一行存在
console.log(a) // undefined

var a = 3
console.log(a) // 3
```

但如果是使用 let 或 const 宣告變數，因為它們沒有 Hoisting 的特性，並不會將變數向上提升，所以這裡不是出現 `undefined`，而是顯示 `xxx is not defined` 表示還沒宣告。

```javascript
console.log(a) // a is not defined (抓不到值)

let a = 3
console.log(a) // 3
```

因此許多人認為只有 var 有 Hoisting 的特性，然而 let 與 const 其實也有差不多的東西，叫做「暫時性死區（Temporal Dead Zone, TDZ）」。

跟 var 不一樣的地方是，let 與 const 不會先初始化 `undefined`，而是會形成這個暫時性死區。

在「提升之後」以及「賦值之前」這段期間，如果在賦值之前就試圖取值，就會拋出找不到變數的錯誤。

## let 與 const 不能重新宣告賦值

- var 可以重新宣告賦值

  ```javascript
  var a = 1
  var a = 2 // var 可以重新賦予
  ```

- let 跟 const 則不能重新宣告賦值

  ```javascript
  let a = 1
  let a = 2 // a 已被賦予值
  const b = 1
  const b = 2 // b 已被賦予值
  ```

> 注意：重新宣告 `let a = 1` 跟重新賦值 `a = 1` 是不同的事情喔，這裡主要表達的是「重新宣告」這件事。

## 總結

在 ES6 推出後，寫 JavaScript 時可以多使用 let 與 const，少一點使用 var 。

這麼做除了可以避免使用 var 可能出現的錯誤，也能增加程式碼的可讀性，例如：閱讀程式碼的人看到使用 const 所宣告的變數，就會知道這個變數是不能做改變的。

> 以上資源是我自己整理過後的筆記，若有錯誤歡迎隨時和我聯繫
