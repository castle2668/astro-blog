---
title: 'Understand JavaScript #9 物件實體語法 (Object Literal Syntax)'
excerpt: '本文主要內容為探討「物件」的相關知識，包含成員取用運算子、物件實體語法、偽裝命名空間，與 JSON 資料格式。'
tags: ['javascript']
date: 2021-03-19
author: '海豹人 Sealman'
image: 'javascript.png'
slug: 2021-03-19-object-literal
---

## 物件與「點」

- 成員取用運算子（點運算子）
- 計算成員取用運算子（中括號）

> 這邊的「成員」就是物件的成員，指物件內的屬性和方法。

物件在記憶體中有一個位址，它可以參考到其他與它相關的東西（屬性和方法）的記憶體位置。

![位址](https://i.imgur.com/GtwGe3V.png)

取得位址的方式有兩種，使用「點」或「中括號」存取都可以，我自己是比較喜歡使用點存取，因為看起來比較簡潔、清楚、好寫，也比較容易除錯。

通常只有在無法使用點存取的時候，才會使用中括號。例如：要存取的屬性是**動態字串**，也就是一些可能會改變的字串。

```javascript
const person = new Object()
person['firstname'] = 'Grisia'

const lastnameProperty = 'lastname'
person[lastnameProperty] = 'Sun'

console.log(person) // {firstname: "Grisia", lastname: "Sun"}
```

> 題外話，其實 `person.firstname` 原本應該要寫成 `person.'firstname'`，但是因為我們有語法解析器，所以 JavaScript 自己會知道我們寫的 `firstname` 要當字串處理。

當然屬性不只有字串，除了純值 (Primitive) 之外，也可以是一個物件。下方範例中，我們使用點運算子創造子物件（物件中的物件），然後增加屬性給子物件，並且賦予值。

> 使用中括號也可以，點與中括號雖然是不同的函式，不過做的事情是一樣的。

```javascript
person.address = new Object()
person.address.city = 'Tainan'

console.log(person.address.city) // Tainan
console.log(person['address']['city']) // Tainan
```

上面因為運算子相同（優先性相同），所以要考慮相依性才能知道誰先運算。成員取用運算子是左相依性，所以會先在 `person` 中取得 `address` 屬性，之後再從 `person.address` 裡面找到 `city` 這個屬性。

## 物件與「物件實體」

### 物件實體語法 (Object Literal Syntax)

物件實體語法其實就是 `new Object()` 的 **Shorthand**。

它的功能非常強大，讓我們更快、更容易創造物件，不用一個一個增加屬性，程式碼寫法變得很簡潔易懂。

物件實體語法是用大括號去**定義物件**，並使用冒號來區隔名稱與值。

```javascript
const GrisiaSun = {
  firstname: 'Grisia',
  lastname: 'Sun',
  address: {
    street: '111 Main St.',
    city: 'New York',
    state: 'TW',
  },
}

function greet(person) {
  console.log(`Hi ${person.firstname}`)
}

greet(GrisiaSun) // Hi Grisia
```

透過物件實體語法，我們可以在任何地方創立物件，像是在物件被呼叫時，同時建立物件與它的屬性。

```javascript
greet({
  firstname: 'Mary',
  lastname: 'Doe',
}) // Hi Mary
```

### 與運算子在使用上的差異

使用「點運算子」直接創立以下物件與屬性，會出現錯誤訊息 "Uncaught TypeError: Cannot set property 'greet' of undefined"。

```javascript
const english = {}
english.greeting.greet = 'Hello!'
```

為什麼會出現錯誤？我們一步一步檢查。

1. 由於點運算子是左相依性，所以從最左邊開始執行
2. 首先在 `english` 中尋找 `greeting` 變數，因為是空物件，所以 `english.greeting` 回傳 `undefined`
3. 接著傳入 `undefined` 給第二個點運算子，而 JavaScript 認定 `undefined` 根本不是一個物件，所以告訴我們無法在 `undefined` 裡面找到 `greet` 這個屬性

所以我們必須多一個步驟，先在記憶體中創造一個物件，這樣就能再用點運算子連結 `greet` 屬性。

```javascript
const english = {}
english.greeting = {} // 要先創造一個物件
english.greeting.greet = 'Hello!'
```

以上使用點運算子的寫法有點冗長，如果我們改用物件實體語法去初始化，就可以很快地建立完成。

```javascript
const english = {
  greeting: {
    greet: 'Hello!',
  },
}

console.log(english.greeting.greet) // Hello!
```

其實對於 JavaScript 底層來說，使用「物件實體語法」或是「點運算子」建立物件都是一樣的，它們都是在建立物件與它的屬性和方法到記憶體中，因此對 JavaScript 而言是一樣的處理，但我們通常會選擇使用更強大、好寫的物件實體語法。

## 用物件「偽裝命名空間」

所謂的命名空間，大概就像是「容器」的概念，在不同命名空間可以有相同名稱的變數。

然而在 JavaScript 中並沒有命名空間，如果出現兩個相同名稱的變數，則新的會取代舊的，但是我們可以使用物件來偽造出命名空間。

以下範例就是藉由物件 `english` 和 `spanish` 作為容器，讓兩個可能是不同 JavaScript 檔案裡面的 `greet` 不會互相衝突、覆蓋。

```javascript
const english = {}
const spanish = {}

english.greet = 'Hello!'
spanish.greet = 'Hola!'

console.log(english) // {greet: "Hello!"}
```

透過物件實體語法，我們可以維持某一些程式碼與其他程式碼分離，這個做法在許多框架中都很常見，以下簡略模擬框架的程式碼寫法。

```javascript
const jQuery = {
  greeting: {
    greet: 'Hello!',
  },
}

const vue = {
  greeting: {
    greet: 'Hola!',
  },
}
```

## JavaScript Object Notation (JSON)

### 什麼是 JSON

JSON 是一個被「物件實體語法」啟發的格式，在 JSON 出現之前，網路資料的傳輸格式像是 XML 等都有一些額外、不必要的符號，像是一個屬性有前後兩個標籤，此時如果需要處理很多資料，這就會浪費很多下載頻寬。

JSON 長得跟物件實體語法很像，基本上就只差在 JSON 的屬性「一定」要被包在雙引號裡。

JSON 是有效的物件實體語法，因為物件實體語法的屬性是可以被包在引號裡的，因此 JSON 算是物件實體語法的其中一種，但並不是全部有效的物件實體語法都是 JSON 格式。

### 轉換與使用 JSON

- JSON.stringify(object)
- JSON.parse(string)

雖然 JSON 並不是 JavaScript 的一部份，但是 JavaScript 可以很簡單地解析它，只要透過 JavaScript 內建的功能就可以處理 JSON 資料。

`JSON.stringify` 會把物件轉換為 **JSON String**（JSON 語法的字串）。

```javascript
const objectLiteral = {
  firstname: 'Damao',
  isProgrammer: true,
}

console.log(JSON.stringify(objectLiteral))
// {"firstname":"Damao","isProgrammer":true}

console.log(typeof JSON.stringify(objectLiteral)) // string
```

`JSON.parse` 會接受一個符合 JSON 格式的字串，把它轉換為 JavaScript 物件。

```javascript
const jsonValue = '{"firstname":"Damao","isProgrammer":true}'

console.log(JSON.parse(jsonValue))
// {firstname: "Damao", isProgrammer: true}

console.log(typeof JSON.parse(jsonString)) // object
```

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- 使用「點運算子」或「中括號運算子」存取物件
- JavaScript 的物件實體語法
- 用物件偽裝命名空間，避免命名衝突
- 物件實體語法與 JSON 字串的差別

## References

- [JavaScript: Understanding the Weird Parts](https://www.udemy.com/course/understand-javascript/)
