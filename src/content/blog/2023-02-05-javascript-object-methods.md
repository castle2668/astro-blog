---
title: 'JavaScript Object Snippets'
excerpt: '開發上，我們常常對物件做各種操作與應用，本文記載 Sean 常用到的物件操作方式。'
tags: ['javascript']
date: 2023-02-05
author: 'Sean Huang'
image: 'javascript.png'
slug: 2023-02-05-javascript-object-methods
---

## hasOwnProperty

> [Object.prototype.hasOwnProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)

會回傳一個布林值，判斷指定的屬性是否為該物件本身的屬性，而非繼承的屬性。

```javascript
const object1 = {}
object1.property1 = 42

console.log(object1.hasOwnProperty('property1'))
// Expected output: true

console.log(object1.hasOwnProperty('property2'))
// Expected output: false
```

實務上，我們在使用 `for...in` 的時候會搭配 `hasOwnProperty()` 一起使用。

因為 `for...in` 會遞迴物件裡面的每一個屬性名稱 (Key)，而且會遞迴到繼承的屬性。因此可以使用 `hasOwnProperty()` 來排除繼承屬性，只使用本身的屬性執行給定的操作。

> [for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)

```javascript
for (const prop in obj) {
  if (obj.hasOwnProperty(prop)) {
    console.log(`obj.${prop} = ${obj[prop]}`)
  }
}
```

## hasOwn

> [Object.hasOwn()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn)

使用 `hasOwn()` 與 `hasOwnProperty()` 的效果都一樣，只是寫法不同，但是實務上更建議使用 `hasOwn()`，因為相容性比較好。

```javascript
const object1 = {
  prop1: 'exists',
}

console.log(Object.hasOwn(object1, 'prop1'))
// Expected output: true

console.log(Object.hasOwn(object1, 'prop2'))
// Expected output: false
```

## entries

將物件裡面的每個 Key-Value Pair 轉換為多個 Key-Value Pair 組成的陣列。

> [Object.entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)

可配合 `for...of` 取出陣列裡的每一組 `[key, value]`。

> [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)

```javascript
const obj = { a: 'something', b: 10 }
console.log(Object.entries(obj)) // [ ['a', 'something'], ['b', 10] ]

for (const [key, value] of Object.entries(obj)) {
  console.log(`${key}: ${value}`)
}
// Expected output:
// "a: somestring"
// "b: 10"
```

## keys

將物件裡面的 Key 提取為陣列。

> [Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)

```javascript
const object1 = {
  a: 'lorem',
  b: 123,
  c: false,
}

console.log(Object.keys(object1))
// Expected output: Array ["a", "b", "c"]
```

## values

將物件裡面的 Value 提取為陣列。

> [Object.values()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)

```javascript
const object1 = {
  a: 'lorem',
  b: 123,
  c: false,
}

console.log(Object.keys(object1))
// Expected output: Array ["lorem", 123, false]
```

## assign

合併目標物件 (Source) 與一或多個來源物件 (Target)，最後回傳該目標物件。

如果 Source 與 Target 有重複的屬性名稱，則 Source 會覆蓋掉 Target。

> [Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

```javascript
// Object.assign(target, ...sources);

const target = { a: 1, b: 2 }
const source = { b: 4, c: 5 }

const returnedTarget = Object.assign(target, source)

console.log(target)
// Expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget === target)
// Expected output: true
```

`Object.assign` 與展開運算子都是屬於 Shallow Copy，用的時候要知道會不會造成影響，否則容易踩雷。

真的需要複製物件，建議直接使用 JSON 操作或是 Lodash 提供的 `_.cloneDeep()` 方式。

## References

- [MDN Web Docs](https://developer.mozilla.org/zh-TW/)
