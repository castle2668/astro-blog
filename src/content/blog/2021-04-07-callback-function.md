---
title: 'Understand JavaScript #17 回呼函式 (Callback Function)'
excerpt: '本文主要內容為探討「回呼函式」的相關知識，其實我們可能已經用過回呼函式的概念了，像是 setTimeout 或是 jQuery 事件就是在使用閉包與回呼的概念喔。'
tags: ['javascript']
date: 2021-04-07
author: '海豹人 Sealman'
image: 'javascript.png'
slug: 2021-04-07-callback-function
---

## 閉包與回呼

- 回呼 (Callback)：執行一個函式，並給它一個函式作為參數，當那個函式結束後，它會執行我們給它的函式
  - 例如：我呼叫函式 A 並給它函式 B，當 A 結束後，A 會呼叫函式 B

下面是一個簡單的回呼函式，我們呼叫 `tellMeWhenDone` 並且給予一個函式作為參數，當 `tellMeWhenDone` 呼叫到 `callback` 時就會執行我們給的函式。

```javascript
function tellMeWhenDone(callback) {
  var a = 1000
  var b = 2000

  callback() // 回呼，執行作為參數的函式
}

tellMeWhenDone(function () {
  console.log('I am Done!')
})

tellMeWhenDone(function () {
  console.log('All Done...')
})

// I am Done!
// All Done...
```

另外，其實 JavaScript 的內建函式 setTimeout 就是一個回呼函式，使用 setTimeout 就會用到函式表達式、一級函式、閉包等概念。

- 函式表達式：利用函式表達式建立函式
- 一級函式：將函式作為參數傳入
- 閉包：執行 setTimeout 的 Function 時，需要到範圍鏈上向外尋找 `greeting` 這個變數，因為有閉包，所以就算 `sayHiLater` 已經結束（只花幾毫秒就執行完了，而不是 3 秒），過 3 秒後依然可以取用到 `greeting`

```javascript
function sayHiLater() {
  var greeting = 'Hi!'

  setTimeout(function () {
    console.log(greeting)
  }, 3000)
}

sayHiLater()
```

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- 瞭解回呼函式的概念
- 其實 JavaScript 有一些內建的函式就已經是回呼函式了！

## References

- [JavaScript: Understanding the Weird Parts](https://www.udemy.com/course/understand-javascript/)
