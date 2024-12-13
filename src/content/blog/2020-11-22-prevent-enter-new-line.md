---
title: '如何避免在按下 Enter 時自動換行'
excerpt: '使用 Contenteditable 送出輸入訊息時，我們會監聽 Enter 按鍵來換行，但是這個動作會觸發換行效果，導致送出的訊息多出一個空行，這個問題該怎麼解決呢？'
tags: ['javascript', 'vue']
date: 2020-11-22
author: '海豹人 Sealman'
image: 'javascript.png'
slug: 2020-11-22-prevent-enter-new-line
---

## 綁定事件

首先我們要把事件綁定在要監聽的元素上，如果是使用 Vue 的話，可以直接透過 `@keydown` 來監聽元素，像是 `@keydown="handleInput"`，此時我們再來處理 `handleInput` 判定是否要送出內容。

如果是使用 Vanilla JS，你可以直接用 `window.addEventListener('keydown', function)` 來綁定與監聽元素。

## 禁止預設行為

接著我們透過 `e.keyCode === 13 && !e.shiftKey` 來判斷是否要禁止後續的預設行為。  
這一行的意思是如果你只按下 Enter 而沒有按 Shift 的話，就會禁止後續的預設動作，並透過 `submitMsg` 函式送出訊息內容。

反之，如果按下 Enter 的同時也有按 Shift 的話，程式會跳離這個 `if` 的判斷，因此就不會送出訊息，並且進行換行（Enter 按鍵的預設動作）。

```javascript
handleInput(e) {
  if (e.keyCode === 13 && !e.shiftKey) {
    console.log('只有按下 Enter 按鍵');
    e.preventDefault();
    this.submitMsg();
  }
},
submitMsg() {
  if (this.msg) {
    console.log('送出訊息')
  }
}
```

藉由這個方法就可以完成 Enter 送出，Shift + Enter 換行的功能了！

不過為什麼這邊要用 Keydown 而不是 Keyup 呢？
這兩者的差異是什麼哩 🤔

## Keyup vs. Keydown

首先我們從 Microsoft 針對 KeyDown 與 KeyUp 事件的[文件](https://docs.microsoft.com/zh-tw/office/vba/language/reference/user-interface-help/keydown-keyup-events)中可以得知鍵盤相關的事件順序。

帶入我們輸入訊息的案例來看，基本上流程會是 Keydown 事件 → 執行 Enter 換行 → Keyup 事件。  
因此我們如果使用 Keyup 來執行送出，那麼 Enter 所觸發的換行動作就是在 Keyup 之前執行，才導致游標會先移動至新的一行才送出訊息。

但是這不是我們想要的結果，我們希望 Enter 按鍵只要單純用來送出訊息就好，不需要幫我們多加一行空行。  
所以我們要改用觸發順序在最前面的 Keydown 來執行函式。當我們按下按鍵之後就會先送出訊息，並且在 Keydown 的事件裡面禁止後續 Enter 的動作，這樣之後執行到 Enter 的時候就不會再換行哩 👍

> 以上資源是我自己整理過後的筆記，若有錯誤歡迎隨時和我聯繫
