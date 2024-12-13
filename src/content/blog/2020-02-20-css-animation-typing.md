---
title: '透過 CSS Animation 製作打字動畫與閃爍游標'
excerpt: '本文介紹如何透過 CSS 來製作出打字動畫與閃爍游標，這個效果用在專案上可以添增一些亮點，視覺效果還滿不錯的，一起來試試看吧！'
tags: ['css']
date: 2020-02-20
author: 'Huang, Yung-Hsiang'
image: 'development.jpg'
slug: 2020-02-20-css-animation-typing
---

## 動畫效果介紹

實現效果如下 GIF 截圖，主要動畫效果分為兩個部分，一個是打字動畫，即文字會由左至右出現，可調整速度，另一個部分是閃爍游標，就是模擬我們輸入文字時會出現的閃爍直槓。

![效果 GIF 示範](https://i.imgur.com/vR51PwH.gif)

## 如何實現動畫效果

這個效果透過 HTML 與 CSS 就可以實作出來。

HTML 的部分很簡單，只需要一行即可：

```html
<div class="typing">我在冒險的起點等你！</div>
```

我們主要都是在針對這個 `typing` 的 Class 去撰寫 CSS 樣式。

### 打字動畫效果

我們使用 `keyframe` 與 `animation` 來製作動畫。

`@keyframes` 是在制定動畫的內容，透過關鍵影格選擇器 `from` 與 `to`（或者 `0%` 與 `100%`）去製作想要完成的效果。

打字效果其實就是以改變外層容器的寬度來實現的，因此這裡的設定就是針對 `width` 的調整。在範例中我把寬度設定為 `10em`，因為這剛好是 10 個中文字的寬度。

```css
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 10em;
  }
}
```

建立好 `@keyframes` 裡的動畫內容後，接著在想要呈現動畫內容的 Class 底下加入 `animation` 屬性。

```css
/* animation: name duration timing-function delay iteration-count direction; */
.typing {
  animation: typing 3.5s steps(10, end) infinite;
}
```

基本上就是填入剛才的 `@keyframes` 名稱，還有動畫作用時間 (`animation-duration`) 與作用次數 (`iteration-count`) 等等。  
像這邊我想要讓動畫執行無限次，因此 `iteration-count` 的值用了 `infinite`。

補間動畫 (`timing-function`) 我是使用 CSS3 animation 的 `step()` 功能，這算是比較少用到的功能。它可以刻意讓動畫變得斷斷續續的，而非順暢地連續執行，因此很適合在這裡，因為打字時本來就是一個字一個字斷斷續續地出現嘛！

> 關於 steps 的介紹可參考這篇文章：[CSS3 animation 屬性中的 steps 功能符深入介紹](https://www.zhangxinxu.com/wordpress/2018/06/css3-animation-steps-step-start-end/)

### 閃爍游標效果

游標的部分，原先我是使用 `border` 製作，並且用 `padding` 來推開一些空間，這樣邊框才不會貼著文字。  
然而，這麼做也導致了 `overflow: hidden` 在幫我卡掉溢出時，會剪裁得不太乾淨，會出現下一個字提前出現一點點的狀況，影響了動畫整體的呈現。

因此我們可以改成使用 `box-shadow` 來模擬游標，而動畫內容一樣是使用 `@keyframes` 與 `animation` 來製作。

最後就附上完整的 CSS 程式碼給大家吧 😇

```css
.typing {
  width: 10em;
  white-space: nowrap;
  border-right: 2px solid transparent;
  animation:
    typing 3.5s steps(10, end),
    blinkCursor 0.75s step-end infinite;
  overflow: hidden;
  letter-spacing: 0;
}
/* 打字動畫 */
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 10em;
  }
}
/* 閃爍游標 */
@keyframes blinkCursor {
  from,
  to {
    box-shadow: 2px 0 0 0 transparent;
  }
  50% {
    box-shadow: 2px 0 0 0;
  }
}
```

## 參考資料

1. [#CSS：製作動畫效果－使用 keyframe 與 animation | 新罪楓翼 ☆ 灆洢騎士 - 點部落](https://dotblogs.com.tw/knightzone/2013/09/07/116716)

> 以上資源是我自己整理過後的筆記，若有錯誤歡迎隨時和我聯繫
