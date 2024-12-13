---
title: '[React] Debouncing with useCallback Hook'
excerpt: '本文介紹 React 當中 useCallback 這個 Hook 的使用概念，並且結合 Lodash 實作 Debouncing Search 的功能幫助理解 useCallback 的作用。'
tags: ['react', 'lodash']
date: 2022-10-11
author: 'Sean Huang'
image: 'react.jpg'
slug: 2022-10-11-usecallback
---

## 什麼是 useCallback Hook

`useCallback` 允許我們儲存跨元件執行的「函式」，它會把函式儲存在 React 內存記憶體，讓使用時的物件位址都是指向同一個地方，以避免無謂的重新渲染。

使用方式就是用 `useCallback` 包住我們要儲存的函式，它會回傳一個值（也就是你包裝的那個函式）。當我們包裝完成後，這個函式的 Functional Component 再進行重新評估執行時，函式就不會再被重新建立了。

```jsx
// 回傳一個 memoized 的 callback
const memoizedCallback = useCallback(() => {
  doSomething(a, b)
}, [a, b])
```

> 這時候使用像是 `React.memo` 時，就能夠知道傳入的函式是相同的物件。儘管 Props 傳入的是 Object，仍可以在父元件重新渲染時，不會重新分配記憶體位址，減少不必要的重新渲染

## Dependency Array

在 `useCallback` 裡面也要放 Dependencies，要放的內容其實就跟 `useEffect` 一樣，就是把我們在函式中使用到的、關於元件的任何東西，像是 Props 或者 State 都放在裡面。另外，就如同 `useEffect` 的規則，Browser 內建功能如 LocalStorage 或是 React 的 setState 等等是不需要被放入的。

```jsx
// 這裡用到 setState 但是不用放入 dependency，因為 React 保證 setState 不會變化
const toggleParagraphHandler = useCallback(() => {
  setShowParagraph(prevShowParagraph => !prevShowParagraph)
}, [])
```

如果函式有使用到一些變數，因為有 Closure 關住原本的狀態，所以就算外部更改了變數，此時 `useCallback` 包住的函式的變數值，仍然會是傳入時的值。

如果希望根據變數改變，而重新生成函式的話，我們就得把那個變數加入 Dependency。例如：我們希望 `allowToggle` 更改時，就重新生成 `toggleParagraphHandler` Function。

```jsx
const toggleParagraphHandler = useCallback(() => {
  if (allowToggle) {
    setShowParagraph(prevShowParagraph => !prevShowParagraph)
  }
}, [allowToggle])
```

## 範例練習：Lodash Debounce with React Hooks

`useCallback` 常見的其中一個使用情境，就是在實作 Throttle 或 Debounce 功能的時候。

搜尋時，我們透過 Lodash 的 `_.debounce()` 可以得到一個回傳的 Debounced 函式，並且函式使用 `window.setTimeout` 處理的 Timer 每次都不一樣，所以可以達到等待輸入的效果。換句話說，每一次回傳的 Debounced 函式都會是全新的，因此我們必須想辦法記憶這個函式，避免 React 元件重新渲染。

### 方法一：透過 useRef 避免重新渲染

我們可以透過 `useRef` 來記錄資料，因為透過 `useRef` 記錄的資料即使改變也不會造成重新渲染（若使用 `useState` 則會造成 Re-render）。

做法如下，使用 `useRef` 儲存資料，並使用 `.current` 屬性取得最新的 Debounced Function。

```jsx
const debouncedSearch = useRef(
  debounce(async params => {
    await doSearch(params)
  }, 1000),
  []
).current
```

### 方法二：透過 useCallback 記憶函式

除了上述 `useRef` 的實作方式之外，使用 `useCallback` 也可以完成一樣的效果，同時能夠讓程式碼更加語意化、更好理解，個人比較推薦這個做法。

```jsx
const debouncedSearch = useCallback(
  debounce(async params => {
    await doSearch(params)
  }, 1000),
  []
)
```

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- React useCallback Hook
- Lodash Debounce with React Hooks

## References

- [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)
- [useCallback - React 官方文件](https://zh-hant.reactjs.org/docs/hooks-reference.html#usecallback)
