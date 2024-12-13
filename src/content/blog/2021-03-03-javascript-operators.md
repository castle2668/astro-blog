---
title: 'Understand JavaScript #8 運算子 (Operators)'
excerpt: '本文主要內容為探討「運算子」的各種概念，能幫助我們順利除錯與瞭解可能會因為動態型別而產生的問題。'
tags: ['javascript']
date: 2021-03-03
author: '海豹人 Sealman'
image: 'javascript.png'
slug: 2021-03-03-javascript-operators
---

## 什麼是運算子 (Operators)

下方的程式碼，我們都知道 3 + 4 的答案是 7，但是 JavaScript 怎麼知道要將兩個數字相加呢？

```javascript
const a = 3 + 4
console.log(a) // 7
```

答案是透過「語法解析器」，在看到加號後把兩個數字加起來，這個加號就是所謂的運算子（加法運算子），而它的本質其實是一個**函式**！

運算子是一個特殊的函式，和我們一般在寫的函式不同。

首先，它會宣告一個函式，但不會命名為 add，而是使用加號作為函式名稱，然後給定兩個參數，最後回傳一個值（在此是將兩數相加）。

```javascript
function +(a, b) { // it's not add(a,b)
    return // add the two #s
}
```

呼叫運算子的函式的方法也有所不同，一般來說我們會給一個括號、傳入參數，然後呼叫函式，像是 `+(1, 2)` 這樣。

但是 JavaScript 使用「中綴表示法」，讓運算子是以中綴形式處於運算元的中間，讓人讀起來簡單易懂，不過還是要記住它的本質其實是一個**具有兩個參數的函式**。

```javascript
+(3, 4); // Wrong! 這樣太麻煩了!
3 + 4; // JavaScript 使用中綴表示法

// 其他還有...
+3 4; // 去掉括號與逗號 → 前綴表示法
3 4+; // 加號放在後面 → 後綴表示法
```

## 優先性與相依性

### 運算子優先性 (Operator Precedence)

決定哪個運算子被優先計算，先處理高優先序的，再處理低優先序的。

可以參考 MDN 裡關於優先性的表格 [Operator Precedence Table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#table)，Precedence 數字愈大的，代表會愈先被呼叫處理。

> 表格按照優先序最高 (21) 到最低 (1) 排序。

![Operator Precedence Table](https://i.imgur.com/E6HjOpx.png)

### 相依性 (Associativity)

當優先序相同時，會使用相依性決定運算方向，分別為左相依性（由左向右計算）與右相依性（由右向左計算）。

以下範例使用了三個相同的運算子，所以優先序相同，這時候就要用相依性決定運算方向。

```javascript
let a = 1,
  b = 2,
  c = 3

a = b = c

console.log(a)
console.log(b)
console.log(c)
```

執行後，答案會出現全部都是 3，為什麼？

因為這邊使用「等號運算子」的相依性是右到左，因此先呼叫最右邊的 `b = c`。

> 如果是右相依性，先呼叫 `b = c`；如果是左相依性，先呼叫 `a = b`。

補充說明一下，我們前面說過 `b = c` 這種運算子的本質是一個函式，而等號運算子的函式就是**把左邊的值設定成右邊的值**，然後**回傳右邊的參數**，也就是 b 會被設定成 c 的值，並且回傳 c，以此類推最後 a、b、c 就會都等於 3。

## 強制型轉 (Coercion)

轉換一個值的型別。

舉例來說，加號運算子除了可以把兩個參數相加，也能用來將兩個字串相加合併，效果就像是把兩個字串放在一起。

```javascript
const a = 1 + 2
console.log(a) // 3

const str = 'Hello ' + 'world!'
console.log(str) // Hello world!
```

下方範例中，傳入兩個不同型別的參數給加號運算子的函式，JavaScript 引擎會強制把數字 1 型轉成字串 1，然後再合併兩個字串。

我們沒有寫任何轉換型別的方法，而是 JavaScript 猜測我們想要這個值，自動幫我們轉換。

```javascript
const b = 1 + '2'
console.log(b) // '12'
```

我們知道運算子是一種函式，所以強制型別轉換其實就是呼叫函式的一部分，因此也是動態型別的觀念中的一部分。

## 比較運算子

### 關於強制型轉的影響

強制型轉會導致一些從人類數學角度看起來很奇怪的結果，但是在電腦或 JavaScript 角度來看是正常合理的情況。

例如：3 < 2 < 1 會回傳什麼結果呢？

```javascript
// 小於運算子是左相依性 (left-to-right)
// 第一次比較後的結果
console.log(false < 1)

// 此時 JavaScript 會強制型轉 Boolean 為 Number
// 可以用內建函數 (實務上不建議使用) 看強制型轉的結果
console.log(Number(false)) // 0

// 所以最後 0 < 1 就會變成 true
```

那麼如果型轉 undefined 會出現什麼結果？

```javascript
Number(undefined) // NaN
```

我們會得到 NaN，表示「不是數字 (Not a Number)」的意思。NaN 代表有個東西想要轉換成數值型別，但它不是數字，所以無法轉換。

但是如果是 null 的話，JavaScript 則是會將 null 當作 0 的意思。所以不是每個強制型轉都能明顯判斷，有些真的只能硬記。

```javascript
Number(null) // 0
```

### 雙等號與三等號的比較運算子

剛剛我們說 null 在比大小的時候會被轉成數值，但是 null 在相等比較時，卻不會被型轉為 0。

```javascript
false == 0 // true
null == 0 // false...What!?
null < 1 // true
```

![What!?](https://i.imgur.com/BjSkpyF.png)

這算是 JavaScript 的缺陷，尤其是雙等號的比較運算子，真的有很多奇怪的錯誤。

再附上幾個奇妙範例，你會發現真要記的話，這個缺陷會導致程式碼的結果難以預期，對開發來說並不是一件好事。

```javascript
'' == 0 // true
'' == false // true
```

MDN 也有整理一張[相等性比較表格](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#a_model_for_understanding_equality_comparisons)，列出了所有相等比較的特殊情況。

![Sameness Comparisons](https://i.imgur.com/oNlUCmw.png)

這也是為什麼大家都推薦在開發時，如果不是刻意需要型轉，一律都建議使用**三等號**的比較運算子，只要資料型別不同就應該回傳 false 才對。

## 存在與布林

在 JavaScript 中會被 `Boolean()` 轉為 false 的值有：

- false
- undefined
- null
- 空字串 (`""`)
- 0, -0, NaN

我們只要記住以上幾個值就可以了，除了上述這些值，其他的像是空陣列、空物件等等都會被轉為 true。

## 預設值

呼叫以下這個函式後，會創造一個新的執行環境 `greet()` 與變數 `name`，並且在記憶體中設定變數 `name` 為預設值 `undefined`。

執行到 Log 時，加號運算子會把參數 `name` 的預設值 `undefined` 強制型轉，再合併兩個字串。

```javascript
function greet(name) {
  console.log(name) // undefined
  console.log('Hello ' + name) // Hello undefined
}

greet()
```

如果我們不想用 `undefined` 當參數的預設值，可以使用「或」運算子來設定預設值，它會回傳第一個被轉換成 true 的參數。換句話說，如果左邊的參數被轉換成 Boolean 後是 false，就會回傳右邊的參數。

```javascript
function greet(name) {
  name = name || '<Your name here>'
  console.log('Hello ' + name)
}

greet('Damao') // Hello Damao
greet() // Hello <Your name here>
```

## 全域命名空間 (Global Namespace)

上述提到的「或」運算子很常在各大框架或資源庫的原始碼中出現，主要用於避免框架衝突或覆蓋的問題。

當我們載入不同框架時，愈後面載入的檔案會堆在對方的上方，這時候可能就會出現一些問題，像是命名重複等等。

```javascript
// 先載入 lib1.js
var libraryName = 'Lib 1'

// 再載入 lib2.js
var libraryName = 'Lib 2'

// 最後載入 index.js 呼叫全域環境裡的全域變數 libraryName
console.log(libraryName) // Lib 2
```

以上面這個例子來說，我們知道在瀏覽器的全域物件 `window` 下有 `libraryName` 這個全域變數，所以我們可以透過「或」運算子，來檢查全域命名空間 (Global Namespace) 或全域物件裡面是否已經有相同的名稱。

可以看到在 `lib2.js` 中，如果 `Boolean(window.libraryName)` 回傳的是 true，就代表全域物件裡面已經有那個名稱，後續就不會把 `libraryName` 改為 `Lib 2` 了。

```javascript
// lib1.js
var libraryName = 'Lib 1'

// lib2.js
window.libraryName = window.libraryName || 'Lib 2'

// index.js
console.log(libraryName) // Lib 1
```

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- 運算子是一個特殊的函式
- JavaScript 使用中綴表示法讓運算子原本的函式簡單易懂
- 運算子的優先性與相依性
- 強制型轉所帶來的缺陷
- 比較運算子，包含可能帶來潛在錯誤的雙等號，與進行嚴格比較的三等號
- 使用「或」運算子設定函式的預設值
- 框架衝突或覆蓋的問題

## References

- [JavaScript: Understanding the Weird Parts](https://www.udemy.com/course/understand-javascript/)
- [Operator precedence - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)
- [Equality comparisons and sameness - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
