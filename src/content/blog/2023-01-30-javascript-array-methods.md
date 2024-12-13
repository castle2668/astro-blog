---
title: 'The JavaScript Array Methods Handbook'
excerpt: '健忘的 Sean 常常需要查看的陣列處理方法小抄。'
tags: ['javascript']
date: 2023-01-30
author: 'Sean Huang'
image: 'javascript.png'
slug: 2023-01-30-javascript-array-methods
---

## What will this method return

- 單純遞迴執行：`forEach`
- 回傳一個新的陣列：`map`、`filter`、`concat`
- 回傳一個布林值：`some`、`every`、`includes`
- 回傳該元素：`find`
- 回傳該索引：`findIndex`、`indexOf`
- 回傳一個整數值：`reduce`、`unshift`

## forEach

> [Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

將陣列裡的每個元素傳入，並「執行」給定的函式一次。

```javascript
const array1 = ['a', 'b', 'c']

array1.forEach(element => console.log(element))

// Expected output: "a"
// Expected output: "b"
// Expected output: "c"
```

## map

> [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

原陣列的每一個元素經過指定的函式「運算」後，回傳新的結果陣列。

```javascript
const array1 = [1, 2, 3, 4]

// Pass a function to map
const result = array1.map(x => x * 2)

console.log(result)
// Expected output: Array [2, 4, 6, 8]
```

## filter

> [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

原陣列經過指定的函式「過濾」後，回傳新的結果陣列。

```javascript
const words = ['Sean', 'Damao', 'Paul', 'Iris', 'Julia']

const result = words.filter(word => word.length > 4)

console.log(result)
// Expected output: Array ["Damao", "Julia"]
```

## concat

合併兩個或多個陣列，回傳一個新的陣列。

> [Array.prototype.concat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)

```javascript
const array1 = ['a', 'b', 'c']
const array2 = ['d', 'e', 'f', 'g']
const array3 = array1.concat(array2)

console.log(array3)
// Expected output: Array ["a", "b", "c", "d", "e", "f", "g"]
```

## some

> [Array.prototype.some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

測試陣列中，是否有「至少一個」元素符合指定的條件函式，是的話會回傳 `true` 否則回傳 `false`。

```javascript
const array1 = [1, 2, 3, 5, 7]

// Checks whether an element is even
const isEven = element => element % 2 === 0

console.log(array1.some(isEven))
// Expected output: true
```

## every

> [Array.prototype.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

回傳是否陣列中的「所有」元素都符合條件。

```javascript
const array1 = [2, 4, 6, 8, 10]

// Checks whether all elements are even
const areEven = element => element % 2 === 0

console.log(array1.every(areEven))
// Expected output: true
```

## includes

> [Array.prototype.includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

回傳陣列是否「包含」指定的元素。

```javascript
const pets = ['cat', 'dog']

console.log(pets.includes('cat'))
// Expected output: true

console.log(pets.includes('pig'))
// Expected output: false
```

## find

> [Array.prototype.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

回傳「第一個」滿足條件的元素，如果通通不符合則回傳 `undefined`。

```javascript
const array1 = [5, 6, 8, 100, 44]

const found = array1.find(element => element > 10)

console.log(found)
// Expected output: 100
```

## findIndex

> [Array.prototype.findIndex()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)

回傳「第一個」滿足條件的元素之「索引」，如果找不到則回傳 `-1`。

```javascript
const array1 = [5, 6, 8, 100, 44]

const isLargeNumber = element => element > 8

console.log(array1.findIndex(isLargeNumber))
// Expected output: 3
```

## indexOf

> [Array.prototype.indexOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)

回傳「指定的元素」在陣列中「第一個」被找到的「索引」，如果找不到則回傳 `-1`。

```javascript
const beasts = ['squirrel', 'seal', 'cat', 'duck', 'rabbit']

console.log(beasts.indexOf('squirrel'))
// Expected output: 0

// Start from index 2
console.log(beasts.indexOf('seal', 2))
// Expected output: 4

console.log(beasts.indexOf('pig'))
// Expected output: -1
```

## reduce

> [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

將陣列中的每一項元素「由左至右」傳入「累加器」，最後回傳一個值。

```javascript
const array1 = [1, 2, 3, 4]

// 0 + 1 + 2 + 3 + 4
const initialValue = 0
const sumWithInitial = array1.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue
)

console.log(sumWithInitial)
// Expected output: 10
```

## unshift

> [Array.prototype.unshift()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)

`unshift()` 會增加一個或多個元素到陣列的開頭，並且回傳陣列的新長度。

```javascript
const array1 = [1, 2, 3]

console.log(array1.unshift(4, 5))
// Expected output: 5

console.log(array1)
// Expected output: Array [4, 5, 1, 2, 3]
```

## References

- [MDN Web Docs](https://developer.mozilla.org/zh-TW/)
