---
title: 'Understand JavaScript #20 物件導向與原型繼承'
excerpt: '本文主要內容為探討「原型」的相關知識，包含原型繼承、原型鏈、基本物件，以及資源庫 Underscore 裡面的 Reflection 與 Extend 模式。'
tags: ['javascript']
date: 2021-04-12
author: '海豹人 Sealman'
image: 'javascript.png'
slug: 2021-04-12-prototype-chain
---

## 古典繼承 vs. 原型繼承

- 繼承 (Inheritance)：一個物件可以取用另一個物件的屬性或方法
- 古典繼承 (Classical Inheritance)：出現最久也最受歡迎，應用在 C# 和 Java 等語言，缺點是一旦數量龐大就會很複雜，而且有很多關鍵字要記憶與學習
- 原型繼承 (Prototypal Inheritance)：簡單易懂，具有彈性與可擴充性，JavaScript 用原型繼承來分享物件的屬性和方法

## 原型鏈

- 原型 (Prototype)：所有的物件（包含函式）都有一個 `proto` 屬性，這個屬性會參考到另一個物件，而被參考到的物件就是原型
  - 如果在主要物件上找不到想要取用的屬性，就會往原型去找，所以雖然屬性看起來是在主要物件上，但其實是在一個稱為原型鏈的東西上
- 原型鏈 (Prototype Chain)：透過原型屬性 `proto` 連結著，讓主要物件在這上面取用屬性和方法

![Prototype](https://i.imgur.com/qxzM2yP.png)

我們直接透過程式碼來理解原型的概念吧。

現今的瀏覽器有提供方法可以直接取用原型，但是非常不建議實際使用，因為運行效能很差，只能在 Demo 說明時使用。

```javascript
var person = {
  firstname: 'Default',
  lastname: 'Default',
  getFullName: function () {
    return this.firstname + ' ' + this.lastname
  },
}

var damao = {
  firstname: 'Damao',
  lastname: 'Huang',
}

// Don't do this EVER! for example purposes only.
damao.__proto__ = person // (1)
console.log(damao.getFullName()) // (2) Damao Huang
console.log(damao.firstname) // (3) Damao
```

1. 將 `damao` 的原型屬性設定為 `person`，意思就是 `damao` 繼承自 `person`。換句話說，就是 `damao` 原來的本質被設定為 `person`。
2. 在 `damao` 裡面找不到 `getFullName` 方法時，會往原型 `proto` 尋找。注意：此時方法中的 `this` 會指向呼叫函式的物件 `damao`。
3. 使用 `damao.firstname` 在 `damao` 物件找到 `firstname` 之後就會結束了，不會再進入原型鏈。

## 基本物件

在 JavaScript 中，所有的東西都是物件或純值，而且它們都有原型，然而只有一個東西沒有原型，那就是「基本物件」。

基本物件就是原型鏈最末端（後代）的東西，如果再往上找（祖先）則會得到 `null`。

```javascript
var a = {}
var b = function () {}
var c = []
var d = ''

console.log(a.__proto__) // Object {} → 基本物件
console.log(a.__proto__.__proto__) // null

console.log(b.__proto__) // ƒ () { [native code] }
console.log(b.__proto__.__proto__) // Object {}
console.log(b.__proto__.__proto__.__proto__) // null

console.log(c.__proto__) // []
console.log(c.__proto__.__proto__) // Object {}
console.log(c.__proto__.__proto__.__proto__) // null

console.log(d.__proto__) // ""
console.log(d.__proto__.__proto__) // Object {}
console.log(d.__proto__.__proto__.__proto__) // null
```

## Underscore 的 Reflection 與 Extend 模式

- Extend：另一個建立物件的函式，它不是 JavaScript 的原生方法，而是資源庫 Underscore 裡面出現的方法，在其他資源庫中也有類似的方法
- Reflection：簡單來說就是讓 JavaScript 的物件可以看見與改變自己的屬性與方法
- 藉由 Reflection，我們才能做到 Extend

我們來看看 Underscore 資源庫的 extend 方法是如何運作的。

### Reflection

首先 Reflection 的運行原理就類似使用**基本物件**的 `hasOwnProperty` 方法，會去檢查該物件是否有某個屬性或方法，而且跟 `for...in` 不一樣，這個方法並未檢查物件的原型鏈。

> 為了解釋觀念，以下程式碼只是在概念上差不多而已，與 Underscore 的原始碼當然是不一樣的。

```javascript
var person = {
  firstname: 'Default',
  lastname: 'Default',
  getFullName: function () {
    return this.firstname + ' ' + this.lastname
  },
}

var damao = {
  firstname: 'Damao',
  lastname: 'Huang',
}

damao.__proto__ = person // Don't do this EVER! for example purposes only.

// 1. 遍歷物件裡的每個東西
for (var prop in damao) {
  console.log(prop + ': ' + damao[prop]) // 使用中括號，因為 prop 是字串
}

// 2. 只取得自己本身的東西
for (var prop in damao) {
  // 後代可以使用基本物件的方法
  if (damao.hasOwnProperty(prop)) {
    console.log(prop + ': ' + damao[prop])
  }
}
```

1. 使用 `for...in` 遍歷物件裡的每個東西，除了物件 `damao` 本身的屬性和方法，`for...in` 也會取得原型上的屬性和方法。
2. 如果只想取得自己本身的東西，可以使用**基本物件**的 `hasOwnProperty` 方法，這個就類似於 Reflect 的動作。

知道了 Reflection 的概念後，我們來看看怎麼使用 Extend 這個模式。

### Extend

使用 Extend 時，第一個參數是想要延長的物件（一個後代），而後方第二、第三個參數的物件可以放很多個（多個祖先），所以最後會有一大串東西加到我們的 `damao` 物件裡面。

```javascript
var sean = {
  address: '111 Main St.',
  getFormalFullName: function () {
    return this.lastname + ' ' + this.firstname
  },
}

var sealman = {
  getFirstName: function () {
    return this.firstname
  },
}

_.extend(damao, sean, sealman)
console.log(damao)
```

由此可以看出，Underscore 的 `_.extend()` 跟原型鏈的概念不同，它是把很多屬性結合放到一個物件上。

在實作時，我們不一定只能用原型鏈，使用 Underscore 提供的 Reflection 與 Extend 模式也很好用，而我自己也是比較喜歡 Underscore 的寫法與邏輯。

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- JavaScript 原型繼承與原型鏈的概念
- 基本物件是原型鏈的最末端
- 資源庫 Underscroe 裡面的 Reflection 與 Extend 模式

## References

- [JavaScript: Understanding the Weird Parts](https://www.udemy.com/course/understand-javascript/)
