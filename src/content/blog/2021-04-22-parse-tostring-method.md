---
title: 'Understand JavaScript #25 解析 toString() 方法 ft. typeof, instanceof'
excerpt: '本文主要內容為探討 JavaScript 中 toString() 方法的相關知識，以及關鍵字 typeof 和 instanceof 的使用。'
tags: ['javascript']
date: 2021-04-22
author: '海豹人 Sealman'
image: 'javascript.png'
slug: 2021-04-22-parse-tostring-method
---

## 使用物件的 toString() 檢測各種型別

JavaScript 中有個關鍵字 `typeof`，顧名思義，它能夠回傳型別。

然而如果要精準地判斷型別，我們應該使用物件的 `toString()` 而不是 `typeof`，為什麼呢？

### 使用 typeof 判斷型別

```javascript
var a = 3
console.log(typeof a) // number

var b = 'Hello'
console.log(typeof b) // string

var c = { firstname: 'Damao' }
console.log(typeof c) // object

var d = []
console.log(typeof d) // object

const z = function () {}
console.log(typeof z) // function
```

我們可以看到關鍵的問題出在 Object 與 Array 身上，關鍵字 `typeof` 沒辦法判斷出陣列，因為在 JavaScript 中，除了基本型別以外的其他東西都是物件！

### 使用 toString() 判斷型別

所有的純值（基本型別）除了 null 跟 undefined 之外都有 `toString()` 方法。

這些 `toString()` 方法是從 `Object.prototype` 中繼承下來的，但是很多東西不會是一成不變的，繼承後 JavaScript 重寫了這個方法讓它更加實用。

舉例來說，兒子 Array 繼承自爸爸 Object，繼承時 JavaScript 在 `Array.prototype` 上重寫了 `toString()` 方法，所以使用 `arr.toString()` 時，實際調用的是 `Array.prototype.toString()`。

```javascript
// 數字的陣列 [0, 1, 2] 可以直接轉成字串 "0,1,2"
var arr = [0, 1, 2] // "0,1,2"
console.log(arr.toString())
```

再看看另一個兒子「數值」所改寫的 `toString()` 方法，它甚至可以把數值轉換成不同的進位制。

```javascript
var num = 10
console.log(num.toString(2)) // 10 進位轉為 2 進位 => 1010
```

至於物件當然也可以使用 `toString()`，但是結果會顯示成 `"[object Object]"` 這種樣子。

想要看到 `key: value` 還是得用 Loop，或是使用 `JSON.stringify()` 也可以看到完整 Object 的一行字串。

```javascript
var a = 3
console.log(a.toString()) // "3"

var b = 'Hello'
console.log(b.toString()) // "Hello"

var c = { firstname: 'Damao' }
console.log(c.toString()) // "[object Object]"
console.log(JSON.stringify(c)) // {"firstname":"Damao"}
```

如果是陣列呢？陣列也是一種物件，所以基本上跟物件的結果一樣。

差別在於陣列的 `toString()` 方法會試著將陣列中的**物件**轉為字串，此時如果是「空陣列」就會等於陣列中沒有物件，結果就會回傳空字串。

```javascript
var d = []
console.log(typeof d) // object
console.log(d.toString()) // "" (空字串)

var d = [{}]
console.log(d.toString()) // [object Object]
console.log(JSON.stringify(d)) // "[{}]"
```

然而，到目前為止，我們可以發現陣列和物件使用 `toString()` 的結果都是 `"[object Object]"`，所以問題還沒有解決，到底要怎麼檢驗區分出 Array 跟 Object 呢？

### 使用 Object.prototype.toString.call() 判斷型別

答案就是使用物件的原型的 `toString()` 方法，搭配使用 `.call()` 來控制 `this` 指向並且呼叫，就能精準地判斷各種型別囉！

例如：陣列會得到 `[object Array]`，物件則會得到 `[object Object]`，這樣子就能分辨物件與陣列哩。

#### toString() 與 Object.prototype.toString() 有何不同

Q：什麼是 `Object.prototype.toString()`？

A：內建的函式建構子加上 `.prototype` 就是指它們的原型，在原型上有內建方法，像是物件的原型上有 `toString()` 方法。

- Object、Array、Date、Function → 內建的函式建構子
- `Object.prototype` → 預設的原生原型

  ```javascript
  console.log(Object.prototype) // 基本物件
  console.log(Object.prototype.__proto__) // null
  ```

- `Object.prototype.toString()` → 內建方法

因為物件的 `toString()` 方法會返回 **[object "type"]**，其中 type 是指這個物件的類別，所以我們可以發現這個 type 就能拿來區別物件與陣列。

我們讓每個東西都通過 `Object.prototype.toString()` 檢測，這個方法能判斷所有的型別喔！

```javascript
console.log(Object.prototype.toString.call(a)) // [object Number]
console.log(Object.prototype.toString.call(b)) // [object String]
console.log(Object.prototype.toString.call(c)) // [object Object]
console.log(Object.prototype.toString.call(d)) // [object Array]
console.log(Object.prototype.toString.call(undefined)) // [object Undefined]
console.log(Object.prototype.toString.call(null)) // [object Null]
```

結論：如果要精確地判斷型別，特別是區分物件與陣列，就要用物件的 `toString()` 方法。

## 另一個關鍵字 instanceof

如果物件 `e` 能在原型鏈上找到物件 `Person` 就會回傳 true，也就代表 `e` 是 `Person` 的 Instance。

```javascript
function Person(name) {
  this.name = name
}
var e = new Person('Damao')
console.log(e) // Person {name: "Damao"}
console.log(typeof e) // object
console.log(e instanceof Person) // true
```

## 萬年 bug - typeof null

剛才講 `typeof` 的時候沒有提到 undefined 與 null。

首先 `typeof undefined` 得到 undefined 的結果還算合理，因為 undefined 代表沒有東西，所以型別尚未定義是可以接受的結果。

不過 `typeof null` 得到物件 (object) 這個結果就是 JavaScript 的 bug 了，但是因為這個問題存在很久了，過去建置的網站可能有用到，所以不能修正哩 🤔

```javascript
console.log(typeof undefined) // undefined
console.log(typeof null) // object
```

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- 如何使用 `typeof`
- 三種判斷型別的方法，以及哪一個能夠最精確地判斷型別
- JavaScript 中 `toString()` 與 `Object.prototype.toString()` 有何不同
- 如何使用 `instanceof`
- JavaScript 萬年 bug - `typeof null`

## References

- [JavaScript: Understanding the Weird Parts](https://www.udemy.com/course/understand-javascript/)
