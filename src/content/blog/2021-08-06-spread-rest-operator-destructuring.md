---
title: '瞭解 Spread & Rest Operator 與 Destructuring 的用法'
excerpt: 'Spread 與 Rest 運算子都是寫成三個點，而它的身份就取決於我們在哪裡使用它，一起來看看吧。'
tags: ['javascript']
date: 2021-08-06
author: '海豹人 Sealman'
image: 'javascript.png'
slug: 2021-08-06-spread-rest-operator-destructuring
---

## 展開運算子 (Spread Operator)

> 🔑 Pull out、傳播、解壓縮物件屬性或陣列元素

用來拆分陣列的元素或是物件的屬性，添加新元素或屬性則是可選的。

例如：使用 Spread Operator 可以很容易地把資料拉出來。

- 將舊陣列的所有元素添加到新陣列，再另外添加新的元素 1 跟 2
- 將舊物件所有的 Name-value pair 拉出來放入新物件，再另外添加新的屬性

```jsx
const oldArray = [1, 2, 3]
const newArray = [...oldArray, 4, 5]
console.log(newArray)
// [1, 2, 3, 4, 5]

const oldObject = { oldProp: 1 }
const newObject = { ...oldObject, newProp: 5 }
console.log(newObject)
// { oldProp: 1, newProp: 5 }
```

Spread Operator 可以用來複製物件或陣列，屬於「淺拷貝」。

關於**淺拷貝**與**深拷貝**的差異：

- 母湯安捏用：`obj2 = obj1`。
- 淺拷貝 (Shallow Copy)：以「應該拷貝屬性而非整個物件」的原則來執行，最常用的方法就是本文的 **Spread Operator**，但是淺拷貝只有第一層是 Real copy，到了第二層之後就會失效。
  - 有些人會把 `Object.assign` 歸類到深拷貝，但是在[關於 JS 中的淺拷貝(shallow copy)以及深拷貝(deep copy)](https://medium.com/andy-blog/%E9%97%9C%E6%96%BCjs%E4%B8%AD%E7%9A%84%E6%B7%BA%E6%8B%B7%E8%B2%9D-shallow-copy-%E4%BB%A5%E5%8F%8A%E6%B7%B1%E6%8B%B7%E8%B2%9D-deep-copy-5f5bbe96c122)這篇文章中有提到它的隱藏地雷，因此最後決定將它歸類在淺拷貝。
- 深拷貝 (Deep Copy)：請服用 `JSON.stringify(obj)` 以及 `JSON.parse(JSONString)`。
  - Lodash 內的 `_.cloneDeep` 也是一個簡單而且乾淨的做法。

## 其餘運算子 (Rest Operator)

> 🔑 合併、壓縮、函式參數

函式可以接收多個參數，`...args` 會將所有的參數合併到一個陣列中。

```jsx
function sortArgs(...args) {
  console.log(args) // 參數列表
  return args.sort()
}

sortArgs('Sean', 23, true)
// ["Sean", 23, true]
```

在 ES6 的箭頭函式也可以使用 `...args` 得到參數清單的陣列。

```jsx
const filter = (...args) => {
  return args.filter(el => el === 1)
}

console.log(filter(1, 2, 3))
// [1]
```

## 解構 (Destructuring)

### Destructuring 與 Spread 的差異

- Destructuring：將陣列元素或物件屬性提取出來，並存到一個變數上
- Spread：解壓縮取出「所有」陣列元素或物件屬性，再把它們放入新陣列或新物件

聽起來做的事情好像差不多，但是 Destructuring 其實多了一個特點，就是它可以只提取「單一個」元素或屬性。

### Array Destructuring

常見用法：建立新陣列，其中 `a` 跟 `b` 的位置會對應到陣列元素的位置順序。

如果要跳過某個元素，像是要跳過 `num2` 直接取得後面的 `num3`，只要放一個空格然後逗號就可以忽略掉 `num2` 了。

```jsx
const [a, b] = ['Hello', 'Sean', 123]
console.log(a) // "Hello"
console.log(b) // "Sean"

const numbers = [1, 2, 3]
const [num1, , num3] = numbers
console.log(num1, num3) // 1 3
```

### Object Destructuring

在等號左側使用大括號並寫上對應的屬性名稱，就可以從右邊提取出該屬性的值。

```jsx
const { name } = { name: 'Sean', age: 23 }
console.log(name) // "Sean"
console.log(age) // age is not defined
```

> 以上資源是我自己整理過後的筆記，若有錯誤歡迎隨時和我聯繫
