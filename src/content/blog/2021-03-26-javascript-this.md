---
title: 'Understand JavaScript #12 物件 × 函式 × this'
excerpt: '本文主要內容為探討物件、函式，以及那個令人困惑的「this」的指向問題與相關知識。'
tags: ['javascript']
date: 2021-03-26
author: '海豹人 Sealman'
image: 'javascript.png'
slug: 2021-03-26-javascript-this
---

## 暖身時間

本文會使用到執行環境、變數環境、範圍鏈 ⋯⋯ 等觀念。

在開始之前，我們回味一下之前的東西。

- 程式執行：當函式物件的 Code 屬性被 Invoke 時，執行環境會被創造，並放進執行堆
- 範圍鏈：函式物件裡的變數有變數環境，它可以參考到外部（詞彙）環境，並一路隨著範圍鏈向外尋找，直到全域環境為止

## this 指向全域物件 Window

每當執行環境被創造，JavaScript 引擎都會產生 `this` 變數給我們，它會指向不同物件，會依據該「**函式如何被呼叫**」來決定（改變）。

下面有三個執行環境（全域、呼叫 a 創造的、呼叫 b 創造的），每一種情況中，他們都有自己的 `this` 關鍵字，但這三個 `this` 都指向同一個記憶體位址的物件，也就是全域物件 `window`。

```javascript
console.log(this) // Window {…}

// Function Statement
function a() {
  console.log(this) // Window {…}
}
a()

// Function Expression
var b = function () {
  console.log(this) // Window {…}
}
b()
```

我們可以透過點運算子連結一個新的變數到全域物件，而任何在全域物件下的變數，我們可以直接參考到它，不需要透過點運算子。

```javascript
function a() {
  console.log(this)
  this.newVariable = 'Hello'
}
a()
console.log(newVariable) // Hello
```

## this 指向包含該方法的物件

在物件中，如果一個屬性的值是純值，我們會稱之為「屬性」，但如果一個屬性的值是一個函式，我們會稱之為「方法」，如下方範例所示。

```javascript
var c = {
  // 屬性 (Property)
  name: 'The c object',

  // 方法 (Method)
  log: function () {
    console.log(this)
  },
}

c.log() // {name: "The c object", log: ƒ}
```

當我們呼叫的函式是物件的方法時，關鍵字 `this` 會指向「**包含這個方法的物件**」。

在這個範例中 `this` 會指向 c 物件，所以我們可以在 `log` 方法中，使用 `this.name` 去改變 c 物件 `name` 屬性的值。

```javascript
var c = {
  name: 'The c object',
  log: function () {
    this.name = 'Updated c object'
    console.log(this)
  },
}

c.log() // {name: "Updated c object", log: ƒ}
```

## 陷阱！JavaScript 設計上的小缺陷

### 設計缺陷範例

如果在物件 c 的 `log` 方法裡面創造一個 `setName` 函式，試著用 `this.name = newName` 去改變 name 屬性的值。

根據剛才的說法，這個 `setName` 函式的 this 會指向包含該函式的物件（也就是 c 物件），導致 c 物件中的 `name` 屬性被改成 `Updated again! The c object`。

但是結果卻不如預期 🤔

```javascript
var c = {
  name: 'The c object',
  log: function () {
    this.name = 'Updated c object'
    console.log(this) // {name: "Updated c object", log: ƒ}

    var setName = function (newName) {
      this.name = newName
    }
    setName('Updated again! The c object')
    console.log(this) // {name: "Updated c object", log: ƒ}
  },
}

c.log()
```

經過一番折騰後，我們在全域物件 `window` 裡面找到了剛才的 `name` 屬性，而且它的值為 `"Updated again! The c object"`，也就是說剛才等號運算子新增到了 `window` 裡面，也就代表著 `this` 是指向全域物件 `window` 而非 c 物件。

不怪你，這真的就是 JavaScript 設計上的錯誤或缺陷。但是我們該如何解決這個問題，如何讓 this 指向正確的物件呢？

### 常用解決方法

有一個常用的方法可以應付這個情況。

我們都知道物件是用 By Reference 設定的，而且函式第一層的 `this` 沒有設計缺陷，所以我們通常會在方法的第一行設定一個變數 `self` 等於 `this`，讓這個變數 `self` 指向正確的物件。

當子函式發現 `self` 就會依據範圍鏈向外尋找，然後找到方法第一層中被設定為 `this` 的 `self`。

往後如果在子函式裡面需要用到 `this` 指向該物件，就一律使用 `self` 來處理就好哩 👍

```javascript
var c = {
  name: 'The c object',
  log: function () {
    var self = this

    self.name = 'Updated c object'
    console.log(self) // {name: "Updated c object", log: ƒ}

    var setName = function (newName) {
      self.name = newName
    }
    setName('Updated again! The c object')
    console.log(self) // {name: "Updated again! The c object", log: ƒ}
  },
}

c.log()
```

> 補充：使用 ES6 的 let 關鍵字也可以解決這樣的問題喔。

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- 不同情況下 `this` 的指向
- 在物件的函式中透過設定 `self` 為 `this` 來解決指向問題
- 沒有什麼程式語言是完美的，雖然 JavaScript 有設計上的缺陷，但是我們可以透過一些方法去彌補缺陷的存在

## References

- [JavaScript: Understanding the Weird Parts](https://www.udemy.com/course/understand-javascript/)
