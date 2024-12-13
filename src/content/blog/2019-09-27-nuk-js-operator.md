---
title: 'NUK JavaScript #3：運算子、if-else 條件式'
excerpt: '到了第三篇，我們要介紹運算子以及條件式，之後會進入物件與陣列，一步一步學習 JS 的基礎。'
tags: ['nuk', 'javascript']
date: 2019-09-27
author: 'Huang, Yung-Hsiang'
image: 'javascript.png'
slug: 2019-09-27-nuk-js-operator
---

## 比較運算子

- 一個等於 → 賦予
- 兩個等於 → 比較
- 三個等於 → 嚴謹比較模式
- 可使用 `typeof("內容")` 來判斷型別

以下我們直接用一些範例來說明觀念：

```javascript
// 一個等於叫做賦予
let a = 1
a = 'hello'
console.log(a)

a = a + 1
console.log(a)

a = a * 3
console.log(a) // NaN

var b = 3
var c = 4
console.log(b > c)

// 兩個等於用來比較
var d = 'hello'
var e = 'hello'
console.log(d == e)

let f = 2
let g = '2'
console.log(f == g)

// 三個等於是嚴謹比較模式
let h = 2
let i = '2'
console.log(h === i)

// 使用 typeof("內容") 來判斷型別
let j = true
console.log(typeof j)
```

練習到這裡，我們知道雙等於會先轉換型別，三等於是嚴謹比較。  
但是！這裡有一個陷阱題，就是布林值。

```javascript
let a = true
console.log(a == true)
console.log(a === true)
console.log(a === 'true') // false
console.log(a == 'true') // 還是 false
```

## if-else 條件式

if-else 條件式的意思就是「如果達成條件就做 A，否則就做 B」。

- 第一句：假設句，是或否
- 第二句：如果答案為是
- 第三句：如果答案為否

例如：  
小明他家有沒有漂亮阿姨，  
有的話，每天跟小明一起念書，  
沒有的話，小明自己讀書。

```javascript
let hasBeauty = true
if (hasBeauty) {
  console.log('每天跟小明一起念書')
} else {
  console.log('小明自己讀書')
}
```

### if-else 條件式練習題目

試著做出以下函式：

```javascript
checkWinning('廖洧杰', '20282028') // 廖洧杰，你沒有中獎
checkWinning('李小名', '21178989') // 李小名，恭喜中獎！
```

以下是參考作法，使用函式與 if-else 條件式來完成：

```javascript
let priceNumber = 21178989

function checkWinning(name, invoiceNumber) {
  if (invoiceNumber == priceNumber) {
    console.log(name + '，恭喜中獎！')
  } else {
    console.log(name + '，你沒有中獎')
  }
}
```

## 邏輯運算子

- &&：都需要符合
- ||：一個符合即可

一樣我們直接看例子來理解觀念：

```javascript
console.log(3 > 2) // true
console.log(3 > 2 && 2 > 2) // false
console.log(true == true && 1 === '1') // false
console.log('cc' == 'cc' || 1 > 0 || 3 > 2) // true

// 雖然 1 跟 2 錯了，但只要有一個可以滿足就可以了
console.log(3 === '3' || true == 'true' || 3 > 2) // true

// 因為 1 跟 2 是錯的，&& 只要其中一個錯就是 false
console.log(3 === '3' && true == 'true' && 3 > 2) // false
```

### 邏輯運算子練習題目

一個賣場只有兩個品項，一個是蘋果單價為 10 元，另一個是香蕉單價 20 元。  
今天要設計一個抽獎活動，條件必須「同時滿足」以下兩項才能抽獎：

1. 消費者是會員
2. 消費者購買的總價必須超過 300 元

必須用一個函式去計算消費者有沒有滿足條件，第一個參數是他是否為會員，第二個參數是他買了幾顆蘋果，第三個參數是他買了幾條香蕉，若滿足條件就顯示「你有抽獎資格」，若沒滿足則寫「你沒有抽獎資格」。

例如：

```javascript
checkLottery(true, 20, 20) // 你有抽獎資格
checkLottery(false, 5, 10) // 你沒有抽獎資格
```

以下是參考答案：

```javascript
let applePrice = 10
let bananaPrice = 20

function checkLottery(isMember, appleNum, bananaNum) {
  let appleTotal = applePrice * appleNum
  let bananaTotal = bananaPrice * bananaNum
  let totalPrice = appleTotal + bananaTotal
  if (isMember && totalPrice > 300) {
    console.log('你有抽獎資格')
  } else {
    console.log('你沒有抽獎資格')
  }
}

checkLottery(true, 20, 20) // 是會員且超過 300，true
checkLottery(false, 5, 10) // 不是會員就直接 false 了
checkLottery(true, 10, 10) // 雖然是會員但是消費剛好 300，false
```

## 小駝峰式寫法

上面我們變數都命名成 appleTotal, appleNum 這種形式，例如：

let appleTotal = applePrice*appleNum;  
let bananaTotal = bananaPrice*bananaNum;  
let totalPrice = appleTotal + bananaTotal;

這個是所謂的小駝峰式寫法，可以增加程式碼的「可讀性」！

## 作業 - BMI 計算機

上次做過 BMI 計算機了，這次我們根據 BMI 的數值不同，告知目前的 BMI 狀態。

```javascript
function bmi(h_num, w_num) {
  h_num = h_num / 100 // 轉公尺
  let txt = w_num / (h_num * h_num)

  if (txt < 18.5) {
    console.log('你目前過輕，你的 BMI 是' + txt)
  } else if (txt < 24 && txt >= 18.5) {
    console.log('你目前在正常範圍，你的 BMI 是' + txt)
  } else if (txt >= 24 && txt < 27) {
    console.log('你目前過重，你的 BMI 是' + txt)
  } else if (txt >= 27 && txt < 30) {
    console.log('你目前輕度肥胖，你的 BMI 是' + txt)
  } else if (txt >= 30 && txt < 35) {
    console.log('你目前中度肥胖，你的 BMI 是' + txt)
  } else if (txt >= 35) {
    console.log('你目前重度肥胖，你的 BMI 是' + txt)
  }
}

bmi(168, 55)
```

最後，這邊我們重複的字串也可以用 let 宣告，減少重複性，也能增加可讀性！

> 以上資源是我自己整理過後的筆記，若有錯誤歡迎隨時和我聯繫
