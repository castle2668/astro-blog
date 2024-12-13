---
title: '更強大的 React 狀態管理工具 useReducer Hook'
excerpt: '在 JavaScript 的世界中，陣列處理方法之一的 reduce 就是將多個值陸續處理累積後成為新的單一值，而本文要介紹的 useReducer 也有類似的概念，透過這個更強大的狀態管理 Hook，可以將複雜的 State 處理完成後，返回一個單純的值。'
tags: ['react']
date: 2021-10-24
author: '海豹人 Sealman'
image: 'react.jpg'
slug: 2021-10-24-usereducer
---

## 什麼是 useReducer Hook

useReducer 是 React 給予的一個更完整的狀態管理工具，但使用起來也更為複雜，比較適合用於資料處理較為複雜的狀態上，否則一般而言，多數情況下的狀態管理使用 useState 就已經足夠了。

如果你是從 Vue 2 轉換到 React 生態圈，應該有聽過 Vuex 這套狀態管理工具，其實 useReducer 與 Vuex 有著相似的概念。除此之外 useReducer 跟 React 生態圈的 Redux 也非常相似，兩者都有著 Action、Reducer、Store 這幾個傳遞資料的觀念。

然而，useReducer 沒辦法像 Vuex 或是 Redux 一樣建立出全局的資料狀態，它所建立的仍然是當前 Component 的 State 而已，不過搭配上 useContext Hook，我們還是可以建立起一個輕量的 Redux 功能喔。

## 如何使用

### Step 1. 建立 useReducer Hook

> 類似 Vuex 裡面的 State

useReducer 的撰寫方式與 useState 很類似，使用上會回傳一個陣列，並且可以得到兩個值，第一個跟 useState 一樣就是狀態的名稱，第二個則會不一樣，它是一個 Dispatch 的函式。

```jsx
// 格式
const [state, dispatchFn] = useReducer(reducerFn, initState, initFn)
// 範例
const [emailState, emailDispatch] = useReducer()
```

### Step 2. 建立 Reducer Function

> 類似 Vuex 裡面的 Mutations

接下來，我們會在元件外面定義一個 Reducer Function，這個函式會接收兩個參數，分別代表 `state` 與 `action`，經過計算處理，最後會返回一個最新的 State。

> Reducer Function (reducerFn) 可以直接用匿名箭頭函式，或是額外寫一個具名函式。通常 Reducer Function 不會使用到 Component 裡面的 State，所以會把這個函式放到 Component 外面。

當我們建立好 Reducer Function，就可以把它的 Pointer 放到 useReducer 的第一個參數。除此之外，我們在使用 useState 的時候會給予一個預設值，相同的概念，useReducer 的第二個參數也要放上一個預設值。

```jsx
// Initial State
const defaultEmailState = {
  value: '',
  isValid: false,
}

// Reducer Function
const emailReducer = (state, action) => {
  return defaultEmailState
}

const Login = props => {
  const [emailState, dispatchEmail] = useReducer(
    emailReducer,
    defaultEmailState
  )
}
```

### Step 3. 使用 Dispatch Function 觸發 State 更新

> 類似 Vuex 裡面的 Actions

現在我們可以來更新 State 了！

不同於 useState Hook 使用 setState 更新狀態，useReducer Hook 的狀態更新操作起來像是分成兩個步驟。

第一步是在元件中，我們要先呼叫 Dispatch Function，並且帶上一個參數，通常是物件的形式，它會傳到 Reducer Function 的 `action` 參數上面。

通常我們會用「物件」的形式來定義 action 參數，因為這樣可以順便聲明這個 action 的類別。例如：`emailReducer` 可以取得由 `dispatchEmail` 所傳遞的物件參數，分別是 `action.type` 與 `action.payload`。

```jsx
//              type              , payload
dispatchEmail({ type: 'USER_INPUT', payload: event.target.value })
```

第二步就是更新 State 了，透過剛才傳入的類別，我們可以定義出多個狀態更新的情境，不同的種類會回傳不同的更新結果。

```jsx
// NOTE: React guarantees that this state is absolutely the last state snapshot
const emailReducer = (state, action) => {
  // 使用者輸入觸發 Dispatch Function
  if (action.type === 'USER_INPUT') {
    return { value: action.payload, isValid: action.payload.includes('@') }
  }

  // 輸入框失去焦點觸發 Dispatch Function
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') }
  }

  return { value: '', isValid: false }
}
```

到這裡就大功告成囉！我們已經把原本在元件中的邏輯抽離到 Reducer Function 裡面了。這麼做的好處在於，如果元件裡的 State 邏輯變得複雜時，我們不會在閱讀元件程式碼的同時，還被各種 setState 搞得思緒雜亂。

我們還可以把 useReducer Hook 的這套方式應用在上一篇介紹的 Context Store 裡面，取代原本使用的 useState Hook，但是這要看情況，因為有時候邏輯並不複雜的話，繼續使用 useState 就可以了。

另外，平常我們如果要把 Callback 作為 Props 傳給子元件，通常都會加上 useCallback Hook 來記憶函式，以避免重新渲染。但是當我們使用 useReducer 後，因為 dispatch 不會因為 Re-rendering 而被重新分配記憶體位置，所以它被當作 Props 傳遞時，不加上 useMemo 也沒問題。

## 延伸討論：無法完全取代 Redux

雖然 useReducer 可以搭配 useContext 做到類似 Redux 的狀態管理機制，但是它仍然無法取代 Redux。因為 Redux 能透過 Action-Creator-Thunk 這種 Middleware 來處理資料串接，以及針對 Side Effect 的處理，這個部分即使是 useReducer + useContext 也仍然沒辦法做到。

另外，使用 useContext 最大的硬傷就是 Re-rendering 的問題，一旦 Provider 傳遞的值改變，所有用到的元件都會被重新被評估以及重新渲染。

所以基於以上兩點，useReducer + useContext 仍無法完全取代 Redux，不過如果只是想要尋求 Props Drilling 的解決方案，那麼 useReducer 加上 useContext 會是一個很適合的做法喔。

## Recap

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- useReducer Hook

## References

- [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)
