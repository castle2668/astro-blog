---
title: 'Understand JavaScript #2 語法作用域 (Lexical Scope)'
excerpt: 'JavaScript 是屬於語法作用域（靜態作用域），而靜態作用域與動態作用域這兩者有何不同呢。'
tags: ['javascript']
date: 2021-02-24
author: '海豹人 Sealman'
image: 'javascript.png'
slug: 2021-02-24-lexical-scope
---

## 詞彙環境 (Lexical Environment)

詞彙環境指程式碼被「寫在哪裡」，程式碼實際執行的位置。這個位置可以影響在執行階段時，它所對應的記憶體位置，也能影響它和其他周圍的變數與函式的互動。

因此，當 JavaScript 程式碼被撰寫，也就是定義了詞彙環境之後，同時也等同於定義了它的（語法）作用域。

## 語法作用域 (Lexical Scope) aka 靜態作用域

JavaScript 是語法作用域（又稱為靜態作用域），語法在解析時就已經確定作用域，且不會改變。

當作用域內沒有需要的變數時，JavaScript 就會向外查找，如果向外查找還是找不到，就會回傳 `變數 is not defined` 的錯誤。

下方範例中，因為 JavaScript 的作用域是在**函式**裡面，因此函式內會讀到 `sean` 這個變數，但是外層是讀不到的。

```javascript
function callName() {
  var sean = 'Sean'
  console.log(sean)
}

callName() // Sean
console.log(sean) // Sean is not defined
```

## 動態作用域

在函式調用時才會決定作用域。

以下範例說明靜態作用域與動態作用域，在使用時兩者之間的差異。

```javascript
var value = 1

function fn1() {
  console.log(value) // 語法作用域：1
  // 若是動態作用域，這裡則會得到 2
}

function fn2() {
  var value = 2
  fn1()
}

fn2()
```

如果是語法作用域 (JavaScript)，`var value = 2;` 的作用域只在 `fn2` 裡面，因此會得到 `value` 為 1 的結果。

但如果是動態作用域，則是在函式調用時才決定作用域，因此 `fn1` 會「向上一層的函式宣告的位置」來查找變數的值，因而取到 `value` 為 2 的值。

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- 語法作用域（靜態作用域）與動態作用域的差異
- JavaScript 是屬於語法作用域

## References

- [JavaScript: Understanding the Weird Parts](https://www.udemy.com/course/understand-javascript/)
