---
title: 'Understand JavaScript #13 函式參數與 arguments、spread'
excerpt: '本文主要內容為探討「函式參數」的相關知識，包含預設值、arguments 關鍵字、spread parameter 等等。'
tags: ['javascript']
date: 2021-03-29
author: '海豹人 Sealman'
image: 'javascript.png'
slug: 2021-03-29-arguments-spread
---

## 為參數設定預設值

其實在執行參數時，JavaScript 就會幫參數設定記憶體空間，並且設定預設值為 undefined。  
所以如果調用時沒有傳入對應位置的參數，就會出現預設值 undefined 哩。

```javascript
function greet(firstname, lastname, language) {
  console.log(firstname) // undefined
  console.log(lastname) // undefined
  console.log(language) // undefined
}
greet()
```

到了 ES6 我們可以直接為參數設定預設值，如果沒有傳入相對應位置的參數，就會使用該參數設定的預設值。

```javascript
function greet(firstname, lastname, language = 'en') {
  console.log(firstname) // Damao
  console.log(lastname) // Huang
  console.log(language) // en
}
greet('Damao', 'Huang')
```

然而，如果要針對某些不支援 ES6 的瀏覽器做處理，我們就只能自己動手完成預設值的概念了。例如：當 language 是 undefined 的時候，會強制轉型為 false，最終就會得到 `'en'` 的值。

```javascript
function greet(firstname, lastname, language) {
  language = language || 'en'
  console.log(firstname)
  console.log(lastname)
  console.log(language)
}
greet('Damao', 'Huang')
```

## ES5 的 arguments 關鍵字

之前我們提到，當我們執行函式時，創造一個新的執行環境，然後 JavaScript 會自動設定變數環境、給範圍鏈的外部環境參考，以及特殊關鍵字 this。

除了以上這些東西，JavaScript 還會設定另一個特殊關鍵字 arguments，它會「包含所有參數傳入的值」，並且形成一個**類陣列 (Array-Like)**，辨認方法就是它是微微傾斜的中括號。

![arguments](https://i.imgur.com/GHSwkCR.png)

使用的方法很簡單，我們可以在函式內的任何地方呼叫它，另外也能搭配使用一些陣列的方法。

例如：使用 `arguments.length` 檢查有沒有傳入參數，如果是 0 就跳出函式。

```javascript
function greet(firstname, lastname, language) {
  if (arguments.length === 0) {
    console.log('Missing Parameters!')
    console.log('--------------------')
    return
  }
  console.log(firstname)
  console.log(lastname)
  console.log(language)
  console.log(arguments)
  console.log('arg 0:', arguments[0])
  console.log('--------------------')
}

greet()
greet('Damao', 'Huang', 'zh-tw')
```

## ES6 的 spread parameter

到了 ES6 出現了 spread parameter，它的用法是 `...名稱`，用途是將那些沒有直接寫出來的參數（此為 firstname、lastname、language 以外的參數），通通都包在這個名稱的陣列裡面。

```javascript
function greet(firstname, lastname, language, ...other) {
  console.log(firstname)
  console.log(lastname)
  console.log(language)
  console.log(other) // (2) ["test1", "test2"]
}

greet('Damao', 'Huang', 'zh-tw', 'test1', 'test2')
```

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- 函式初始化時會為參數設定預設值
- 認識 ES5 的 arguments 關鍵字與應用方式
- 認識 ES6 的 spread parameter

## References

- [JavaScript: Understanding the Weird Parts](https://www.udemy.com/course/understand-javascript/)
