---
title: "Understanding React's useEffect Hook"
excerpt: '本文介紹何謂 Side Effect，以及我們該如何使用 useEffect 處理這些副作用。'
tags: ['react']
date: 2021-10-17
author: '海豹人 Sealman'
image: 'react.jpg'
slug: 2021-10-17-useeffect
---

## Side Effect

> Effect (Side Effect): the tasks happen outside of the normal component evaluation. For example, HTTP Request.

React 是透過操作 DOM 去完成 UI 渲染，每當元件的 State 改變，React 就會重新渲染那個元件，讓畫面產生改變。但是有些東西是 React 無法 Handle 的，因為這些東西不是 React 負責的，所以會產生一些 Side Effect，如果沒處理好的話，可能會有重複渲染等問題使得網頁效能變差。

有哪些東西是 (Out)side effects 呢？

- Local Storage
- API
- 訂閱 (e.g. websockets)
- 同步兩個不同的 State
- ⋯⋯ 所有 React 不掌管的事物

如果今天遇到這些 Effects，我們都會需要透過 `useEffect()` 來處理喔。

## useEffect Hook

> [useEffect - React 官方文件](https://zh-hant.reactjs.org/docs/hooks-reference.html#useeffect)

useEffect 用來處理 Side Effects，常見如 HTTP Request，會根據 Dependencies 的不同，有不同的運作方式，例如放入變數就可以監聽變數更改時，去執行裡面的函式。

另外可以 return 一個函式，又稱為 Cleanup Function，會在元件從畫面離開 (unmounted) 之前執行這個清除函式裡的動作，常見的像是用來清除 Timer、Event Listener 等等，以避免 Memory Leak 發生。

### Dependencies Array

根據 `useEffect` 的依賴項目，它的運行方式會有所不同：

- 沒有 Dependency array：會在每一次 Component 被渲染時執行（每一次 State 或 Props 改變時）
  - 基本上就跟沒寫 useEffect 直接放在最外面一樣
- Dependency array 是空陣列：只在初始渲染 Component 時執行一次
  - 真的就只會 Run 那麼一次，之後其他 State 更動都不會再執行這邊的行為了
- Dependency array 裡面有某些值：當這些值更改時，就會觸發 `useEffect`
  - 初始時跑一次之外，還會監聽 State 的改變，如果有更改就會執行

範例：只有當指定依賴項發生變化時，才會執行副作用代碼，而不是當元件重新渲染時就執行。

```jsx
// -------- 副作用代碼, 指定依賴項
useEffect(() => {...}, [dependencies]);
```

### 範例：Get Memes from API

```jsx
React.useEffect(async () => {
  const res = await fetch('https://api.imgflip.com/get_memes')
  const data = await res.json()
  setAllMemes(data.data.memes)
}, [])
```

### 補充：哪些東西不需要放進 Dependencies

- **DON'T need to add state updating functions**
  - e.g. `setState`
  - **React guarantees that those functions never change**, hence you don't need to add them as dependencies (you could though)
- **DON'T need to add "built-in" APIs or functions** (functions and features built-into the browser and hence available globally)
  - e.g. 瀏覽器內建的 API `fetch()`、`localStorage`
  - These browser APIs / global functions are not related to the React component render cycle and they also never change
- **DON'T need to add variables or functions** you might have **defined OUTSIDE of your components**
  - e.g. if you create a new "helper function" in a separate file
  - Such functions or variables also are not created inside of a component function and hence changing them won't affect your components (components won't be re-evaluated if such variables or functions change and vice-versa)

### 補充：應避免將整個物件放入 Dependencies

更好的做法是，事先透過 object destructuring 將 object properties 取出，再把特定的值放入 dependency array。

```jsx
const { someProperty } = someObject

useEffect(() => {
  // code that only uses someProperty ...
}, [someProperty])
```

也可以用這麼寫，但是解構出來會比較好看。

```jsx
useEffect(() => {
  // code that only uses someProperty ...
}, [someObject.someProperty])
```

總之只要避免掉以下這種寫法即可，因為這麼做的話，`useEffect` 會在每一個 `someObject` 裡面的值被更改時執行。

```jsx
useEffect(() => {
  // code that only uses someProperty ...
}, [someObject])
```

## Cleanup Function

現在我們會使用 useEffect 去處理一些大小事了！

不過有時候我們會發生一種叫做 "Memory Leak" 的情況，最常見的例子是我們沒有清掉在 useEffect 中使用的東西，例如 EventListener、Observer、Timeout 等等，這些事件會繼續佔用記憶體，所以 Browser 會向你發出 Warning，提醒你記得要清除它們。

解決的方法就是透過 Cleanup Function，它會在以下時機點執行：

1. 在 Component 即將從畫面離開前（也就是 `componentWillUnmount`）
2. 在 Component 每一次要重新渲染前（在 `componentDidUpdate` 的最前面）

並且特別注意，在第一次執行 `useEffect` 的時候「不會」執行 Cleanup Function。

### 範例：清除 EventListener 避免 Memory Leak

```jsx
import React from 'react'

export default function WindowTracker() {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)

  React.useEffect(() => {
    function watchWidth() {
      console.log('Setting up...')
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', watchWidth)

    return function () {
      console.log('Cleaning up...')
      window.removeEventListener('resize', watchWidth)
    }
  }, [])

  return <h1>Window width: {windowWidth}</h1>
}
```

### 範例：使用 Cleanup Function 實作 Debounce

> Debounce: Execute function only on pause, but not on every keystroke.

常見做法是使用 `setTimeout` 與清除 Timer 的方式。

當狀態改變時，會觸發 `setTimeout` 延遲 500 毫秒後才去驗證輸入格式，而在 Timer 期間，如果使用者繼續打字更改狀態，就會清除現有的 Timer，進入一個新的 Timer。

因此，只有使用者最後停止輸入的那一個 Timer 會跑完 500 毫秒，並且進行驗證。總而言之，就是使用者停止輸入以前都不會進行驗證。

實作方式：在 `useEffect` 的最後面 `return` 一個函式，也就是「清除函式」，除了初次運行之外，每一次 `useEffect` 運行「之前」都會再運行這個清理功能，因為 Component 在每次輸入後都重新渲染了。

> Cleanup Function 在初次渲染時都不會執行，而是要到第二次以上使用到 `useEffect` 時才會執行

```jsx
useEffect(() => {
  setTimeout(() => {
    console.log('Checking form validity!')
    setFormIsValid(
      enteredEmail.includes('@') && enteredPassword.trim().length > 6
    )
  }, 500)

  // CLEANUP
  return () => {
    console.log('CLEANUP')
  }
}, [enteredEmail, enteredPassword])

// First init...
// "Checking form validity!"

// After typing...
// "CLEANUP"
// "Checking form validity!"
```

接著我們把 Cleanup Function 的內容改成清除計時器。

當使用者在更動表單資料時，每一次 `useEffect` 都會先透過 Cleanup Function 清除過去的 Timer，讓最後的 `setFormIsValid` 只會執行一次。

這個功能在做這種監控 Value 來發送 HTTP 請求時會特別有用，因為可以避免不停發送 Request 的問題。

```jsx
useEffect(() => {
  const identifier = setTimeout(() => {
    console.log('Checking form validity!')
    setFormIsValid(
      enteredEmail.includes('@') && enteredPassword.trim().length > 6
    )
  }, 500)

  // CLEANUP
  return () => {
    console.log('CLEANUP')
    clearTimeout(identifier)
  }
}, [enteredEmail, enteredPassword])
```

### 在 useEffect 使用 Async Function 要注意的事情

最後要注意一點，我們都知道 useEffect 會把一個 Function 當作它的第一個參數 (parameter)，而這個 Function 如果有要 return 東西，那這個 return 的東西就必須要是 "Cleanup Function"，否則你就不要寫 return。

但是今天我們如果想要寫 Async Function 怎麼辦，Async 會回傳一個 Promise 物件而非一個函式，那我們該怎麼處理呢？

很簡單，你可以把 Async Function 獨立出來定義，然後在 useEffect 中呼叫它，最後不要 return 任何東西，這樣就沒問題囉！

```jsx
React.useEffect(() => {
  async function getMemes() {
    const res = await fetch('https://api.imgflip.com/get_memes')
    const data = await res.json()
    setAllMemes(data.data.memes)
  }
  getMemes()
}, [])
```

## Recap

- Side effects
- useEffect Hook
- 關於 useEffect Dependencies 的相關注意事項
- Cleanup Function 與 Debounce 的概念

## References

- [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)
