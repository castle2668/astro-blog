---
title: 'Understand JavaScript #16 函式工廠 (Function Factory)'
excerpt: '本文主要內容為探討「函式工廠」的相關知識。閉包有很多有用的地方，像是函式工廠就是用閉包建立的模式，文章內容也會包含重載函式、一級函式、執行環境等概念。'
tags: ['javascript']
date: 2021-04-05
author: '海豹人 Sealman'
image: 'javascript.png'
slug: 2021-04-05-function-factory
---

## 重載函式 (Function Overloading)

- 重載函式：讓函式能夠有不同數量的參數

其實 JavaScript 沒有重載函式的概念，因為 JavaScript 中的函式就是物件，無法像其他程式語言一樣做到重載函式，不過 JavaScript 卻有一級函式的概念，因此也可以做到相似的函式處理。

假設今天有一個 `greet` 函式，但我不想每次都傳入 `language` 這個參數，我們可以設定預設值，使用時則傳入不同語言的參數，就能以不同語言來打招呼。

```javascript
function greet(firstname, lastname, language) {
  language = language || 'en'
  if (language === 'en') {
    console.log(`Hello ${firstname} ${lastname}`)
  }
  if (language === 'es') {
    console.log(`Hola ${firstname} ${lastname}`)
  }
}

greet('Damao', 'Huang', 'en')
greet('Damao', 'Huang', 'es')
```

我們可以再加強以上寫法，使用類似重載函式的寫法，讓函式不用傳入這麼多資訊。

例如：另外創造兩個函式，再將特定的參數值 `en` 和 `es` 分別先帶入函式的內容中。完成後，如果要用英文打招呼就呼叫 `greetEnglish` 函式，用西班牙語則呼叫 `greetSpanish` 函式，這樣在使用時就不用考慮 `language` 這個參數了。

```javascript
function greetEnglish(firstname, lastname) {
  greet(firstname, lastname, 'en')
}

function greetSpanish(firstname, lastname) {
  greet(firstname, lastname, 'es')
}

greetEnglish('Damao', 'Huang')
greetSpanish('Damao', 'Huang')
```

這種類似重載函式的寫法是一個在 JavaScript 中比較簡單的模式，可以幫助我們更清楚地瞭解每個函式的用途，接下來我們以此為基礎，進階到函式工廠這個設計模式。

## 函式工廠 (Function Factory)

- 工廠函式：會回傳一個幫我做事的函式

工廠函式 `makeGreeting` 會回傳一個函式給我們，這個函式的邏輯與剛才的 `greet` 函式相同，只差在參數 `language` 被移到外部函式。

當內部函式被呼叫時，`language` 會被包在閉包裡面，它是一個「自由變數」，內部函式隨著範圍鏈往外找就可以參考到它。

```javascript
function makeGreeting(language) {
  return function (firstname, lastname) {
    if (language === 'en') {
      console.log(`Hello ${firstname} ${lastname}`)
    }
    if (language === 'es') {
      console.log(`Hola ${firstname} ${lastname}`)
    }
  }
}

var greetEnglish = makeGreeting('en')
var greetSpanish = makeGreeting('es')

greetEnglish('Damao', 'Huang')
greetSpanish('Damao', 'Huang')
```

接著我們執行了兩次 `makeGreeting`，雖然這是同一個函式（詞彙環境相同），但是執行兩次就會產生兩個不同的**執行環境**，因此產生的兩個變數 `language` 的**記憶體位址**是不同的。

![makeGreeting](https://i.imgur.com/gTmXsPS.png)

這就是閉包的特性，它讓內部函式記得自己是在何時何地被創造的，內部函式可以正確地參考到自己的外部函式的**執行環境**，也能參考到應該要找的自由變數的**記憶體空間位置**，一切就好像其他函式的執行環境還沒消失一樣。

使用閉包與函式工廠的概念，我們不用每次都傳入相同的參數，而是直接創造新的函式，透過閉包去製造預設的參數。

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- 重載函式的概念以及在 JavaScript 中類似的撰寫模式
- 瞭解函式工廠的概念，使用其他函式創造函式

## References

- [JavaScript: Understanding the Weird Parts](https://www.udemy.com/course/understand-javascript/)
