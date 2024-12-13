---
title: 'Understand JavaScript #19 Functional Programming ft. Underscore, Loadsh'
excerpt: '本文主要內容為探討「函式程式設計」的相關知識，透過一個經典的範例玩轉 Functional Programming，也會提到 Underscore 與 Loadsh 這兩個有名的資源庫。'
tags: ['javascript']
date: 2021-04-09
author: '海豹人 Sealman'
image: 'javascript.png'
slug: 2021-04-09-functional-programming
---

## 一個範例瞭解函式程式設計

平常單純使用 for 迴圈的程式碼，如果想要複用邏輯，而且希望少寫一點 Code、少做重複的事情的話，可以把事情放到函式裡面去做。

```javascript
let arr1 = [1, 2, 3]
console.log('arr1:', arr1)

// 純用 for 迴圈
let arr2 = []
for (let i = 0; i < arr1.length; i++) {
  arr2.push(arr1[i] * 2)
}
console.log('arr2:', arr2)

// 希望之後可以少做重複的事情，所以把事情放到函式內做
function mapForEach(arr, fn) {
  let newArr = []
  for (let i = 0; i < arr.length; i++) {
    // 用傳進去的函式 (fn) 處理傳進去的陣列 (arr)
    newArr.push(fn(arr[i]))
  }
  // 最後回傳處理後的新陣列
  return newArr
}
arr2 = mapForEach(arr1, function (item) {
  return item * 2
})
console.log('arr2:', arr2)

// arr1: (3) [1, 2, 3]
// arr2: (3) [2, 4, 6]
// arr2: (3) [2, 4, 6]
```

這樣寫就像是讓陣列告訴我們符合條件的東西，因此我們可以重複利用 `mapForEach` 完成不同的任務，只要將我要的條件傳入函式即可。

如果我今天不想做數學運算，我要比較數字大小的話，我一樣可以使用 `mapForEach` 來完成任務。

```javascript
// 讓陣列告訴我符合條件 (function) 的東西
let arr3 = mapForEach(arr1, function (item) {
  return item > 2
})
console.log('arr3:', arr3)

// arr3: (3) [false, false, true]
```

這個遍歷陣列的函式就是 Functional Programming 的一個經典例子，這能讓我們寫出更簡潔、直觀、易懂的程式碼。

然而限制的條件（像是大於多少的這個數字）不應該被寫死，條件應該要可以更改的，這樣才能重複使用，所以我們改良一下這個條件函式。

```javascript
// 限制條件的函式
let checkPastLimit = function (limiter, item) {
  return item > limiter
}
```

不過 `mapForEach` 的 `fn` 只接受一個參數，我們為了要複用，不應該變動 `mapForEach`，因為在出現這個需求之前，或許 `mapForEach` 已經使用在好幾個地方了。所以我們要想辦法讓 `checkPastLimit` 只需要傳一個變數 `item`，而另一個變數 `limiter` 我們要預先設定好。

一提到預設參數，可以聯想到上一篇中的 `.bind()`，它就是在複製函式的同時也預設參數。

```javascript
// 預設參數
let arr4 = mapForEach(arr1, checkPastLimit.bind(this, 1))
console.log('arr4:', arr4)

// arr4: (3) [false, true, true]
```

如果你想要在 `mapForEach` 第二個參數單純放上 `checkPastLimit(limiter)` 這樣子，不想在參數中出現 `.bind()`，也就是 `checkPastLimit` 只想要傳入限制值 `limiter` 作為唯一的參數的話，你也可以這樣寫。

我們用 `.bind()` 把 `presetLimiter` 設定為預設的 `limiter` 的值（其實命名都用 `limiter` 也可以，這邊是為了方便區分變數），不過這個寫法與剛才其實本質上是一樣的。

```javascript
// 我的 checkPastLimit 只想要有一個參數
let checkPastLimitSimplified = function (presetLimiter) {
  return function (limiter, item) {
    return item > limiter
  }.bind(this, presetLimiter)
}
let arr5 = mapForEach(arr1, checkPastLimitSimplified(2))
console.log('arr5:', arr5)

// arr5: (3) [false, false, true]
```

這邊其實有一個很重要的概念，就是當我們在傳入函式的時候，這些函式盡量不要變更 data，像是這邊的例子都是新陣列，沒有動到原本的陣列。

JavaScript 因為有一級函式與 Functional Programming 的概念，所以跟其他程式語言有所不同，如果我們用函式程式設計的思考方式去撰寫程式，或許才會感受到這個程式語言全部的威力。

## Open Source Education: Underscore & Lodash

接下來介紹兩個有名的 JavaScript 資源庫，分別是 [Underscore.js](https://underscorejs.org/) 與 [Lodash.js](https://lodash.com/)，它們都是用來幫助處理陣列與物件集合，其中 Lodash 處理得更細節一些，可以說是對 Underscore 做一些改良之後出現的晚輩。

Underscore 使用了很多 Functional Programming 的概念，像是它在很多函式中都有傳入 `iteratee` 這個東西，這能讓函式執行工作，而 Lodash 則是改進了 Underscore 的一些寫法，讓執行速度更快。

使用 Underscore 的方法就如同它的名稱，下底線就是 Underscore 在全域的物件的名稱，這是一個有效的名稱喔！

```javascript
let arr1 = [1, 2, 3]

// 數字乘以 3
let arr6 = _.map(arr1, function (item) {
  return item * 3
})
console.log(arr6) // [3, 6, 9]

// 可以被 2 整除的數字
let arr7 = _.filter([1, 2, 3, 4, 5, 6, 7], function (item) {
  return item % 2 === 0
})
console.log(arr7) // [2, 4, 6]
```

這些資源庫的原始碼都寫得很好，不但可以免費使用，同時藉由閱讀這些程式碼，我們可以從中學習到很好的 JavaScript 寫法，我們也稱此為**開源教育**。

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- 一個範例玩轉函式程式設計
- 介紹 JavaScript 有名的資源庫 Underscore 與 Lodash

## References

- [JavaScript: Understanding the Weird Parts](https://www.udemy.com/course/understand-javascript/)
