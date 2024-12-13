---
title: 'Understand JavaScript #1 How JS Reads Code'
excerpt: '第一篇文要先來說說 JavaScript 是如何運行的，它是透過什麼去解析程式碼，而在這個過程中有哪些觀念呢。'
tags: ['javascript']
date: 2021-02-23
author: '海豹人 Sealman'
image: 'javascript.png'
slug: 2021-02-23-how-js-reads-code
---

## 語法解析器 (Syntax Parser)

Parser 是其他人寫的一種程式，可分為「直譯器」和「編譯器」，它會逐字地閱讀我們寫的程式碼，並把我們寫的程式碼轉換成電腦看得懂的指令。

直譯器與編譯器都是將程式碼由上至下，逐行地轉為電腦可懂的命令，兩者的差別在於轉換的時機點。

- 直譯器 (Interpreter)：在程式執行「時」做轉換，直接產出運行結果
- 編譯器 (Compiler)：在程式執行「前」做轉換，接著產出編譯後的指令，最後執行這個編譯後的結果指令

## 直譯式語言 (Interpreted language)

- 執行前沒經過編譯，原始碼透過直譯器生成代碼運行，錯誤會跑到 Console 上
- 優點：彈性高、不需預先定義型別

JavaScript 屬於直譯式語言，無法直接被瀏覽器閱讀，需經過解譯。

## 編譯式語言 (Compiled language)

- 原始碼預先編譯，編譯完生成代碼，才在執行環境運行
- 優點：預先編譯可預先除錯

著名的編譯語言有 C、Java 等等。

## JavaScript 直譯器轉換過程

1. 語法基本單元化：將標點符號、所有字詞一一解析出來轉成 Tokens
2. 定義抽象結構樹：把分析的這些 Token (單元) 轉換，定義結構樹（原始碼結構），此時還沒運行程式碼
3. 代碼生成：依執行環境是瀏覽器或 Node.js 而有所不同

所以結論是 JavaScript 是屬於直譯式語言。

在瀏覽器的實現下，JavaScript「看起來」像是直譯語言，但是它其實有編譯的步驟存在。JavaScript 引擎會在每次執行前「即時編譯」程式碼，接著立刻執行編譯後的指令。

因此，如果以使用的案例來說，在瀏覽器上的 JavaScript 是直譯語言，但我們要知道它的背後是有即時編譯的。

## LHS vs. RHS

### LHS (Left-hand side)

LHS：賦予值到左側的變數上

```javascript
var author = 'Sean' // LHS
```

LHS 是把右側的值「賦予到左側的變數上」，因此當左側無法被賦予值的時候，就會出現錯誤。

```javascript
'Sean' = 1;
// Error: Line 1: Invalid left-hand side in assignment
```

### RHS (Right-hand side)

RHS：取值來自於右側的變數上

```javascript
var author = 'Sean' // LHS
console.log(author) // RHS
var man = author
console.log(autho)
```

第三行：右側使用 RHS 取得 `author` 這個變數，並且透過 LHS 把值賦予到左側的變數上。

第四行：在編譯過程中 RHS 不會出現錯誤，要在執行階段時，才會在 Console 出現變數無法取得的錯誤。

此外，遇到錯誤時，後方的程式碼就都不會運行囉，因此要修正錯誤。

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- JavaScript 語法解析的過程
- 直譯式語言與編譯式語言的差異
- JavaScript 是屬於直譯式語言
- LHS 與 RHS

## References

- [JavaScript: Understanding the Weird Parts](https://www.udemy.com/course/understand-javascript/)
