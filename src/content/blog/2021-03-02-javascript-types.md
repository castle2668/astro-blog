---
title: 'Understand JavaScript #7 型別 (Types)'
excerpt: 'JavaScript 很特別，它與其他程式語言不同，尤其是處理變數資料與型別的部分。本文主要內容為「型別」的相關知識，包含動態型別、純值、陣列，至於物件則會紀錄在其他筆記中。'
tags: ['javascript']
date: 2021-03-02
author: '海豹人 Sealman'
image: 'javascript.png'
slug: 2021-03-02-javascript-types
---

## 動態型別與靜態型別

### 動態型別 (Dynamic Typing)

JavaScript 處理型別的方式稱為「動態型別」，意思是我們不用告訴 JavaScript 某個資料的型別是什麼，JavaScript 會自己透過後續運行程式碼時，自動判斷出該變數的型別。

因為型別是在執行時才知道，所以一個變數在不同時間點，會擁有不同型別的值。

```javascript
var isNew = true // no errors
isNew = 'hello!'
isNew = 1
```

我們可以用 `typeof` 來檢測某個變數所儲存的值的型別。

```javascript
const isNew = 'Sean'
console.log(typeof isNew) // "string"
```

### 靜態型別 (Static Typing)

像是 Java 或 C# 等程式語言是使用「靜態型別」的方式處理變數，它們會在一開始就宣告變數的型別，如果將其他型別的值放進變數會得到錯誤。

```java
bool isNew = 'hello'; // an error
```

## 基本型別 (Primitive Types) aka 六種純值

純值是一種資料的型別，表示一個值。換句話說，純值不是物件，因為物件是 Name/Value Pairs 的組成，而純值只是一個值而已。

### undefined

undefined 表示「尚未設定」的意思，這是 JavaScript 給所有變數的初始值。

注意！我們不應該設定一個變數等於 undefined，因為這在意思上表示尚未設定任何值，但是你明明已經設定了，並沒有尚未設定喔。

### null

null 是表示「不存在」的意思，適合用來表示一個東西不存在了。

所以如果希望變數為空值，可以設定為 null，但不要設定為 undefined。

補充一下，雖然 null 是基本型別之一，但是 `typeof null` 的結果會得到 Object 而非 null。這算是一個 JavaScript 的 bug，但是因為如果修正這個 bug，可能會導致過去很多已經無人維修的網站死去，因此就不修了！

![傻眼鸚鵡兄弟](https://i.imgur.com/c8Nt4IY.png)

### Boolean

嗯，就是 True 或 False。

### 數值 (Number)

JavaScript 的 Number 只有浮點數 (floating-point number) 這一種數值表示法，代表 JavaScript 的 Number 永遠會有小數點，不像其他程式語言會有整數型態等等。

這也是導致 JavaScript 有各種神奇數學運算的原因。

### 字串 (String)

係由一連串的字符所組成。

### 符號 (Symbol)

Symbol 是在 ES6 引入的一種新的基本資料型態，用來表示唯一 (unique) 的值。

## 關於 undefined、not defined、null 的差異

- undefined：建立後「尚未賦值」時的預設值

  剛才有提到變數在一開始會被設定為 undefined。它是 JavaScript 中的一個特殊值，表示這個變數還沒被設定，是一個初始值。

  所以如果有宣告，但是還沒有設值，那結果就會出現 undefined，不過此時這個變數已經有佔據記憶體空間了。

  ```javascript
  var a
  console.log(a) // undefined
  ```

- not defined：找不到、未被定義

  如果是完全沒有宣告變數，就直接去呼叫變數的話，則會得到「無法參照」的錯誤，並告訴我們 JavaScript 在記憶體中找不到那個值 (Uncaught Reference)。

  ```javascript
  console.log(a) // not defined
  ```

- null：是一個值，表示「不存在」的意思，是基本型別的其中一種

  ```javascript
  var a = null
  ```

### 使用 undefined 的注意事項

剛才有提到，千萬不要自己將變數設值為 undefined！

```javascript
// NEVER DO THIS!
a = undefined
```

雖然這是可以做到的，程式也可以順利運行沒錯，但是我們不應該讓 undefined 這個特殊關鍵字是由我們來設定。

這對於往後除錯會有幫助，因為我們很難分辨這個 undefined 是我們自己設定的值，還是 JavaScript 幫我們設定的初始值。

## 陣列 - 任何東西的集合

可使用 `new Array()` 或者**陣列實體語法**宣告陣列，存取值以 0 為基準。

```javascript
// var arr = new Array();
var arr = [1, 2, 3]
console.log(arr[0]) // 1
```

在其他程式語言中，陣列裡面的值通常為相同的型別，像是數字陣列、字串陣列、物件陣列等等。

但是 JavaScript 因為是動態型別，所以 JavaScript 的陣列可以是任何東西的集合，能夠混合各種型別的東西。

```javascript
var arr = [
  1,
  false,
  'Hello World',
  {
    name: 'Sean',
    address: '111 Main St.',
  },
  // Function Expression
  function (name) {
    var greeting = 'Hello'
    console.log(greeting + name)
  },
]

console.log(arr) // (5) [1, false, "Hello World", {…}, ƒ]
```

如果想要參考到這個陣列中的函式，因為基準是從 0 開始，所以是用 `arr[4]`。如果想要調用、執行參數，則再加上小括號與參數。

```javascript
arr[4]('Sean') // Hello Sean
arr[4](arr[3].name) // Hello Sean
```

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- JavaScript 處理型別的方式是動態型別
- 動態型別與靜態型別的不同
- JavaScript 的基本型別（六種純值）為 undefined、null、boolean、number、string、symbol
- undefined、not defined、null 的差異
- 陣列的宣告與使用方式

## References

- [JavaScript: Understanding the Weird Parts](https://www.udemy.com/course/understand-javascript/)
