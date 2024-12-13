---
title: 'Understand JavaScript #23 使用 Object.create 建立多層繼承'
excerpt: '本文主要內容為探討「Object.create」的相關知識以及搭配使用的 Polyfill。'
tags: ['javascript']
date: 2021-04-19
author: '海豹人 Sealman'
image: 'javascript.png'
slug: 2021-04-19-object-create
---

## 純粹的原型繼承 - Object.create

- JavaScript 裡面另外一種建立物件的方法，沒有模仿別的程式語言
- 現在的瀏覽器幾乎都有內建
- **建立一個物件當作基本物件，然後在這個物件上建立新物件**

使用範例：我們建立一個物件 `person` 作為基本物件，透過 `Object.create` 將它作為原型使用，在這個物件上面建立新的物件 `damao`。

```javascript
var person = {
  firstname: 'Default',
  lastname: 'Default',
  greet: function () {
    return 'Hi ' + this.firstname
  },
}

console.log(person.greet()) // Hi Default

var damao = Object.create(person) // 從傳入的物件上建立物件
console.log(damao) // 是一個空物件，它的原型是 person 物件
console.log(damao.greet()) // Hi Default
```

> 注意：如果沒有用 `this`，執行時會到全域執行環境中找 `firstname`，因為全域中只有 `person`，而 `person` 是物件所以不會建立執行環境，最後結果就會找不到 `firstname`。

⭐️ Object.create 建立出來的是一個空物件！

使用 `Object.create` 後，可以再建立新物件的屬性和方法去覆蓋原型給的預設值。執行時，原型鏈找到新物件就會停止，不會繼續往下找。

```javascript
damao.firstname = 'Damao'
damao.lastname = 'Huang'
console.log(damao.greet()) // Hi Damao
console.log(damao) // {firstname: "Damao", lastname: "Huang"}
```

### 範例：建立多層繼承

目標：Object > Animal > Mamegoma > Damao

```javascript
function Animal(species) {
  this.kingdom = '動物界'
  this.species = species || '海豹族'
}
Animal.prototype.drink = function () {
  console.log(this.name + '喝水')
}

function Mamegoma(name, color, size) {
  Animal.call(this, '海豹族') // 繼承 Animal 的建構函式
  this.name = name
  this.color = color || '白色'
  this.size = size || '中'
}
Mamegoma.prototype = Object.create(Animal.prototype) // Mamegoma 的原型是繼承 Animal 的原型
Mamegoma.prototype.constructor = Mamegoma // 讓建構函式更完整
Mamegoma.prototype.eat = function () {
  console.log(this.name + '吃灰塵')
}

var Piu = new Mamegoma('Piu', '粉紅色', '大')
console.log(Piu) // 註

Piu.eat() // Piu吃灰塵 (Mamegoma 原型的方法)
Piu.drink() // Piu喝水 (Animal 原型的方法)
```

⭐️ `Piu.__proto__` is a reference to `Mamegoma.prototype`

註：補上 `Mamegoma.prototype = Object.create(Animal.prototype)` 才能讓 Mamegoma 繼承到 Animal 原型上面的屬性 kingdom 與 species。

> 沒加會變成 `Mamegoma {name: 'Piu', color: '粉紅色', size: '大'}`；有加才會是 `Mamegoma {kingdom: '動物界', species: '海豹族', name: 'Piu', color: '粉紅色', size: '大'}`。

## dunderproto vs. prototype

- dunderproto 指向建構它的建構函式的原型物件
- Function 裡面的 prototype 屬性指向原型物件，同時原型物件也有 constructor 指回建構函式

傻傻分不清楚？以 Mamegoma 與 Piu 的關係為例：

**1. 建構函式 Mamegoma()**

- 建構函式 Mamegoma() 的原型屬性 `prototype` 會指向 Mamegoma.prototype 這個原型物件
- 在這個原型物件裡有共有的屬性和方法，所有建構函式聲明的實體 (Piu, Shirogoma) 都可以共享這些屬性和方法

> 建構函式的 `__proto__` 屬性則是指向 Function.prototype

**2. 原型物件 Mamegoma.prototype**

- 保存著實體共享的屬性和方法，有一個指針 `constructor` 指回建構函式

> 原型物件的 `__proto__` 屬性是指向它的建構函式的原型物件，即 Animal.prototype

> 而 Animal.prototype 的 `__proto__` 會再指向 Object.prototype，最後 Object.prototype 的 `__proto__` 會指向 null

**3. 實體 Piu**

- Piu 是 Mamegoma 這個物件的實體，Piu 這個物件有屬性 `__proto__`，指向建構函式的原型物件 (Mamegoma.prototype)，這樣子就可以像上面 1 所說的訪問到原型物件的所有方法了

![dunderproto vs. prototype](https://i.imgur.com/tN64B0o.jpg)

> 圖片來源：[js 中**proto**和 prototype 的区别和关系？ - doris 的回答 - 知乎](https://www.zhihu.com/question/34183746/answer/58155878)

## Polyfill

不過 `Object.create` 算是比較新的寫法，如果要支援比較舊的瀏覽器，可以加上 Polyfill 的程式碼。

- Polyfill：把引擎（像是舊瀏覽器的 JavaScript 引擎）缺少的功能增加到程式裡面的程式碼
- Polyfill 會先檢查當下使用的引擎有沒有某個功能，如果沒有就會幫忙加上去，讓舊的瀏覽器有新型瀏覽器的功能

Polyfill 做了什麼事情呢？

首先，一開始 Polyfill 的 `if (typeof Object.create !== "function")` 就是在檢查瀏覽器有沒有 `Object.create` 這個東西，如果存在就會直接跳過這整段 if 陳述句。

接下來 `temp.__proto__ = proto` 就是在設定物件 `temp` 的原型等於我們傳入的物件 `proto`。
這就相當於 `var temp = Object.create(proto)` 的意思，也就是用 `proto` 作為原型來建立新物件 `temp`，最後回傳 `temp` 完成物件建立。

```javascript
if (typeof Object.create !== 'function') {
  Object.create = function (proto, propertiesObject) {
    if (
      !(
        proto === null ||
        typeof proto === 'object' ||
        typeof proto === 'function'
      )
    ) {
      throw TypeError('Argument must be an object, or null')
    }
    var temp = new Object()
    temp.__proto__ = proto
    if (typeof propertiesObject === 'object')
      Object.defineProperties(temp, propertiesObject)
    return temp
  }
}
```

所以上面這一整段 Polyfill 的意思就是「給一個物件 `proto`，它會變成新的空物件 `temp` 的原型」，其實就跟 `var temp = Object.create(proto)` 的效果是一樣的。

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- 更純粹、強大、易懂的原型繼承 - Object.create
- 使用 Polyfill 補足舊瀏覽器缺少的功能

## References

- [JavaScript: Understanding the Weird Parts](https://www.udemy.com/course/understand-javascript/)
- [Object.create() - JavaScript | MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
