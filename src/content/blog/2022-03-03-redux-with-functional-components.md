---
title: 'React Redux with Functional Components'
excerpt: '本文介紹 React Redux 於 Functional Components 的使用。'
tags: ['react', 'redux']
date: 2022-03-03
author: '海豹人 Sealman'
image: 'react.jpg'
slug: 2022-03-03-redux-with-functional-components
---

## useSelector hook

> A hook to access the redux store's state, and manage the subscription behind the scenes.

`useSelector` 會監控 Redux 特定狀態的更動，有點類似 Vuex 中 `computed` 計算屬性的感覺。

```jsx
import { useSelector } from 'react-redux'

const Counter = () => {
  // 取出 store 裡面特定的 state，只取得需要的 state!
  const counter = useSelector(state => state.counter)

  return (
    <main>
      <div>{counter}</div>
    </main>
  )
}

export default Counter
```

當 Redux Store 更新時，使用 `counter` 的 Component 也會一起被更新（重新評估、執行），因為這樣才能確保接收 Redux 最新的 `state` 喔。

## useDispatch hook

> A hook to access the redux `dispatch` function.

`useDispatch` 提供 dispatch 函式：`const dispatch = useDispatch()`。

```jsx
import { useDispatch } from 'react-redux'

const Counter = () => {
  const dispatch = useDispatch()

  const incrementHandler = () => {
    dispatch({ type: 'INCREMENT' })
  }

  const decrementHandler = () => {
    dispatch({ type: 'DECREMENT' })
  }

  return (
    <main>
      <button onClick={incrementHandler}>Increment</button>
      <button onClick={decrementHandler}>Decrement</button>
    </main>
  )
}

export default Counter
```

## 給 Actions 物件加上更多 Payloads

> 瞭解 Redux 基本的使用後，我們繼續往下看一些比較深入而且實用的功能吧！

當我們 Dispatch 一個 Action 物件時，Payload 裡面除了 `type` 我們還可以放更多內容，像是定義 `amount`，讓按鈕可以一次加上指定的數量。

```jsx
// Counter Component
const Counter = () => {
  const increaseHandler = () => {
    dispatch({ type: 'INCREASE', amount: 5 })
  }
  // return jsx...
}

// Redux Reducer Function
const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === 'INCREASE') {
    return { counter: state.counter + action.amount }
  }
}
```

## 如果有多個 State 記得一起更新

進行 Dispatch Action 更新 State 物件時，就算有些 State 我們在 Action 中不會去改動到，但還是需要把它們寫進 `return` 的物件裡，因為這個 `return` 的物件是會取代掉原本的整個 State 物件的。

- 重點一：`return` 的 State 不是合併，是整個「覆寫」！
- 重點二：千萬不要直接改變 (Mutate) 現有的狀態，也就是不能直接對 State 做改變，正確的做法是在進行操作後，再去 `return` 整個新的 State 物件。

```jsx
if (action.type === 'INCREASE') {
  // Never mutate state!!!
  // state.counter++;
  // return state;
  return {
    counter: state.counter + action.amount,
    showCounter: state.showCounter, // 不更動
  }
}

if (action.type === 'TOGGLE') {
  return {
    counter: state.counter, // 不更動
    showCounter: !state.showCounter,
  }
}
```

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- useSelector hook
- useDispatch hook

## References

- [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)
