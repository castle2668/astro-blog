---
title: 'Styling React Components'
excerpt: '本文介紹 React 中基本的樣式撰寫方式，包含 Inline Style、CSS Modules、styled-components 等方式。'
tags: ['react']
date: 2021-09-17
author: '海豹人 Sealman'
image: 'react.jpg'
slug: 2021-09-17-styling-react-components
---

## Inline Style

除非需要做動態新增 style 的操作，否則基本上不推薦使用 `style` 屬性作為修飾 Elements 的手段，因為使用 CSS class 通常比 inline-style 的效能更好。

要在 JSX 中放入 JavaScript 邏輯會需要一對括號，括號裡面會再放一個物件來撰寫我們的 inline-style，所以寫起來會有兩對括號，像是 `style={{background: #ccc, fontSize: '16'}}`。

如果覺得這樣太混亂，可以另外定義一個物件，再用 `style` 屬性接收它，而且這麼做也可以防止 XSS 安全漏洞，例如：

```jsx
const divStyle = {
  background: '#ccc',
  fontSize: '16',
}

const HelloWorldComponent = () => {
  return <div style={divStyle}>Hello World!</div>
}
```

## Styled Components vs. CSS Modules

Styled Components 與 CSS Modules 該如何選擇？

兩者都是很棒的實踐方式，彼此也都有一些獨特的優點勝過對方。

使用 CSS Modules 與撰寫原本的 CSS 很類似，所以也能夠使用 SCSS、StyleLint 等功能。除此之外，很多人主張不喜歡把所有的東西（像是樣式）都放入 JavaScript，因而選擇使用 CSS Modules。

至於 Styled Components 的優點，最明顯的就是 CSS in JS 的特色，這讓開發者可以在 style 裡面使用 JavaScript 的邏輯，同時也少了 CSS 的檔案，因此整體檔案數量比較少。

除此之外，比起使用 `<h1>` 標籤搭配 className 的方式，使用 Styled Components 像是 `<Title>` 的這種形式在語意上讓人覺得更好閱讀。

就我個人而言，我覺得使用 Styled Components 的開發速度比較快，尤其是從零開始開發一個專案的時候，然而雖然 CSS in JS 很方便、快速，但是在後續維護的可讀性上，或許 CSS Modules 會更簡單好懂。

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- Inline Style
- Styled Components vs. CSS Modules

## References

- [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)
