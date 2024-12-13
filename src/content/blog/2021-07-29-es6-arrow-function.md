---
title: 'JavaScript ES6 箭頭函式與傳統函式的差異'
excerpt: '本文內容主要探討 JavaScript ES6 中的「箭頭函式」的相關概念。'
tags: ['javascript']
date: 2021-07-29
author: '海豹人 Sealman'
image: 'javascript.png'
slug: 2021-07-29-es6-arrow-function
---

## 差別一：更短的函式寫法

把傳統函式的 `function` 拿掉，再加上箭頭 `=>` 就會變成箭頭函式。

```javascript
// 傳統函式
var callSomeone = function (someone) {
  return someone + '吃飯了'
}

// 箭頭函式
var callSomeone = someone => {
  return someone + '吃飯了'
}

console.log(callSomeone('小明')) // "小明吃飯了"
```

如果函式的 Code 只有一行 `return ...`，則可以再省略大括號 `{}` 和 `return`，改為只有一行的形式。

```javascript
var callSomeone = someone => someone + '吃飯了'
console.log(callSomeone('小明')) // "小明吃飯了"
```

另外，參數只有一個的時候 `(someone)` 的括號其實可以省略，但如果是**不帶入參數**的情況就不能省略，所以個人習慣一律都不省略。

## 差別二：沒有 arguments 參數，請善用其餘參數

傳統函式預設的 `arguments` 參數是一個類陣列 (Array-like) 物件，它的值就是我們傳進函式的所有參數。

但是 ES6 的箭頭函式沒有 `arguments` 參數，如果我們呼叫它只會出現 `arguments is not defined` 的錯誤訊息。

> 類陣列 (Array-like) 是指一樣有 `length` 這項屬性，以及索引從 0 開始等特性，但是沒有陣列內建的方法像是 `forEach()` 或是 `map()`。

```javascript
// 傳統函式可以使用 arguments 參數
const updateEasyCard = function (five) {
  console.log(five) // 5
  console.log(arguments) // Arguments(4) [5, 10, 15, 20, callee: ƒ, Symbol(Symbol.iterator): ƒ]
}
updateEasyCard(5, 10, 15, 20)
```

如果想要在箭頭函式中像是 `arguments` 參數那樣**大量使用參數**的話，可以使用之前**其餘參數**來幫忙做到，而且其餘參數會組出一個真正的陣列，我們可以在它身上使用各種陣列方法。

```javascript
// 箭頭函式使用其餘參數達到 arguments 參數的效果
const updateEasyCard = (five, ...arg) => {
  console.log(five) // 5
  console.log(arg) // (3) [10, 15, 20]
}
updateEasyCard(5, 10, 15, 20)
```

## 差別三：this 綁定的差異

- 傳統函式：綁定「使用」方法時的那個物件。
- 箭頭函式：綁定到「定義時」所在的執行環境下的那個物件。

首先，傳統函式的 `this` 會指向**呼叫方法時的物件**，範例中 `callName()` 與 `setTimeout` 都是用一般傳統函式的寫法。

另外，因為 `setTimeout` 完整的寫法是 `window.setTimeout`，所以其實這裡呼叫 `setTimeout` 的是全域物件 `window`。

```javascript
// 傳統函式
var name = '全域阿婆'
var auntie = {
  name: '漂亮阿姨',
  callName: function () {
    // this => auntie
    console.log(`1, ${this.name}, ${this}`) // 1, 漂亮阿姨, [object Object]
    setTimeout(function () {
      // this => window
      console.log(`2, ${this.name}`) // 2, 全域阿婆
      console.log(`3, ${this}`) // 3, [object Window]
    }, 10)
  },
}

auntie.callName()
```

現在我們試著把函式 `callName` 改成箭頭函式，執行後會發現裡面的 `this` 都是指向全域的 `window`。因為箭頭函式沒有自己的 `this` 變數，裡面所使用的 `this` 的值是由上下文決定的，而不是看呼叫方法的物件。

由於在執行 `auntie.callName()` 之前，所有的 `this` 都已經被定義過了。

當 Parser 在讀程式碼、定義這些 `this` 的時候，所在的執行環境是全域執行環境，因此 `this` 就會指向**定義時所在的執行環境的物件**，也就是 `window` 物件。

```javascript
var name = '全域阿婆'
var auntie = {
  name: '漂亮阿姨',
  callName: () => {
    console.log(`1, ${this.name}, ${this}`) // 1, 全域阿婆, [object Window]
    // 這邊 setTimeout 就算改用傳統函式也一樣，因為外層是箭頭函式了
    setTimeout(() => {
      console.log(`2, ${this.name}`) // 2, 全域阿婆
      console.log(`3, ${this}`) // 3, [object Window]
    }, 10)
  },
}

auntie.callName()
```

### 常見的兼容寫法 (self)

如果我們想要用 ES6 箭頭函式又擔心 `this` 指向的問題，可以在一開始就指定一個變數 `self`（或是其他你喜歡的變數名稱），不過外層函式依然只能是傳統函式喔。

```javascript
var auntie = {
  name: '漂亮阿姨',
  // 在傳統函式裡面盡情地使用箭頭函式
  callName() {
    // 定義 self 變數
    var self = this
    // 使用箭頭函式
    setTimeout(() => {
      console.log(this)
      console.log(self, self.name)
    }, 10)
  },
}
auntie.callName()
```

> 補充一下，因為定義 `setTimeout` 時執行環境就是在 `callName()` 函式執行環境下，所以其實 `setTimeout` 裡面的 `this` 本來就是指向 `auntie` 物件。  
> 不過定義 `self` 還是可以幫助到多層的情況。

### Vue 的 Methods 建議使用傳統函式

我們在寫 Vue 的 `methods` 時很常使用 `this` 去取用元件的 `data`，像是 `this.name` 這類的寫法。

如果使用箭頭函式，在程式碼邏輯變得很複雜後，就很容易會出錯。所以在 Vue 的 `methods` 裡面會建議使用**傳統函式與縮寫**的方式來呈現。

```javascript
// 傳統函式配合縮寫，原本是 callName: function() {...}
callName () {
    console.log('1', this.name, this);
    setTimeout(function () {
      console.log('2', this.name);
      console.log('3', this);
    }, 10);
  },
```

這個寫法不是箭頭函式喔，它只是縮寫的傳統函式而已 👀

> 以上資源是我自己整理過後的筆記，若有錯誤歡迎隨時和我聯繫
