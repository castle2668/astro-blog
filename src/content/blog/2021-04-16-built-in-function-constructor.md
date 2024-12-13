---
title: 'Understand JavaScript #22 內建的函式建構子'
excerpt: '本文主要內容為探討「JavaScript 內建的函式建構子」的相關知識。'
tags: ['javascript']
date: 2021-04-16
author: '海豹人 Sealman'
image: 'javascript.png'
slug: 2021-04-16-built-in-function-constructor
---

## 內建的函式建構子 (Built-in Function Constructor)

JavaScript 引擎有內建的函式建構子，這些建構子的原型上還有內建的方法，所有建立的物件都可以取用到內建方法。

使用這些內建的函式建構子的時候，雖然感覺像是在建立純值，但其實是在建立**物件**，這個物件包含了純值與其他額外的功能。

### Number 物件

```javascript
var a = new Number(3)
console.log(a) // Number {[[PrimitiveValue]]: 3}

// Number 物件的原型
console.log(Number.prototype) // Number {0, constructor: ƒ, toExponential: ƒ, toFixed: ƒ, toPrecision: ƒ, …}

// 使用原型上的內建方法
console.log(a.toFixed(2)) // 3.00
```

### String 物件

```javascript
var a = new String('John')
console.log(a) // String {"John"}
console.log(String.prototype) // String {"", constructor: ƒ, anchor: ƒ, big: ƒ, blink: ƒ, …}

// 檢查是否有這個值，回傳位置
console.log(String.prototype.indexOf('o')) // -1
console.log(a.indexOf('o')) // 1
console.log(a.indexOf('h')) // 2
```

此外，有時候 JavaScript 會根據程式碼的寫法，自動判斷我們要的是物件還是純值。

```javascript
// JavaScript 自動將 'John' 判斷為 new String('John')
console.log('John'.length) // 4
```

### Date 物件

雖然內建的 Date 物件就有包含許多內建方法，但這邊建議使用 [Moment.js](https://momentjs.com/)。

```javascript
var a = new Date('2021/4/16')
console.log(a) // Fri Apr 16 2021 00:00:00 GMT+0800 (台北標準時間)
console.log(Date.prototype) // 裡面有一堆方法像是 getFullYear 等等
```

## 編輯內建函式建構子的原型屬性

如果我們要建立一個資源庫或框架，需要新增一些功能到純值、陣列、物件或函式的話，我們可以用內建的函式建構子所建立的物件來完成。

舉例來說，我們在原型上新增方法，增加一個功能給 JavaScript 所有的字串，讓每個字串都可以取用這個方法。

```javascript
String.prototype.isLengthGreaterThan = function (limit) {
  return this.length > limit
}

// 'John' 字串被轉換成物件
console.log('John'.isLengthGreaterThan(2)) // true
```

但如果是數值，JavaScript 不會自動轉換數值為物件，此時就要改用內建的函式建構子 `Number()` 來建立 Number 物件，這樣變數 `a` 的原型就會指向 `Number.prototype`，才能取用到 `isPositive` 方法。

```javascript
Number.prototype.isPositive = function () {
  return this > 0
}

// Error: 數值不會被自動轉換為物件
// console.log(3.isPositive());

// 改用內建的函式建構子 Number()
var a = new Number(3)
console.log(a.isPositive()) // true
```

以上這兩個做法都是所謂的**原型繼承**，我們自己增強或改善 JavaScript 程式語言的功能，很多資源庫與框架也都是這麼做的，不過使用時要注意不要覆寫已經存在的屬性或方法！

## 為何不該用內建函式建構子來處理純值

使用內建的函式建構子來處理純值是很危險的，因為使用內建函式建構子像是 `Number()` 所建立出來的是一個**物件**，它並不是真正的純值，所以在進行比較時會出現問題。

因此，一般來說都不建議使用內建的函式建構子，除非真的需要使用，否則一律建議用**實體語法**建立真正的純值。

```javascript
var a = 3
var b = new Number(3)
console.log(a == b) // true
console.log(a === b) // false
```

另外，如果有要大量處理日期，則不建議使用內建的函式建構子 `Date()`，可以改用 [Moment.js](https://momentjs.com/) 等資源庫，裡面有很多函式可以處理日期甚至做日期運算，它可以解決一些內建的建構子的問題。

## 危險組合 - 陣列與 for in

JavaScript 的陣列是一種特別的「物件」，陣列的索引 0, 1, 2 其實就是物件 Name/Value Pair 的 Name 屬性，因此我們也可以使用物件的 `for...in` 去遍歷陣列的所有項目。

但是使用 `for...in` 去遍歷陣列是很危險的作法，因為 `for...in` 會連從原型上繼承過來的屬性都一起傳回來！

舉例來說，如果在遍歷陣列之前有對陣列的原型新增屬性的話，那個新增在原型上的屬性也會一起被輸出。

所以使用陣列時，一般還是建議使用標準（使用數值為索引）的方式像是 for 迴圈即可。

```javascript
Array.prototype.myCustomFeature = 'cool!'
var arr = ['Damao', 'Sealman', 'Sean']

for (var prop in arr) {
  console.log(prop + ': ' + arr[prop])
}
// 0: Damao
// 1: Sealman
// 2: Sean
// myCustomFeature: cool!

for (var i = 0; i < arr.length; i++) {
  console.log(i + ': ' + arr[i])
}
// 0: Damao
// 1: Sealman
// 2: Sean
```

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- 如何使用「內建的函式建構子」建立 Number、String、Date 物件
- 原型繼承：編輯內建函式建構子的原型屬性
- 使用內建的函式建構子來處理純值是很危險的
- 為什麼不建議使用 for in 去遍歷一個陣列

## References

- [JavaScript: Understanding the Weird Parts](https://www.udemy.com/course/understand-javascript/)
