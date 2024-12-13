---
title: 'Understand JavaScript #5 範圍鏈 (Scope Chain)'
excerpt: '範圍鏈是什麼，這個專有名詞聽起來好像很難懂，但是其實它很好理解呢。'
tags: ['javascript']
date: 2021-02-27
author: '海豹人 Sealman'
image: 'javascript.png'
slug: 2021-02-27-scope-chain
---

## 函式、環境、變數環境 (Variable Environment)

「變數環境」是指你創造變數的位置，以及它在記憶體中與其他變數的關係。簡單來說，就是你的變數在哪裡。

以下是一個簡單的例子，每個 `myVar` 其實各自定義在不同的執行環境中，雖然 `myVar` 被宣告了三次，但它們三個都是不一樣的，彼此之間沒有關聯。

```javascript
function b() {
  var myVar // b() 執行環境
}

function a() {
  var myVar = 2 // a() 執行環境
  b()
}

var myVar = 1 // 全域執行環境
a()
```

我們可以加上 `console.log(myVar)` 來驗證我們的理解，可以想一想我們會得到什麼樣的結果與順序。

```javascript
function b() {
  var myVar
  console.log(myVar) // undefined
}

function a() {
  var myVar = 2
  console.log(myVar) // 2
  b()
}

var myVar = 1
console.log(myVar) // 1
a()
console.log(myVar) // 1
```

我們會得到 1 → 2 → undefined → 1 的結果。

為什麼？這裡的重點在於需要理解進入與離開執行環境的流程。

一開始我們是在全域執行環境，因此會 Log 出全域執行環境下的 `myVar`，接著則進入 `a()` 而後是 `b()` 的執行環境。  
當函式執行完成後會 Pop Off 出來，此時會先離開 `b()` 而後離開 `a()`，最後就會回到全域並執行最後一行的 Log。

## 範圍鏈 (Scope Chain)

執行函式時，如果在當前的執行環境下找不到需要的變數，就會到「外部環境」尋找變數，而外部環境會依照函式的實際位置而有所不同。

什麼是外部環境呢？

### 外部環境

每個執行環境，都會有一個外部環境。

JavaScript 會透過 Parser 得知這段程式碼「物理上」的實際位置，並為執行環境創造一個「外部環境的參照」，這個參照相當於前面提到的「詞彙環境」。

前面提到過「詞彙環境 = 程式碼被寫出來的實際位置」，所以如果用剛才的例子來看，`b()` 函式的詞彙環境會是全域執行環境。

這個向外找的動作是可以一直延續的，也就是說當我們在外部環境找不到變數時，可以再往外繼續尋找，直到全域等級為止（因為全域執行環境沒有外部環境了）。

### 構成範圍鏈

現在回來看看上面敘述的「向外尋找變數，直到有找到或沒找到為止」這句話，這段過程聽起來就像是有一條鏈子，而這一整條鏈子我們稱為「範圍鏈」。

**範圍**代表我可以存取到這個變數的地方，而**鏈**就是所有外部環境參照的鏈結。

例如：當 JavaScript 找不到 b 變數，會一路往範圍鏈下去找。  
現在我們能夠理解這句話的意思囉！

到目前為止，我們可以得到一個小結論。

- 「執行環境」與「函式調用、執行順序、執行緒」有關
- 「詞彙環境」與「外部環境、尋找變數」有關

## ES6 let 的區塊範圍 (Block Scoping)

### 範圍 (Scope)

範圍就是變數可以被取用的區域。

若呼叫相同的函式兩次，各自會有自己的一個執行環境，因此函式中的變數雖然相同，但是在記憶體中其實是兩個不同的變數。

### ES6 let - Block Scoping

ES6 引入新的宣告變數方式 let。

let 讓 JavaScript 使用一種叫做區塊範圍 (Block Scoping) 的東西，而這個「區塊」的定義其實就是指在「大括號」中的意思，像是 if 敘述裡面或是 for 迴圈裡面大括號。

當變數使用 let 宣告在區塊裡面時，它就只能在那一個區塊中被取用。

所以如果執行 for 迴圈時使用 let 宣告，則每一次執行時宣告的變數，在記憶體中的位置都是不同的，而這就是區塊範圍的概念。

雖然這個變數宣告的方式與 var 相同，宣告後變數都會被放到記憶體中，並且有預設值 `undefined`。  
但是 let 宣告的變數必須等到那一行程式碼被執行時，才是真正宣告變數，此時變數才可以被使用，也就是說它不像 var 一樣可以 Hoisting。

### 暫時性死區 (Temporal Dead Zone)

話雖如此，但是其實 let 與 const 也有 Hoisting，只是他們的 Hoisting 並不會初始化為 `undefined`，而是會形成 TDZ。

在「提升之後」以及「賦值之前」的這段期間，如果在賦值之前就試圖取值，則會拋出錯誤，如下方範例所示。

```javascript
console.log(c) // Uncaught ReferenceError: c is not defined
let c = true
```

如果調整一下順序，讓變數**先被賦值之後再取值**就沒問題了。

> 注意：並不是撰寫順序上把取值的動作寫在後面就可以，而是在「執行順序」上取值的動作要在賦值後面。

```javascript
let c = true
console.log(c) // true
```

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- 知道在呼叫函式後，執行堆的順序該怎麼跑，以及變數環境在哪裡
- 範圍鏈就是可以存取到這個變數的外部環境參照的範圍
- ES6 let 的區塊範圍、提升、暫時性死區

## References

- [JavaScript: Understanding the Weird Parts](https://www.udemy.com/course/understand-javascript/)
