---
title: 'Understand JavaScript #14 立即呼叫的函式表達式 (IIFEs) 與安全程式碼'
excerpt: '本文主要內容為探討「IIFE」的相關知識，理解為什麼 IIFE 會被應用在各種大型框架或資源庫裡面，並且能幫助撰寫安全的程式碼。'
tags: ['javascript']
date: 2021-03-30
author: '海豹人 Sealman'
image: 'javascript.png'
slug: 2021-03-30-iife-safe-code
---

## 立即呼叫的函式表達式 (IIFEs)

### 演變過程

- Immediately Invoked Function Expressions (IIFEs)：在創造函式後立刻呼叫函式

以下三個函式最終都會出現 `Hello Damao` 的結果，其中第三個我們比較陌生，它是回傳 (return) 一段字串，並賦予給等號左邊的變數 `greeting`。

```javascript
// Function Statement
function greet(name) {
  console.log('Hello ' + name)
}
greet('Damao')

// Using a Function Expression
var greetFunc = function (name) {
  console.log('Hello ' + name)
}
greetFunc('Damao')

// Return a value to variable
var greeting = function (name) {
  return 'Hello ' + name
}
console.log(greeting('Damao')) // Hello Damao
```

我們對剛才的函式做一些修改，我們在 `function{}()` 後方加上 `()` 來執行函式。

函式的執行步驟：創造函式 → 接受參數 → 執行函式 → 得到結果 → 傳入等號運算子。

```javascript
// Using an Immediately Invoked Function Expression
var greeting = (function (name) {
  return 'Hello ' + name // 回傳一個字串
})('Damao')
console.log(greeting) // 是一個字串，不是函式
```

### 繞過語法解析器

當語法解析器看到「`function` 在最前面，或是接在分號的後面」時，Parser 會預期這是一個**函式陳述式**，因此函式也需要有名稱，不能是匿名函式。

```javascript
function greet(name) {
  return 'Hello ' + name
}
```

那我們該如何讓 Parser 瞭解到我想要執行一個 IIFE，而不是要寫一個函式陳述式呢？

方法就是「確保 `function` 不是這一行程式碼的第一個字詞」，如此一來 Parser 就會因為第一個字不是 `function` 而判斷它不是函式陳述式。

最常見的作法就是把函式用一個**括號**包起來，因為 JavaScript 引擎會判斷括號裡的東西是一個表示式。

```javascript
;(function (name) {
  return 'Hello ' + name
})
```

現在我們就有一個函式，它只是單純放在那裡，沒有在運作哩。

### 常見的 IIFE 寫法

一個函式表達式被括號包住，所以 Parser 會認為這不是函式陳述式，而是一個立即執行的函式，因為最後的 `()` 執行了函式。

```javascript
var firstname = 'Damao'

;(function (name) {
  console.log('Inside IIFE: Hello ' + name)
})(firstname)

// Inside IIFE: Hello Damao
```

對了，IIFE 常見的寫法有兩種，但這個不是很重要，因為功能都一樣，只是美感問題而已。

- 在括號內：`(function(){...}());`
- 在括號外：`(function(){...})();`

個人比較喜歡把調用的 `()` 放在裡面，因為我希望把所有東西包在小括號內，讓 Parser 知道最外面有個括號，不過 VSCode 的 Prettier 則是會自動把括號校正到外面。

## 安全程式碼

### 透過 IIFE 撰寫的安全程式碼

執行函式時，會創造函式自己的執行環境，裡面宣告的變數也都是在函式內被創造，不會接觸到全域環境。

![安全程式碼](https://i.imgur.com/iFXjP96.png)

即使有兩個函式庫，只要有各自建立自己的執行環境，變數之間就不會覆蓋，因為這兩個 `greeting` 是在不同的執行環境中，所以它們的記憶體位置當然不同。

![安全程式碼](https://i.imgur.com/5R1izB6.png)

如果去看一些資源庫的原始碼，可以看到開頭與最後結尾的地方都是小括號與函式，它們會把所有程式碼包在 IIFE 裡面，避免發生衝突。

### 故意影響全域物件

以下是一個標準的 IIFE，如果今天想要在使用 IIFE 時，在函式的執行環境下故意修改全域物件的話，我們該怎麼做呢？

```javascript
// IIFE
;(function (name) {
  var greeting = 'Hello'
  console.log(greeting + ' ' + name)
})('Damao')
```

由於物件傳參考的特性，我們可以把全域物件 `window` 的參考傳給 IIFE，這樣就能影響到全域物件哩。

```javascript
;(function (global, name) {
  var greeting = 'Hello'
  global.greeting = 'Hola' // 故意影響全域物件
  console.log(greeting + ' ' + name) // Hello Damao
})(window, 'Damao')

console.log(greeting) // Hola
```

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- 認識立即函式的觀念，包含演變過程、如何繞過語法解析器的判定，以及目前最常見的寫法
- 如何透過 IIFE 撰寫的安全程式碼
- 在函式的執行環境中故意影響全域物件的方法

## References

- [JavaScript: Understanding the Weird Parts](https://www.udemy.com/course/understand-javascript/)
