---
title: 'Understand JavaScript #4 Execution Context - How JS Works Behind The Scenes'
excerpt: '本篇主要介紹 JavaScript 的運作過程，可以瞭解到 JavaScript 底層在做的事情，以及程式碼處理與執行的過程，還有一些我們必須理解的專有名詞。以下一一仔細跟大家說明 (๑•̀ㅂ•́)و✧'
tags: ['javascript']
date: 2021-02-26
author: '海豹人 Sealman'
image: 'javascript.png'
slug: 2021-02-26-execution-context
---

![讓我們一起看下去](https://i.imgur.com/WybJvLc.png)

## 執行環境 (Execution Context)

程式碼會有很多個詞彙環境，而執行環境會管理哪一個詞彙環境是正在執行的。

- 依照範圍是否為全域來區分，分為「全域執行環境」與「該函式的執行環境」
  - 全域執行環境
    - `window`, `global`
    - `this`
  - 函式執行環境
    - 限制作用域
    - `this`
- 執行環境有兩個階段，分別是「創造階段」與「執行階段」
  - 創造階段
  - 執行階段

宣告一個函式後，在還沒運行之前是不會產生執行環境的。而當我們運行它之後，函式就會產生屬於它自己的執行環境。

⭐️ 執行環境是在「呼叫」後才會產生，而產生之後它會有自己的變數。

### 全域執行環境 (Global Execution Context) 與全域物件 (Global Object)

全域的意思就是我們可以在任何地方取用它，只要程式碼或變數**不在函式裡面**時就是全域的。

在 JavaScript 中，**全域執行環境**會幫我們創造**全域物件**，與一個特殊的變數 `this`。

全域物件在瀏覽器為 `window`，在伺服器上執行 Node.js 時則為 `global`，在全域等級中使用 `this` 就會參照到全域物件 `window` 或 `global`。

## 函式呼叫與執行堆疊

### 函式呼叫 (Function Invocation)

Invocation 表示執行或呼叫函式，在 JavaScript 中是用括號 (parenthesis) 來執行函式。

> 在 Stack Overflow 可以看到別人會說 invoke the function 或是 function invocation 等等，這些英文用語的意思就是執行這個函式。

### 執行堆疊 (The Execution Stack)

JavaScript 每次呼叫執行函式的時候，都會創造一個新的執行環境，並且放入執行堆中，被堆疊在最上面。

所以說，我們只要看是誰在執行堆的最上面，它就是正在執行的東西。

⭐️ 但是這裡要注意，執行堆是以「呼叫的順序」來決定的，而不是看程式碼宣告的位置在第幾行。執行堆疊與宣告先後沒有關連性，而是與「呼叫的位置」有關。

![執行環境與執行堆疊](https://i.imgur.com/jyHEhNQ.png)

把這個範例看成 a 與 b 兩個函式來說，執行堆順序由上至下會是「b 函式的執行環境 → a 函式的執行環境 → 全域執行環境」。

因為這邊是先呼叫 a 函式，讓 a 堆疊在全域執行環境之上，接著在 a 函式裡面呼叫 b 函式，又讓 b 堆疊在 a 之上。

```javascript
function b() {}

function a() {
  b()
}

a()
```

我們再來看一個稍微複雜一點的例子，這次我們來看每一行程式碼的執行順序為何。

```javascript
// STEP 1

function a() {
  b() // STEP 3
  var c // STEP 5
}

function b() {
  var d // STEP 4
}

a() // STEP 2
var d // STEP 6
```

STEP 1：一開始經過創造階段後，已經創造出全域執行環境。

STEP 2：執行 a 函式，放入執行堆。（接著我們不是去執行下方的 `var d`，而是執行 a 函式裡面的內容，因為當下最新的執行環境已經變成 `a()` 的執行環境了）

STEP 3：逐行執行 a 函式的程式碼，首先第一行是執行 b 函式，因此執行堆最上方的執行環境會變成 `b()`。

STEP 4：開始執行 b 函式的程式碼，這邊只有一行 `var d`，執行完這行之後這個函式就已經執行完畢了。當函式 b 已經執行完成後，執行堆會將這個函式的執行環境 Pop 掉，也就是從最上方拿掉一個，所以現在最新的執行環境又會再回到 `a()`。

STEP 5：執行環境回到 `a()` 之後，繼續逐行執行 a 函式的程式碼，也就是 `var c` 這個動作。

STEP 6：當 a 函式完成後，同樣也會 Pop off，所以現在執行環境會回到全域執行環境，最後就接著執行 `var d`。

## 執行環境的創造階段與執行階段

執行環境分為兩個階段，第一階段是創造階段 (Creation Phase)，第二階段是執行階段 (Execution Phase)。

### 創造階段 (Creation Phase)

在創造階段，語法解析器 (Parser) 會分析程式碼，然後用編譯器去編譯程式，來創造出全域執行環境。而在全域執行環境裡面會有變數 (`this`) 與全域物件 (`window` / `global`)，並且會設定變數與函式的「記憶體位置」。

### 提升 (Hoisting)

在進入執行階段之前（也就是逐行執行程式碼之前），JavaScript 會幫我們把變數與函式都建立一個記憶體位置，如此一來，當程式碼被逐行執行時才能找到這些東西，而這個時候會使用到提升 (Hoisting) 的動作。

常見的 Hoisting 會用在變數與函式，而變數與函式的 Hoisting 有點不同，因為變數有等號這種設值符號。通常在一開始，變數 (`var`) 會被設定為 `undefined`，函式則會完全被設定好並放進記憶體中。

我們可以先把 `undefined` 理解為尚未設定 (not set) 的感覺，關於它的詳細介紹我們會在後續的筆記中提到。

### 執行階段 (Execution Phase)

這個階段會逐行執行我們寫好的程式碼，例如我們寫好了以下這段程式碼，可以看到這邊有一個變數和一個函式，所以我們先把它進行提升 (Hoisting)。

```javascript
b()
console.log(a)
var a = 'Hello World!'
function b() {
  console.log('Called b')
}
console.log(a)
```

提升的方法是，先把宣告的函式移到最上面，接著提升宣告的變數，這樣我們就能大概看出這段程式碼的執行結果了。

```javascript
function b() {
  console.log('Called b')
}
var a

b() // Called b

console.log(a) // undefined

a = 'Hello World!'
console.log(a) // Hello World!
```

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- 執行環境：創造與提升階段、程式執行階段
- 知道在呼叫函式後，執行堆的順序該怎麼跑

## References

- [JavaScript: Understanding the Weird Parts](https://www.udemy.com/course/understand-javascript/)
