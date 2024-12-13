---
title: 'Understand JavaScript #11 傳值和傳參考'
excerpt: '本文主要介紹「傳值和傳參考」的概念，這對於 JavaScript 的開發與除錯會很有幫助，如果不知道這些觀念，可能會導致一些很難 Debug 的奇怪問題。'
tags: ['javascript']
date: 2021-03-23
author: '海豹人 Sealman'
image: 'javascript.png'
slug: 2021-03-23-value-and-reference
---

## By Value vs. By Reference

- 傳值 (By Value)：所有純值
- 傳參考 (By Reference)：所有物件（包含函式）

### By Value

參考 (Reference) 是指記憶體的位置。

若 a 為**純值**，當設定 b 等於 a 時，b 與 a 各自會有一個記憶體位置，而在 b 的記憶體位置上存放的純值，就是從 a 那邊複製過去的值。

複製一個值到另一個不同的記憶體位址，這個方式叫做 By Value。

![By Value](https://i.imgur.com/J8m1wqS.png)

### By Reference

當設定 a 為**物件**時也會參考到一個記憶體位址，當設定 b 等於 a 時，這次變數 b「不會」得到一個新的記憶體位址，而是指向 a 的記憶體位址，並且不會創造或複製出新的物件。

例如：我同時有「大貓」跟「Damao」兩個名字，這兩個名字都指向我這個人（位址），這個方式叫做 By Reference。

![By Reference](https://i.imgur.com/4JkLp79.png)

## 實例說明

### By Value (Primitives)

純值的 a 與複製的純值 b 都有自己的記憶體位址，所以當我們改變 a，並不會對 b 有任何影響。

```javascript
var a = 3
var b

b = a
a = 2

console.log(a) // 2
console.log(b) // 3
```

### By Reference (All Objects, including Functions)

將物件設定給另一個變數時，只是把兩個變數名稱都指向同一個記憶體位址。

所以如果更改了 c 或 d 任何一個的值，都是在更改它們共同指向的那個物件。

```javascript
var c = { greeting: 'hi' }
var d

d = c
c.greeting = 'hello' // mutate

console.log(c) // {greeting: "hello"}
console.log(d) // {greeting: "hello"}
```

### By Reference (even as Parameters)

使用函式的「參數」來傳遞物件時，也會是以傳參考 (By Reference) 的方式傳入。

```javascript
var c = { greeting: 'hi' }
var d
d = c

function changeGreeting(obj) {
  obj.greeting = 'Hola' // mutate
}

changeGreeting(d)
console.log(c) // {greeting: "Hola"}
console.log(d) // {greeting: "Hola"}
```

## 什麼是 Mutate

Mutate 是一個電腦科學家決定的複雜詞彙，它就是改變某件事 (To Change Something) 的意思。

所以我們在 MDN 或是 Stack Overflow 上面看到別人說 "mutate an object" 或是 "mutate a value"，就是指「改變它」的意思，單純就是這個字面上的意思。

我們也會看到另一個常出現的詞彙 Immutable，它的意思是**不可改變的** (Can't be changed)，但這個觀念這裡先不講。

總之像是新增、刪除物件的屬性，或者修改屬性的值，就是在改變物件，也就是 mutated an object。

## 例外情況：等號運算子

使用等號運算子時，會發生一個 By Reference 的特殊案例。

當**等號運算子**發現右方的參數 `{greeting: 'howdy'}` 是一個**尚未存在記憶體中**的物件時，等號運算子會先建立一個新的記憶體位置給物件，接著放入值。

完成建立物件後，等號運算子再去指向 c，導致 c 的記憶體位址被改變，這時候 c 和 d 就不是指向同一個記憶體位址了。

```javascript
// equals operator sets up new memory space (new address)
var c = { greeting: 'hi' }
var d
d = c

console.log(c) // {greeting: "hi"}
console.log(d) // {greeting: "hi"}

c = { greeting: 'howdy' }
console.log(c) // {greeting: "howdy"}
console.log(d) // {greeting: "hi"}
```

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- 所有純值都是傳值，所有物件包含函式都是傳參考
- 簡單介紹 Mutate 的意思
- 使用等號運算子時，物件傳參考的例外情況

## References

- [JavaScript: Understanding the Weird Parts](https://www.udemy.com/course/understand-javascript/)
