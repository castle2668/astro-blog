---
title: 'Introducing React.memo'
excerpt: '本文介紹 React.memo 的使用方式，以此減少元件不必要的渲染。'
tags: ['react']
date: 2021-12-03
author: '海豹人 Sealman'
image: 'react.jpg'
slug: 2021-12-03-react-memo
---

## React.memo

> 偵測 Props 有沒有修改，減少元件不必要的渲染。

只要在輸出 Component 時套上 `React.memo()` 即可。（限 Functional Component 使用，Class Component 不能用）

```jsx
export default React.memo(DemoOutput)
```

`React.memo` 會去看這個 Component 所傳入使用的 Props 是否改變 (New props value vs. Previous props value)。如果父元件給的 Props 有改變，React 才會重新執行與評估這個子元件，而不是每次都重新執行。

## Shallow Compare

`React.memo` 是使用 Shallow Compare，也就是如果 Props 的類別是 Object (or Array or Function)，即使傳的是一樣的值，React 在比較兩者時仍然會將它們判斷為不同，這也是 JavaScript 的特性。

例如：傳給 Button 的 Props `onClick` 是一個 setState 函式 (`toggleParagraphHandler`)，所以即使包上 `React.memo()` 也還是會一直重新執行渲染。

```jsx
<Button onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
// props.onClick === props.previous.onClick // false
// {} === {} // false
```

這樣代表只要 Props 是物件，`React.memo` 就沒辦法處理了嗎？關於這一點可以搭配 `useCallback` 與 `useMemo` 等 Hooks 來解決喔。

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- React.memo

## References

- [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)
