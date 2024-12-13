---
title: 'NUK JavaScript #2：函式 (Functions)'
excerpt: '原先想將 Function 與上一篇的 let 與 const 合併在同一篇，但由於篇幅會有些過長，因此決定另外寫一篇文章介紹函式。這篇文章會介紹函式的使用方式與觀念。'
tags: ['nuk', 'javascript']
date: 2019-09-18
author: 'Huang, Yung-Hsiang'
image: 'javascript.png'
slug: 2019-09-18-nuk-js-function
---

## 函式（Functions）

函式的內容就像是一連串的動作，我們會先定義函式，再透過呼叫函式的方式去執行函式裡頭的動作。

範例：

```javascript
let a = 1

function bark() {
  console.log('bark!!!')
}

bark()
bark()
bark()
```

我們宣告一個函式 bark() 之後，使用 bark() 呼叫函式執行。  
這邊我們呼叫三次 bark() 後，我們能在 console 看到它叫了三次！

![GITHUB](https://i.imgur.com/qLJlS80.png)

## 參數

此外，函式還能帶入參數，以完成更多有趣的應用。

下面我們試著做個加總的功能：

```javascript
function add(num1, num2) {
  console.log(num1 + num2)
}

add(3, 5) // 8
```

更進階一點，我們再運用上乘法，就能製作一個收銀機功能了：

```javascript
let hamPrice = 30
let cokePrice = 20

// 參數 (可以看成這個參數就等同於宣告了下面兩行)
function total(hamNum, cokeNum) {
  // let hamNum = 10;
  // let cokeNum = 30;

  let hamTotal = hamPrice * hamNum
  let cokeTotal = cokePrice * cokeNum
  console.log(hamTotal + cokeTotal)
}

total(10, 30)
```

在這個例子中，帶入函式的參數 hamNum 與 cokeNum 其實也能看成是宣告了 `let hamNum = 10` 與 `let cokeNum = 30`。

## 函式練習題

這邊提供一些邏輯訓練小題目作為練習。

### 題一

例題一：呼叫 add() 函式得到 1, 3, 6 的結果

```javascript
function add(num1) {}

add(1)
add(2)
add(3)

// 1
// 3
// 6
```

解析：  
題目中，add() 函式有一個參數，我們分別帶入 1, 2, 3 到 add() 裡面後，想要得到 1, 3, 6 的結果。

這邊我們可以思考看看 [1, 3, 6] 這三個數字之間有什麼關聯呢？

1 + 2 = 3  
3 + 3 = 6

我們依照這個邏輯，首先宣告一個變數 a 並賦予值等於 0，然後宣告一個函式，並讓我們每次執行函式之後，函式中的 a 會更新成 a + num1。

```javascript
let a = 0
function add(num1) {
  a = a + num1
  console.log(a)
}

add(1)
add(2)
add(3)
```

運用這個邏輯，我們就能得到以下的正確結果啦！

![GITHUB](https://i.imgur.com/4kpTRZd.png)

### 題二

```javascript
function test2(num1) {}

test2(3)
test2(5)
test2(2)

// 30
// 6
// 3
```

以下是參考解答：

```javascript
let a = 90
function test2(num1) {
  a = a / num1
  console.log(a)
}

test2(3)
test2(5)
test2(2)
```

### 題三

最後是一題特別一點，我們來計算 BMI，並印出結果。

這邊我們預設帶入的參數是公分，體重為公斤。

```javascript
function bmi(h_num, w_num) {
  h_num = h_num / 100
  let txt = w_num / (h_num * h_num)
  console.log(txt)
}
bmi(168, 54)
```

1. 將輸入的體重數值轉為公尺為單位
2. 帶入 BMI 的計算公式，並將結果放入一個變數中
3. 將結果顯示到 console 上

## 結論

函式是 JavaScript 中相當重要的觀念，而「邏輯運算能力」對於我們在理解函式之間的溝通與傳遞上有很大的幫助。  
例如：製作「換頁」功能時，當前頁面的內容與前後頁碼的切換。  
因此類似文末的這類邏輯考題，其實對於往後撰寫 JavaScript 時會滿有幫助的唷！

> 以上資源是我自己整理過後的筆記，若有錯誤歡迎隨時和我聯繫
