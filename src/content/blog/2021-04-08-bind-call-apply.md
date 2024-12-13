---
title: 'Understand JavaScript #18 bind()、call() 與 apply()'
excerpt: '本文主要內容為探討 bind()、call() 與 apply() 的相關知識，這三個函式都與 this 有關，可以用來控制 this 變數。'
tags: ['javascript']
date: 2021-04-08
author: '海豹人 Sealman'
image: 'javascript.png'
slug: 2021-04-08-bind-call-apply
---

## 前言

函式物件除了有 CODE 與 NAME 這兩個屬性之外，還有 bind、call 與 apply 這三個方法，這三個方法與 this 以及傳入函式的參數有關。

![函式物件](https://i.imgur.com/QDeBUOy.png)

在開始介紹前，我們先用物件實體語法建立一個物件 `person`，以下會使用這個物件作為範例。

```javascript
var person = {
  firstname: 'Damao',
  lastname: 'Huang',
  getFullName: function () {
    var fullName = `${this.firstname} ${this.lastname}`
    return fullName
  },
}
```

> 這裡的 this 關鍵字會指向包含該方法的物件，也就是 `person`。

## bind()

- `.bind()` 會創造一份你要呼叫的函式的拷貝（沒有執行函式）
- 傳入的參數就是 this 指向的東西

例如：如果透過 this 去取用物件中的 `getFullName` 會出現錯誤，因為此時的 this 是指向全域物件。

```javascript
var logName = function (lang1, lang2) {
  console.log(`Logged: ${this.getFullName()}`)
}

logName() // Uncaught TypeError: this.getFullName is not a function
```

我們可以用 `bind()` 控制 this 的指向，強迫讓 this 指向 `person` 物件。

使用上，不是去呼叫 `logName` 函式，而是取用 `logName` 這個**函式物件**裡的 bind 方法，寫成 `logName.bind()`，然後傳入想要讓 this 變數指向的物件。

使用後，`bind(person)` 會複製前面的 `logName` 函式物件，當 JavaScript 引擎看到傳入括號裡的 `person` 物件時，就會判斷 this 要指向這個物件。

```javascript
var logName = function (lang1, lang2) {
  console.log(`Logged: ${this.getFullName()}`)
  console.log(`Arguments: ${lang1} ${lang2}`)
}

var logPersonName = logName.bind(person)

logPersonName('zh-tw', 'en')
// Logged: Damao Huang
// Arguments: zh-tw en
```

我們也可以在創造函式時立刻接著寫上 `.bind(person)`，這樣就不用額外建立一個變數哩。

```javascript
var logName = function (lang1, lang2) {
  console.log(`Logged: ${this.getFullName()}`)
}.bind(person)

logName() // Logged: Damao Huang
```

## call()

- 由 `.call()` 做執行的動作，而不是執行前面接的函式
- 第一個參數是 this 變數指向的物件
- 剩下的參數是傳給函式的參數

```javascript
var logName = function (lang1, lang2) {
  console.log(`Logged: ${this.getFullName()}`)
  console.log(`Arguments: ${lang1} ${lang2}`)
}

logName.call(person, 'zh-tw', 'en')
// Logged: Damao Huang
// Arguments: zh-tw en
```

另外，我們也可以在創造函式後立刻執行，有點類似立即函式的概念，但這邊不是用 IIFE 執行函式的，而是用 `.call()` 來完成。

```javascript
;(function (lang1, lang2) {
  console.log(`Logged: ${this.getFullName()}`)
  console.log(`Arguments: ${lang1} ${lang2}`)
}).call(person, 'zh-tw', 'en')
```

## apply()

- 與 `.call()` 做的事情幾乎相同，差別在於第二個傳入的參數必須是「陣列」型別
- 第一個參數是 this 變數指向的物件
- 第二個參數是傳給函式的參數，型別必須為陣列

```javascript
logName.apply(person, ['zh-tw', 'en'])
// Logged: Damao Huang
// Arguments: zh-tw en
```

陣列在進行數學運算時比較方便，像是陣列內的數字相加，所以使用 call 還是 apply 就看使用函式的情況。

另外，與 call 一樣，apply 也可以在創造函式後立刻呼叫它。

```javascript
;(function (lang1, lang2) {
  console.log(`Logged: ${this.getFullName()}`)
  console.log(`Arguments: ${lang1} ${lang2}`)
}).apply(person, ['zh-tw', 'en'])
```

## 實際應用

講了這麼多，我們在真實生活中到底什麼時候會用到這些東西呢？

### 函式借用 (Function Borrowing)

- 函式借用：借用其他物件的方法

假設我們有另一個類似 `person` 的物件叫做 `person2`，它的值不同，也沒有 `getFullName` 方法。

如果我想要用 `person2` 作為 `getFullName` 方法裡的 `this`，而我又不想重複寫一個 `getFullName` 的話，我可以透過 call 或 apply 去借用 `person` 的函式。

```javascript
var person2 = {
  firstname: 'Sealman',
  lastname: 'Huang',
}

console.log(person.getFullName.call(person2))
console.log(person.getFullName.apply(person2))
```

這邊我用 `apply` 去呼叫 `person` 裡面的 `getFullName` 方法，同時我也設定 this 關鍵字指向 `person2`，這樣子我們就能借用一個函式。

### Function Currying

- Function Currying：建立一個函式的拷貝，並且設定預設的參數
- 在數學運算上很有用，像是資料庫需要做數學運算，可以有基本的函式，再根據它放入預設的參數，是一個很好的 bind 用法

假設函式 `multiply` 會將傳入的兩個參數相乘，如果我們用 `.bind()` 創造一個拷貝，第一個參數 this 我們先不管它，如果我們給一個參數值作為第二個參數，會發生什麼事情呢？

剛才介紹 bind 只有提到第一個參數，就是 bind 會創造一個拷貝，並且將 this 指向第一個參數放的物件。然而，如果有第二個參數，它會被設定為拷貝出來的那個函式的**永久參數值**。

像是以下範例當中，拷貝函式 `multiplyByTwo` 的第一個參數就會永遠被取代為 2。

```javascript
function multiply(a, b) {
  return a * b
}

var multiplyCopy = multiply.bind(this)
console.log(multiplyCopy(5, 2)) // 10

var multiplyByTwo = multiply.bind(this, 2)
console.log(multiplyByTwo(3)) // 6
```

換句話說，此時拷貝函式 `multiplyByTwo` 的程式碼就等同於以下程式碼。

```javascript
function multiplyByTwo(b) {
  var a = 2
  return a * b
}
```

所以在執行拷貝函式的時候，我們傳的那個參數其實是原本的函式的第二個參數 `b`。

最後，如果把兩個參數都傳給 bind，就會變成 a 與 b 都是固定的值，此時不管怎麼傳，結果都會是 2 乘以 10 等於 20。

```javascript
var multiplyByTwo = multiply.bind(this, 2, 10)

console.log(multiplyByTwo(3)) // 20
console.log(multiplyByTwo(4)) // 20
```

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- 瞭解函式物件的 bind、call 與 apply 這三個方法的概念
- Function Borrowing：透過 call 或 apply 借用其他物件裡面的方法
- 認識 Function Currying 這個很棒的 bind 應用方法

## References

- [JavaScript: Understanding the Weird Parts](https://www.udemy.com/course/understand-javascript/)
