---
title: 'Understand JavaScript #3 Name-Value Pair'
excerpt: '本文聊聊比較輕鬆的主題 Name-Value Pair 或稱 Key-Value Pair 鍵值對，以及它跟物件的關係。'
tags: ['javascript']
date: 2021-02-25
author: '海豹人 Sealman'
image: 'javascript.png'
slug: 2021-02-25-name-value-pair
---

## Name-Value Pair 與物件的關係

首先以下三種說法都是一樣的意思：

- Name-Value Pair
- Key-Value Pair
- Attribute-Value pair

Name-Value Pair（名稱與值的配對）是指「一個名稱會對應到一個值」，而這個值也可以是另一個 Name-Value Pair，並且以此類推。

例如：以下程式碼就是一個 Name-Value Pair。

```javascript
Address: '100 Main St.'
```

而我們常用的「物件」其實就是 Name-Value Pairs 的集合 (Collection)，結構如下所示。

![Collection of Name-Value Pairs](https://i.imgur.com/jZAGKi8.png)

例如：`Address` 是 Name，後面的 Collection 是它的 Value。

```javascript
Address: {
    Street: 'Main',
    Number: 100,
    Apartment: {
        Floor: 3,
        Number: 301
    }
}
```

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- 物件是由一個個 Name-Value Pair 所組成的

## References

- [JavaScript: Understanding the Weird Parts](https://www.udemy.com/course/understand-javascript/)
