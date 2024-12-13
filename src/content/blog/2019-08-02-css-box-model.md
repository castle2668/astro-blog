---
title: 'CSS 盒模型 (Box Model) - 讓版面控制更容易'
excerpt: '自己計算元素的寬高真的很麻煩，很怕不小心漏算了 1 px，讓畫面不整齊…還好有盒模型幫我控制元素的各種寬高，使用過的都說讚，我也已經回不去了！'
tags: ['css']
date: 2019-08-02
author: 'Huang, Yung-Hsiang'
image: 'development.jpg'
slug: 2019-08-02-css-box-model
---

## 使用方式

首先我們在要使用 Box Model 的元素上，加入以下的 CSS 樣式。  
如此一來，這個元素就會吃到 Box Model 的屬性了，也就是 Padding 和 Border 將不會增加該元素本身的寬度。

```css
.box {
  box-sizing: border-box;
}
```

當然我們也可以將這個屬性套用到所有元素上！像我這種已經不能沒有 Box Model 陪伴的人，就可以直接將以下的 CSS 樣式套用在頁面上的所有元素上。

```css
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
```

- webkit 跟 -moz 是特定瀏覽器的前綴詞，使用時記得加上去
- 這個屬性從 IE8 之後開始支援

## 設定值

box-sizing 有 `content-box` 跟 `border-box` 兩種屬性。

### content-box

**實際寬高 = 所設定的數值 + border + padding**  
這是網頁的預設值，也就是 Padding、Border、Margin 都會讓元素更寬或更高。

```css
.box {
  box-sizing: content-box;
}
```

### border-box

**實際寬高 = 所設定的數值 (已包含 border 和 padding)**  
border-box 包含 Border 與 Padding，如果有 Margin 還是要自己計算寬高。

```css
.box {
  box-sizing: border-box;
}
```

## 結語

使用 `box-sizing: border-box` 可以確保所有元素都可以用比較直觀的方式去定義，再也不用對 Padding 與 Border 加加減減哩！

寫這些技術筆記是為了讓自己以後忘記時有東西可以參考，也希望之後有人遇到類似問題時，能得到這些資訊。

> 以上資源是我自己整理過後的筆記，若有錯誤歡迎隨時和我聯繫
