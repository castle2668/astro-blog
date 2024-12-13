---
title: 'NUK JavaScript #4：陣列、物件、for'
excerpt: '此篇文章介紹陣列、物件、for 迴圈。'
tags: ['nuk', 'javascript']
date: 2019-09-30
author: 'Huang, Yung-Hsiang'
image: 'javascript.png'
slug: 2019-09-30-nuk-js-array-object
---

## 陣列

```javascript
let pens = ['red', 'black', 'white']
console.log(pens.length)

pens.push('pink')
console.log(pens.length)

pens.push(3)
console.log(pens)
```

- 算出長度：pens.length
- 新增資料：pens.push
- 也可以放不同格式的資料，但通常不會這樣做

## 陣列實用語法

- 新增資料：pens.push('內容')
- 算出長度：pens.length
- 刪除：delete arr[i]
- 合併：array1.concat(array2)
- 排序：array.sort()
- 關鍵字搜尋：filter

### 1. delete：刪除第一筆資料

刪除物件的屬性或方法，但不會刪除物件原型的屬性或方法，意思就是會留下 undefined。  
在刪除元素之後，陣列長度不會改變，原本位置變為 undefined。

```javascript
var array = ['a', 'b', 'c', 'd']
delete array[2] // 刪除 'c'
console.log(array.length) // 4
console.log(array[2]) // 'undefined'
```

### 2. pop：刪除最後一筆資料

```javascript
var arr = ['a', 'b', 'c', 'd', 'e', 'f']
arr.pop()
```

arr 剩下：a, b, c, d, e  
數組長度：5

### 3. splice

splice(index，howmany，item1，…..，itemX)  
選擇元素後，向後刪除 N 個，或者新增元素

```javascript
// 刪除第三筆資料

var array = ['a', 'b', 'c', 'd']
array.splice(2, 1, 'e') // 刪除 'c'，新增 'e'
console.log(array) // ['a', 'b', 'e' , 'd']
```

### 4. concat：合併兩個陣列

Array.prototype.concat()  
合併兩個陣列，並把新的陣列返回。

```javascript
let array1 = ['1', '2', '3']
let array2 = ['a', 'b', 'c']
let array3 = array1.concat(array2)
console.log(array3)

// result : ["1", "2", "3", "a", "b", "c"]
```

### 5. filter：關鍵字搜尋陣列裡面的文字

使用 Array.prototype.filter() 回傳符合條件的元素，得到一個新陣列。

例如：回傳大於 10 的數字

```javascript
var numbers = [1, 3, 6, 10, 99, 101]

var filteredNum = numbers.filter(function (value) {
  return value > 10
})

filteredNum // [99, 101]
```

如果想找「Tom」會回傳空陣列，表示找不到。

```javascript
var names = ['Sean', 'Jack', 'Bob']

var filtered = names.filter(function (value) {
  return value === 'Tom'
})

filtered // []
```

### 6. sort：將陣列進行重新排序

範例：按照開頭字母順序排列

```javascript
let Brand = [
  'Oldsmobile',
  'Pontiac',
  'Buick',
  'Cadillac',
  'Holden',
  'Saturn',
  'GMC',
]

Brand.sort() // 陣列重新排序
console.log(Brand) // Buick, Cadillac, GMC, Holden, Oldsmobile, Pontiac, Saturn

Brand.reverse() // 順序反轉
console.log(Brand) // Saturn, Pontiac, Oldsmobile, Holden, GMC, Cadillac, Buick
```

範例：數字陣列.sort

```javascript
let InStock = [12, 3, 5, 53, 12, 53, 47]

InStock.sort()
console.log(InStock)
// 12, 12, 3, 47, 5, 53, 53
```

數字陣列預設下是以 ASCII 字符順序，有些時候我們需要使用 function 函數來進行。

```javascript
InStock.sort(function (a, b) {
  return a - b
})
console.log(InStock)
// 3, 5, 12, 12, 47, 53, 53

InStock.sort(function (a, b) {
  return b - a //順序反轉
})
console.log(InStock)
// 53, 53, 47, 12, 12, 5, 3
```

## for 迴圈 + 陣列寫法

有重複性質的內容想執行：for

```javascript
for (let i = 0; i < 3; i++) {
  console.log(i)
}
```

在 JS 的世界裡，物件是從 0 開始計算

```javascript
let pens = ['red', 'black', 'white']
console.log(pens[0])
```

組合技

```javascript
for (let i = 0; i < pens.length; i++) {
  console.log(pens[i])
}
```

### 範例：九九乘法表

```javascript
document.write('<ul class="multiplicationTable">')

for (let i = 1; i < 10; i++) {
  for (let j = 1; j < 10; j++) {
    console.log(i * j)
    document.write('<li>' + i + '*' + j + '=' + i * j + '</li>')
  }
}

document.write('</>')
```

![GITHUB](https://i.imgur.com/TtFOPu4.png)

## 物件

```javascript
let school = {
  student: 5927,
  teacher: 300,
  dog: ['Tom', 'John', 'Bob'],
  light: 3,
  校長: 'Bob',
}

console.log(school.student) // 5927
console.log(school.dog[1]) // John
console.log(school.校長) // Bob

school.classRoom = 200
console.log(school)

// 可以對既有的值做更改或累加
school.classRoom = 250
console.log(school.classRoom)
school.classRoom = school.classRoom + 50
console.log(school.classRoom)
```

## JSON

```html
<!-- HTML -->

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <h2>高雄輕軌月均運量統計</h2>
    <ul class="list"></ul>
    <h3>
      篩選：高雄輕軌 107 年總運量：
      <span class="total"></span>
    </h3>
  </body>
</html>
```

```javascript
// JavaScript

let data = [...]; // 高雄輕軌月均運量統計(https://data.kcg.gov.tw/dataset/lightrail-trafficvolume)

let el = document.querySelector('.list');
let dataLen = data.length;
let str = '';
let total = document.querySelector('.total');
let totalNum = 0;

for (let i = 0; i < dataLen; i++) {
    if (data[i].年 == 107) {
        totalNum += data[i].總運量;
    }
    let content = '<li>' + data[i].年 + ' 年 ' + data[i].月 + ' 月的總運量：' + data[i].總運量 + '</li>';
    str += content;
}
el.innerHTML = str;

total.innerHTML = totalNum;
```

![GITHUB](https://i.imgur.com/Jw8PsHJ.png)

> 以上資源是我自己整理過後的筆記，若有錯誤歡迎隨時和我聯繫
