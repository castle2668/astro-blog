---
title: 'Understand JavaScript #10 函式就是物件 (Functions Are Objects)'
excerpt: '本文主要內容為探討「函式物件」的相關知識，包含「一級函式」這個讓 JavaScript 適合撰寫 Functional Programming 的特性，以及函式陳述式、函式表達式、匿名函式等重要觀念。'
tags: ['javascript']
date: 2021-03-22
author: '海豹人 Sealman'
image: 'javascript.png'
slug: 2021-03-22-functions-are-objects
---

## 一級函式 (First-class Functions)

- 一級函式：可以用別的型別（字串、數值、布林）做到的事情，都可以用函式做到
  - 例如：可以指派一個變數的值為函式；可以將函式作為參數傳入另一個函式；可以用實體語法 (Literal Syntax) 立即創造函式

函式是一個特殊的物件，以下稱為「函式物件」。

與物件相同，函式物件也會被放進記憶體中，而除了物件的特色外，它還有隱藏的特殊屬性 Name (optional) 與 Code（程式屬性），其中的 Code 屬性為 Invocable，即可以透過 `()` 呼叫，執行設定在這個屬性內的程式碼。

我們平常撰寫函式的程式碼，其實並不是在撰寫函式物件，我們只是在撰寫函式物件中的 Name 與 Code 這兩個「屬性」而已（可以想像函式只是程式碼的容器）。

![First Class Functions](https://i.imgur.com/NNI4kmU.png)

我們來做點事情，幫助理解以上的觀念好了。

我們新增一個函式物件，其中 `greet` 就是函式物件的 Name 屬性，而函式的內容就是 Code 屬性。

如果我們加上 `()` 變成 `greet()`， 就能呼叫函式，讓函式執行。而因為函式就是物件，所以我們也可以透過**點運算子**來存取屬性。

```javascript
function greet() {
  // Name: greet
  console.log('Hi') // Code
}

greet.language = 'english'

console.log(greet) // 這只會得到函式的所有文字
console.log(greet.language) // english
```

![First Class Functions Example](https://i.imgur.com/D7EXbm9.png)

其實在函式加上屬性這個動作，在其他程式語言是不可能出現的，但在 JavaScript 中因為函式就是物件，所以可以做到。

## 函式陳述式 (Function Statement) vs. 函式表達式 (Function Expression)

在 JavaScript 的函式物件中，有函式陳述式與函式表達式。

- 陳述式 (Statement)：會做某件事
- 表達式 (Expression)：是程式碼的單位，會「回傳」或者說是「形成」一個值

### 表達式 (Expression)

表達式回傳的值不一定要儲存在變數中（記憶體中）。

以下最後兩段程式碼都會形成一個值，一個用變數儲存，另一個沒有。但是這兩行程式碼都是表達式，因為它們都有回傳值。

```javascript
var a
a = 3 // Return: 3 → 表達式
1 + 2 // Return: 3 → 表達式
```

> 還記得運算子就是一個函式吧？
> 像是等號運算子就是將右邊的值傳給左邊，並將左邊的值設定在記憶體中，然後回傳右邊的值。

### 陳述式 (Statement)

陳述式的裡面可以再使用表達式，但它本身還是一個陳述式。

像是 if 陳述式就是達到條件的話會做某件事，它是一個陳述式，不會回傳任何值。

而在 `if(){...}` 的小括號裡的 `a === 3` 則是表達式，它會回傳 true 或 false，用來判斷是否達成條件。

```javascript
// If Statement
if (a === 3 /* Expression */) {
  // do something...
}
```

### 匿名函式

- 匿名函式 (Anonymous Function)：沒有 Name 屬性的函式

建立一個函式物件，設定它等於一個變數 `anonymousGreet`，這個變數在記憶體中有一個指向的位址，這個位址連接著這個函式物件。

接著，等號運算子讓函式物件放進記憶體後，指向 `anonymousGreet` 變數的記憶體位址。

此時 `function` 不需要寫 Name 屬性，因為已經有連結函式物件的位址的 `anonymousGreet` 變數名稱了，它可以作為使用時的參照，所以不必再設定 Name 屬性作為參照，而這就稱為**匿名函式**。

```javascript
greet()

// Function Statement
function greet() {
  console.log('hi')
}

// Function Expression
var anonymousGreet = function () {
  console.log('anonymous hi')
}

anonymousGreet()
```

第 3 行的 `function greet(){}` 是函式陳述式，當程式執行時，它不會做任何事情，JavaScript 就只是把它加到記憶體中，接著繼續往下解析。

第 9 行 `anonymousGreet` 的等號後面的**匿名函式**（也就是 `function(){}` 這個部分）則是函式表達式，因為它會創造一個值（函式物件）給變數。

另外，如果把 `anonymousGreet()` 的調用移到宣告之前會出現錯誤訊息，而非像第一行一樣提升。

```javascript
anonymousGreet() // Uncaught TypeError: undefined is not a function

var anonymousGreet = function () {
  console.log('anonymous hi')
}
```

在執行階段，JavaScript 會依序將「函式陳述式」與「變數」放進記憶體，但變數此時是預設值 **undefined**。

因此第一段 `greet()` 可以呼叫到完整的函式，然而試著以函式的方式呼叫 `anonymousGreet` 的時候，就只能找到變數 `anonymousGreet`，而且此時的值為 undefined。

## 函式語言程式設計 (Functional Programming)

我們可以把各型別的值傳入函式作為參數，甚至可以傳一個函式物件。

```javascript
function log(a) {
  console.log(a)
}

log(3) // 3
log('Hello') // Hello

// {greeting: "hi"}
log({
  greeting: 'hi',
})

// ƒ () { console.log('hi') }
log(function () {
  console.log('hi')
})
```

如果想要執行傳入的函式，可以改成使用小括號來呼叫函式。

> 這邊 `log()` 裡面的 `function(){...}` 是屬於函式表達式，因為裡面的 `function` 會形成一個值作為參數，傳給 `log` 這個 Function 使用。

```javascript
function log(a) {
  a()
}

// hi
log(function () {
  console.log('hi')
})
```

像以上這樣把函式傳給另一個函式的做法，就是 Functional Programming 的概念。

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- 函式除了有物件的特色外，還有隱藏的特殊屬性 Name 與 Code
- 函式陳述式與函式表達式
- 如何建立與使用匿名函式
- 認識 Functional Programming 的概念

## References

- [JavaScript: Understanding the Weird Parts](https://www.udemy.com/course/understand-javascript/)
