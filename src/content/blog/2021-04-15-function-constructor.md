---
title: 'Understand JavaScript #21 使用建構式自定義原型'
excerpt: '本文主要內容為探討關鍵字 new 與函式建構子的相關知識，內容包含關鍵字 new、函式建構子，以及函式的原型屬性。'
tags: ['javascript']
date: 2021-04-15
author: '海豹人 Sealman'
image: 'javascript.png'
slug: 2021-04-15-function-constructor
---

## 使用 new 與函式建構子建立物件

在 JavaScript 中能正確地建立物件、設定屬性與方法，並設定原型的其中一個方式，就是使用關鍵字 `new` 與函式建構子 (Function Constructor)。

其實關鍵字 `new` 是一個**運算子**，我們先用 `new` 建立一個新的空物件後，再呼叫函式 `Person()` 來建立物件，而這個函式又稱為**函式建構子**。

```javascript
function Person() {
  console.log(this)
  this.firstname = 'Damao'
  this.lastname = 'Huang'
  console.log('This function is invoked')

  return { greeting: 'I got in the way' }
}

// 使用 new 運算子，不是在呼叫一個函式
var damao = new Person()
console.log(damao)
```

1. 用 `new` 建立一個空物件，效果就像是用 `var damao = {}` 建立的一個空物件
2. 呼叫函式 `Person()` 時，執行環境會產生變數 `this`，但是它的指向會被 `new` 改變而指向一個空物件的記憶體空間，結果就會像是一個全新的物件呼叫了 Person 函式
3. 將 `this.firstname` 和 `this.lastname` 新增到空物件上
4. 最後當我們使用 `new` 運算子呼叫函式後 ⋯⋯

   - 如果函式內容沒有 return 東西，那麼 JavaScript 引擎會自動回傳空物件
   - 但是如果有透過 `this` 設定東西，則會回傳我們用 `new` 運算子建立的物件，在物件裡面有 `firstname` 與 `lastname` 等已經設定好的屬性
   - 如果函式最後是直接 return 一個物件，那麼 `damao` 就會直接等於 return 的東西

5. 另外，這裡的 `new Person()` 其實是有呼叫函式的，我們加上 `console.log` 去測試，可以發現函式真的有被執行

接下來我們試著建立更多物件，並且改良一下程式，用 `this` 關鍵字與函式的參數去設定 First Name 和 Last Name。

```javascript
function Person(firstname, lastname) {
  console.log(this)
  this.firstname = firstname
  this.lastname = lastname
  console.log('This function is invoked')
}

var sean = new Person('Sean', 'Huang')
console.log(sean)

var john = new Person('John', 'Doe')
console.log(john)
```

從上面這些範例，我們知道 new 運算子是用來建立物件，而函式建構子其實就只是一個正常的函式，可以用來增加新物件的屬性和方法。

## 函式的原型屬性 (.prototype)

在所有函式中，除了 NAME 與 CODE 屬性之外還有一個 `prototype` 屬性，不過只有將函式作為函式建構子來建立 (new) 物件時，才會用到這個原型屬性。

![prototype](https://i.imgur.com/oz06Iq3.png)

使用上，`Person.prototype` 是指函式 Person 的原型，而 `Person.prototype.getFullName` 就是在 Person 的原型上建立方法。

也就是說，使用 Person 函式作為函式建構子所建立的物件（像是範例中的 john 物件），在它的上面會有一層原型（可以用 `john.__proto__` 查看），因此 john 物件可以透過原型鏈取用原型上的 `getFullName` 方法。

```javascript
// function Person(firstname, lastname) {...}

Person.prototype.getFullName = function () {
  return this.firstname + ' ' + this.lastname
}

var john = new Person('John', 'Doe')
console.log(john)
console.log(john.getFullName())
```

有了原型屬性後，如果已經使用函式建構子創造一堆物件，臨時想要新增方法給所有物件的話，就不用打掉重練了，因為我們可以用 `.prototype` 來新增屬性和方法給所有物件。

### 節省記憶體空間

通常屬性會一開始就設定在函式建構子中，因為每個物件的值可能不同，而方法則是之後才補票加上去的。

為什麼方法通常會用原型屬性補上去呢？

雖然在這兩個時間點新增方法，我都可以取用到，但是因為函式就是物件，物件會佔用記憶體空間，所以如果直接把方法加在函式建構子，就會變成每個建立出來的物件都需要一個放 `getFullName` 方法的空間。

但是如果只加在原型上，就只會有一個 `getFullName` 方法放在 Person 的原型，每個物件需要用的話就透過原型鏈去取用它。所以從效能上來看，盡量將屬性與方法放在原型 (`.prototype`) 上會比較好。

## 函式建構子的缺點 - 忘記加上 new 關鍵字

如果沒有放上 new 關鍵字，此時就會變成正常執行函式，這時候如果沒有回傳任何東西，就會回傳 `undefined`。

當要取用物件的屬性或方法時也會出現錯誤 (Uncaught TypeError: Cannot read property 'getFullName' of undefined)，因為此時 `john` 是 `undefined` 而不是一個物件。

```javascript
var john = Person('John', 'Doe') // 忘記加上 new
console.log(john) // undefined
console.log(john.getFullName()) // Error
```

容易忘記加上 `new` 算是使用函式建構子的缺點之一，這也是為什麼我們在寫法上第一個字母要使用大寫，因為這樣可以幫助區分一般函式與函式建構子，也比較好看出有沒有忘記加上 new 關鍵字，甚至現在有所謂的 Linter 直接把這一點作為書寫 JavaScript 時的規範。

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- 如何使用「關鍵字 new」與「函式建構子」建立物件
- 使用「原型屬性」加上屬性或方法是效能較佳的方式
- 瞭解使用函式建構子的缺點

## References

- [JavaScript: Understanding the Weird Parts](https://www.udemy.com/course/understand-javascript/)
