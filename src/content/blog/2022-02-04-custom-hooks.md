---
title: 'React Code Reuse - Custom Hooks'
excerpt: '本文介紹為什麼我們要建立並使用 Custom Hooks，以及講解如何撰寫創建自己的 Hooks，讓我們在開發 React 專案時更好地複用各種邏輯與程式碼。'
tags: ['react']
date: 2022-02-04
author: '海豹人 Sealman'
image: 'react.jpg'
slug: 2022-02-04-custom-hooks
---

## 什麼是 Custom Hook

- Custom Hooks 可以使用 React Hooks 與 State 等函式
- 使用時機：當不同元件裡有著一定程度的共通邏輯時，我們會想要複用邏輯，在各個元件中只去撰寫不同的部分
- 特性：每一次使用 Custom Hook 時，各別內部的 State 與 Effect 都是完全獨立的

## 示範建立一個 Custom Hook

> Custom Hooks 其實不是 Functional Components，它是一個函式，只是在做法上有點類似

首先我通常習慣在 `src` 底下建立一個名為 `hooks` 的資料夾，專門用來存放自己建立的 Custom Hooks。而 Custom Hooks 的檔案名稱也是依照個人喜好即可，我自己喜歡用 `useXxx.js` 作為命名規則，舉例來說，新增 `src/hooks/useCounter.js` 檔案。

創建好檔案後，我們必須在將函式名稱命名為 `useXxx`，例如：`useCounter`。這種函式名稱的命名方式是必須遵守的規範，這是為了讓 React 能夠辨別這是一個 Custom Hook，讓你能夠在裡面使用 `useEffect` 等 Hooks。

```jsx
import { useEffect, useState } from 'react'

const useCounter = () => {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prevCounter => prevCounter + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return counter
}

export default useCounter
```

如同內建的 React Hooks，這個 Custom Hook 也會 `return` 東西，我們建立的 Custom Hook 可以回傳「任何」型別。在這個範例當中，我是回傳一個計算過後的 `number`。

最後記得導出這個 Custom Hook，這樣我們才能在其他元件中調用它。

## 使用自己建立的 Custom Hook

現在我們就到其他元件中使用 `useCounter`，以此取得回傳值（到這裡，我們就已經成功做到邏輯拆分囉）。

在使用 Custom Hooks 的時候，如果在「多個元件」中使用同一個 Custom Hook，每個元件都會產生一套自己的 Custom Hook，也就是裡面使用的 State 或 Effect 等資料都是「不會共用」的。

> 共用的是邏輯，不會共用狀態

```jsx
const ForwardCounter = () => {
  const counter = useCounter() // 這個 counter 是 Custom Hook 回傳的

  return <Card>{counter}</Card>
}

export default ForwardCounter
```

接下來，我們可以再針對不同的邏輯去做改變，像是透過「參數」來指定不同的邏輯。例如：透過 `forwards` 參數，給予 Custom Hook `false` 表示遞減，預設的 `true` 則為遞增。

```jsx
const useCounter = (forwards = true) => {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      // 根據參數的值判斷要執行的動作
      if (forwards) {
        setCounter(prevCounter => prevCounter + 1)
      } else {
        setCounter(prevCounter => prevCounter - 1)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [forwards]) // 記得把參數放入 Dependencies array

  return counter
}
```

使用上加上參數，例如：選擇傳入 `false` 表示要執行遞減。

```jsx
const BackwardCounter = () => {
  const counter = useCounter(false)

  return <Card>{counter}</Card>
}
```

## 使用 Custom Hooks 的注意事項

### 1. 小心傳遞參考類型

如果 Custom Hook 回傳的內容包含函式（或物件），在使用 `useEffect` 時「不要」將它們加入 dependencies array 來偵測變化。

為什麼？理論上應該加入沒錯，但實際上這會導致無限循環！因為每次生成的新函式或物件雖然看起來一樣，但實際上是不同的引用，這會導致 `useEffect` 不斷重跑。

解決方法：對可能變動的函式（或物件）使用 `useCallback`（或 `useMemo`），這樣就能確保它們是同一個引用。

```jsx
import { useState, useEffect, useCallback } from 'react'

const useCustomHook = () => {
  const [value, setValue] = useState(0)

  const updateValue = useCallback(() => {
    setValue(prev => prev + 1)
  }, [])

  return { value, updateValue }
}

const MyComponent = () => {
  const { value, updateValue } = useCustomHook()

  useEffect(() => {
    updateValue() // 加上 useCallback 避免導致無限循環
  }, [updateValue])

  return <div>{value}</div>
}
```

### 2. 避免在使用 Custom Hook 時傳入參數，將外部依賴改為函式參數

除了使用 `useCallback` 或 `useMemo` 之外，還有另一個解決方法，就是將 Custom Hook 所依賴的變數改為函式的參數。

這意味著在 Custom Hook 內部使用這些變數的地方，我們直接把它們作為函式參數來傳遞。這樣一來，我們就不需要在 Custom Hook 中傳遞這些變數，Custom Hook 也不需要新增 dependencies。

```jsx
import { useEffect } from 'react'

const useCustomHook = () => {
  const logDependency = dependency => {
    console.log(dependency)
  }

  return logDependency
}

const MyComponent = ({ someProp }) => {
  const logDependency = useCustomHook()

  useEffect(() => {
    // 傳遞 someProp 作為參數給 logDependency，而不是直接依賴 someProp
    // 減少了不必要的重複渲染和潛在的錯誤
    logDependency(someProp)
  }, [someProp, logDependency])

  return <div>{someProp}</div>
}
```

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- Custom Hooks

## References

- [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)
