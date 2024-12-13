---
title: 'ES6 Class & Extends 與 ES7 現代寫法'
excerpt: '本文介紹 ES6 Class 實體與繼承的概念，以及進入 ES7 後出現的簡化寫法。'
tags: ['javascript']
date: 2021-09-02
author: '海豹人 Sealman'
image: 'javascript.png'
slug: 2021-09-02-ex6-class-extends-es7
---

## Class

> Class 就像是 Object 的藍圖

一個 Class 可以透過 `class` 關鍵字來創建，它可以有屬性 (Property) 與方法 (Method)，也就是這個 Class 的變數與函式。

其中 `constructor()` 是構造函式，也是 Class 的默認方法，可以在裡面設置屬性。

透過 `new` 關鍵字可以創建 Class 的實體，並且支援繼承，也就是可以有另一個 Class 繼承它的父類別的屬性與方法，同時也能添加新的屬性與方法。

```jsx
class Person {
  constructor() {
    this.name = 'Sean'
  }

  printName() {
    console.log('My name is ', this.name)
  }
}

const Sean = new Person()
Sean.printName() // "My name is Sean"
```

## Extends

透過 `extends` 關鍵字可以繼承父類別的屬性與方法。

特別注意！如果有繼承父類別，就要記得在子類別的 `constructor()` 加上 `super()`，以確保父類別的 `constructor()` 有被初始化，這樣才能確保父類的屬性可以在子類別中被使用。

```jsx
class Human {
  constructor() {
    this.gender = 'female'
  }
  printGender() {
    console.log(`My gender is ${this.gender}`)
  }
}

class Person extends Human {
  constructor() {
    super()
    this.name = 'Sean'
    this.gender = 'male'
  }
  printName() {
    console.log(`My name is ${this.name}`)
  }
}

const Sean = new Person()
Sean.printName() // "My name is Sean"
Sean.printGender() // "My gender is male"
```

## Class 在 ES7 更新的寫法

ES6 的 Class 是使用構造函式設定屬性，但是到了 ES7 我們可以跳過構造函式**直接在 Class 底下分配屬性**。實際上這仍然是在做構造函式做的事情，但是寫法上簡化了許多，讓定義 Class 屬性時更加方便。

ES7 的 Class 將方法寫成了一個**儲存值為函式的屬性**，寫法是方法名稱等於箭頭函式，也因為是使用箭頭函式，所以 `this` 不會更改它的參考，也就解決了 `this` 關鍵字的問題。

從繼承 `Human` 的 `Person` 類別中可以發現，在 ES7 的寫法下可以直接分配屬性，不用再寫 `constructor()` 與 `super()`，而方法也要改為使用箭頭函式哩。

```jsx
class Human {
  gender = 'female'

  printGender = () => {
    console.log(`My gender is ${this.gender}`)
  }
}

class Person extends Human {
  name = 'Sean'
  gender = 'male'

  printName = () => {
    console.log(`My name is ${this.name}`)
  }
}

const Sean = new Person()
Sean.printName() // "My name is Sean"
Sean.printGender() // "My gender is male"
```

> 以上資源是我自己整理過後的筆記，若有錯誤歡迎隨時和我聯繫
