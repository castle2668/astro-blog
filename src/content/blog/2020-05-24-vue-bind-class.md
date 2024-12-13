---
title: 'Vue.js 使用 v-bind 動態綁定 Class、Style 與各種屬性'
excerpt: '本篇介紹如何透過 v-bind 指令來動態綁定屬性，這是很常用到的技巧喔，以下就來介紹各種 v-bind 綁定的用法吧！'
tags: ['vue']
date: 2020-05-24
author: '海豹人 Sealman'
image: 'development.jpg'
slug: 2020-05-24-vue-bind-class
---

## Level 1：綁定一個屬性

v-bind 這個指令可以幫 HTML 標籤的屬性綁定值，讓資料可以直接反應在 HTML 屬性上。

例如：將 data 裡的 imgSrc 變數綁定在 img 標籤的 src 屬性上，這時候 img 標籤就可以使用這個圖片網址變數。

```html
<img v-bind:src="imgSrc" v-bind:style="{'backgroundColor': 'red'}" />
<!-- :style="{'樣式屬性(駝峰式寫法)': '樣式的值'}" -->
```

在實務上 v-bind 很常用來綁定 class 這個屬性，像是把調整圖片大小的 Class 名稱 img-fluid 綁定上去，讓圖片可以符合網頁大小等等。

## Level 2：用陣列加上多個 Class 或 Style

如果要加入多個 Class 或 Style，可以使用**陣列**的格式一次加入複數個。

```html
<button class="btn" :class="['btn-outline-primary', 'active']">按鈕</button>
<div :style="[{'backgroundColor': 'red'}, {'borderWidth': '5px'}]">Box</div>
```

此外，我們也可以將 Style 額外寫成一個變數（物件格式）再綁定使用，例如：

```html
<div id="app">
  <div class="box" :style="styleObject"></div>
</div>

<script>
  var app = new Vue({
    el: '#app',
    data: {
      styleObject: {
        backgroundColor: 'red',
        borderWidth: '5px',
      },
    },
  })
</script>
```

## Level 3：根據某個條件來綁定 Class

使用 v-bind 搭配**大括號**，依照**條件**來判斷是否加入 Class，算是滿常用到的技巧 👀

```html
v-bind:class="{'要綁定的 ClassName': 加載條件(判斷式)}
```

例如：點擊 span 標籤後會把 clicked 這個值改為 true，此時因為滿足 v-bind 的條件，所以動態地加上 text-primary 這個 Class 讓文字變色。

```html
<span :class="{'text-primary': clicked}" @click="clicked = !clicked">
  如果已點選，這段文字會變色。
</span>
```

## Level 4：使用三元表達式切換 Class

使用**中括號**，根據條件判斷的 true 或 false 來加載不同的 ClassName。

```html
v-bind:class="[加載條件(判斷式)? '結果為 true 的 Class': '結果為 false 的
Class']"
```

範例：

```html
<span
  :class="[clicked? 'text-primary': 'text-grey']"
  @click="clicked = !clicked"
>
  如果點選這個標籤，文字會變為主色，否則顯示灰色。
</span>
```

## Level 5：結合陣列一次綁定多個條件

我們還可以使用陣列包住多個 v-bind 動態綁定的條件式。

```html
v-bind:class="[動態綁定 Class1, 動態綁定 Class2]"
```

下方範例中，一次用了三種不同的 v-bind 寫法，這些花式綁定通通包在一個陣列裡面。

- 陣列中的字串 `'example-class1, example-class2'` 是直接用 v-bind 加入的 Class
- 接著是一個陣列，這是三元表達式的 v-bind (Level 4)
- 最後還有一個物件格式的條件判斷 v-bind (Level 3)

```html
<div
  @click="clicked = !clicked"
  :class="['example-class1 example-class2',
  [clicked? 'text-primary': 'text-grey'],
  {'bg-white': clicked}]"
>
  <span>條件一：如果點選這個 div，文字會變為主色，否則顯示灰色</span>
  <span>條件二：如果點選這個 div，背景會變為白色</span>
</div>
```

## 總結

v-bind 除了可以綁定 class、style 等屬性，也能綁定其他屬性，像是使用 UI 框架可能會出現 color、size 等官方給定的屬性。

不過在做這些綁定時，要注意屬性接收的值是什麼類別，如果要求的是 String，就需要把 `[]` 或 `{}` 拿掉，讓後面的值符合該型別，否則就會報錯哩。

此外，雖然最後提到透過陣列，我們可以在裡面寫很多組動態綁定，但是這麼做其實會降低程式碼的可讀性。  
如果真的需要綁定這麼多條件，建議使用 `computed` 來幫助解決，否則一次綁定這麼多，其實會讓這段程式碼變得太複雜，有時候 Code 寫得簡單好懂一些也是很重要的！

> 以上資源是我自己整理過後的筆記，若有錯誤歡迎隨時和我聯繫
