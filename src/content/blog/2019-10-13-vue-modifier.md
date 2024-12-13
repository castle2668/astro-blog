---
title: 'Vue.js Event Modifier'
excerpt: '在使用 Vue 的 v-on 時可以搭配修飾符，幫助我們加上一些附加作用，而 Vue 幫我們包裝好的修飾符有事件修飾符、按鍵修飾符，與滑鼠修飾符這三種。'
tags: ['vue']
date: 2019-10-13
author: 'Huang, Yung-Hsiang'
image: 'development.jpg'
slug: 2019-10-13-vue-modifier
---

## 什麼是修飾符

修飾符很常搭配 v-on 一起使用，大致上有以下三種：

- 事件修飾符：`.stop`、`.prevent`、`.capture`、`.self`、`.once`
- 按鍵修飾符：特定鍵、別名、組合鍵
- 滑鼠修飾符：`.left`、`.right`、`.middle`

## 事件修飾符

觸發事件時會順帶作用的修飾符。

### .stop 停止冒泡事件

.stop 其實就等同於調用 `event.stopPropagation()`。

什麼是停止冒泡事件呢 🫧

一般而言，觸發 DOM 元素時是「由內而外」傳播。

例如：當我們想要點擊中間的 `<Box>` 時，外面的 `<div>` 也會一起被觸發，而它們觸發的順序會是由內向外的 Box → Div。

![由內而外傳播](https://i.imgur.com/cODO8kp.png)

但是如果我只想點擊 Box 不想點到 Div 的話該怎麼做呢？

這個時候就可以使用 `.stop` 修飾符！把它加上去之後，觸發就「不會繼續向外傳播」，也就是點擊裡面的 Box 不會再觸發 Div 了。

```html
<div id="app">
  <div @click="trigger('div')">
    <span @click.stop="trigger('box')"></span>
  </div>
</div>

<script>
  var app = new Vue({
    el: '#app',
    data: {
      // omit...
    },
    methods: {
      trigger: function (name) {
        console.log(name, '此事件被觸發了')
      },
    },
  })
</script>
```

舉例使用情境：在 Twitter 上，每一則 Tweet 被點擊任何位置，都會進入該則推文的專屬頁面。然而，推文裡也有一些圖片、連結、按鈕，在點擊這些元素時，只會開啟圖片或連結，而不會再繼續進入推文頁，這就是應用 stopPropagation 的效果。

### .prevent 禁止預設行為

加上 .prevent 會禁止元素原本要做的行為，其實這就等同於調用 `event.preventDefault()` 方法。

### .capture 由外而內傳播

.capture 會讓傳播順序相反，變成由外而內傳播。

例如：點擊中間的按鈕後，會回傳「傳播順序相反」的結果。

```html
<div id="app">
  <div @click.capture="trigger('div')">
    <span @click.capture="trigger('box')">
      <button @click.capture="trigger('button')">按我</button>
    </span>
  </div>
</div>
```

如圖，原本是由內而外傳播，現在變成由最外層的 div 先回傳結果了。

![GITHUB](https://i.imgur.com/7G53sgc.png)

### .self 只觸發自己

加上 .self 修飾符，就能夠讓點擊時只觸發到「自己」這一個元素，而不會觸發其他元素。

```html
<div id="app">
  <div @click.self="trigger('div')">
    <span @click.self="trigger('box')">
      <button @click.self="trigger('button')">按我</button>
    </span>
  </div>
</div>
```

### .once 只觸發一次

加上 .once 會使得事件偵聽器只觸發「一次」。

```html
<div id="app">
  <div @click.once="trigger('div')">
    <span @click.once="trigger('box')">
      <button @click.once="trigger('button')">按我</button>
    </span>
  </div>
</div>
```

## 按鍵修飾符

透過鍵盤的按鍵可以觸發的一些效果。

### keyCode (KeyAlias)

事件會從「特定按鍵」觸發，鍵盤上的每個按鍵都有一個對應的編號，透過一些查詢編號網站像是[JavaScript Event KeyCodes](https://keycode.info/)可以查到，像是 Enter 等於 13。

使用範例：在 `keyup` 後面直接加上 keyCode 號碼像是 `@keyup.13`，就能在按下 Enter 時觸發事件。

```html
<input type="text" v-model="text" @keyup.13="trigger(13)" />
```

### 別名修飾

當然我們不一定要記住以上那些按鍵編號，我們也可以使用「別名」當作按鍵修飾符，像是 `.enter`、`.tab`、`.delete`、`.esc`、`.space`、`.up`、`.down`、`.left`、`.right`。

例如：`@keyup.space` 就是只有按下 Space 時才會觸發，如果是按 Enter 或其他按鍵都不會觸發事件。

```html
<input type="text" v-model="text" @keyup.space="trigger('space')" />
```

### 相應按鍵（組合鍵）

只有按下相應的組合鍵時，才會觸發事件的監聽器，例如：`.ctrl`、`.alt`、`.shift`、`.meta`。

範例：`@keyup.shift.enter` 就是要同時按 Shift + Enter 才會觸發事件。

組合鍵通常會用在輸入框的設計上，例如 Enter 是換行，而 Shift + Enter 才是送出留言。

```html
<input
  type="text"
  v-model="text"
  @keyup.shift.enter="trigger('shift + Enter')"
/>
```

## 滑鼠修飾符

預設點擊的是左鍵 (left)，總共有以下三種滑鼠修飾符：

- `.left`：只有點擊滑鼠「左鍵」時才會觸發
- `.right`：只有點擊滑鼠「右鍵」時才會觸發
- `.middle`：只有點擊滑鼠「中鍵」時才會觸發

範例：用滑鼠右鍵 `@click.right` 觸發事件。

```html
<span class="box" @click.right="trigger('Right button')"></span>
```

> 以上資源是我自己整理過後的筆記，若有錯誤歡迎隨時和我聯繫
