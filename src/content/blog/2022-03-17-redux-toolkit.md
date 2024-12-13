---
title: '使用 Redux Toolkit 更有效率地撰寫 Redux'
excerpt: '本文介紹 Redux Toolkit 的基本使用方式，因為我是從 Vue 轉 React 的開發者，第一眼看到 Redux Toolkit 真的眼睛為之一亮！裡面使用到的觀念與 Vuex 相仿，非常好理解，撰寫的結構也相當有條理喔。'
tags: ['react', 'redux', 'reduxtoolkit']
date: 2022-03-17
author: '海豹人 Sealman'
image: 'react.jpg'
slug: 2022-03-17-redux-toolkit
---

## 開始使用 Redux Toolkit

```bash
npm install @reduxjs/toolkit
npm install react-redux
```

Redux Toolkit 簡化了 Redux 的使用方式，以下是簡單歸納的用法，以下會詳細說明每個步驟該怎麼實作。

1. Create a Redux State Slice by **createSlice**
2. Create a Redux Store by **configureStore**
3. Use Redux State and Actions in React Components

### Step 1. 透過 createSlice 新增 Slice

首先我們透過 `createSlice()` 建立各種 Slice，像是 `counterSlice` 等等，不相關的功能可以分別建立不同的 Slice。

```jsx
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  counter: 0,
  showCounter: true,
}

const counterSlice = createSlice({
  name: 'counter', // 可任意命名
  initialState: initialState, // 初始值
  reducers: {
    increment(state) {
      state.counter++ // RTK 會自動把它變成 immutable 的方式
    },
    decrement(state) {
      state.counter--
    },
    increase(state, action) {
      state.counter = state.counter + action.payload
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter
    },
  },
})

// 導出 counterSlice 的 actions 物件到元件中做使用
export const counterActions = counterSlice.actions
```

### Step 2. 透過 configureStore 建立 Store

建立好 Slice 之後，就可以建立 Store 並且配置 Reducer。

有別於以往使用 `createStore()` 建立 Store，這次我們要改用 Redux Toolkit 裡面的 `configureStore()` 函式來建立 Store，因為使用 `configureStore` 能夠讓我們更方便地去配置多個 Slice。

特別注意，因為 Redux 規定需要一個主要的 Reducer Function，所以這裡在配置時，一定要有一個 Key 叫做 `reducer`，主要用來控制 Global State。因此，我們就把想要全域使用的 Reducer 作為 Value 餵給 `reducer` 這個 Key。

```jsx
// Create Redux store
const store = configureStore({
  reducer: counterSlice.reducer,
})
```

當然，如果是經手一些大型專案，我們可能會需要切分出多個 Slice，這時候我們可以透過物件的形式配置多個 Reducer。這麼做就像是在建立一個 Reducer 的 Map，並且 `configureStore` 還會自動幫我們把這些 Reducers 全部合併成一個 Main Reducer。

```jsx
// Create a map of reducer (Add Slice Reducers to the Store)
const store = configureStore({
  reducer: { counter: counterSlice.reducer },
})

export const counterActions = counterSlice.actions

export default store
```

> 在最後 `export` 時，除了預設導出 `store`，也記得可以直接導出整個 `actions` 物件，像是可以命名為 `counterActions` 方便我們在元件中使用

### Step 3. 透過 useDispatch 調用 Action Creator

當我們完成上述設定後，現在只要調用 Action Creator 像是 `counterSlice.actions.toggleCounter()` 就會回傳一個自動生成的 Action 物件，回傳的內容會像是 `{type: 'some auto-generated unique identifier'}` 這樣的物件格式。

這也是為什麼我們在 RTK 使用 `dispatch` 時，後方的 Actions 有帶 `()` 就會直接執行，因為 RTK 會直接執行它自動生成的 action 物件。

> 有了自動生成，開發者就不用擔心 Identifier 可能重複，或者不小心打錯字的疑慮囉！

使用範例：在元件中使用 `dispatch(counterActions.increment())` 也就等於使用 `dispatch({type: 'UNIQUE_ID'})` 的效果（如果還需要 Payload 就再加上參數即可）。

```jsx
import { counterActions } from '../store'

const Counter = () => {
  // ...omit
  const dispatch = useDispatch()

  const incrementHandler = () => {
    dispatch(counterActions.increment())
  }

  const increaseHandler = () => {
    // payload
    dispatch(counterActions.increase(10)) // {type: 'UNIQUE_ID', payload: 10}
  }

  const decrementHandler = () => {
    dispatch(counterActions.decrement())
  }

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter())
  }
  // ...omit
}
```

## 進階使用 (Optional)

### Step 4. 處理多個 Slice

假設除了 `counter` 這個 Slice，現在還需要另一個 Slice 叫做 `auth`，我們需要去配置多種 State Slice。

```jsx
const initialCounterState = {...};
const counterSlice = createSlice({...});

const initialAuthState = {...};
const authSlice = createSlice({...});

const store = configureStore({
  // reducer map
  reducer: { counter: counterSlice.reducer, auth: authSlice.reducer },
});

// Expose the actions
export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;

export default store;
```

完成上述配置後，當我們要在元件裡讀取 Redux 的 `state` 時，就要額外去指定 Reducer Map 當中的 Identifier。

```jsx
// state.counter => state.counter.counter
const counter = useSelector(state => state.counter.counter)
const showCounter = useSelector(state => state.counter.showCounter)
```

### Step 5. 檔案與程式碼拆分

當我們有不同功能的 Slice 時，將它們拆分成不同的檔案，是一個提升開發者體驗的好辦法。舉例來說，Counter 資料就放在 `counter.js`，Auth 就放在 `auth.js`，最後再 Import 到 `index.js` 裡面一起導出就好了。

```jsx
// src/store/counter.js
import { createSlice } from '@reduxjs/toolkit';

const initialCounterState = {...};
const counterSlice = createSlice({...});

export const counterActions = counterSlice.actions; // Expose the actions
export default counterSlice.reducer;
```

我們在此只需要導出 Reducer 也就是 `counterSlice.reducer`，把各個 Reducer 提供給彙整用的 `index.js` 即可（Auth 同理），至於 Actions 則是分別從各自的 Store 檔案中導出。

```jsx
// src/store/auth.js
import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {...};
const authSlice = createSlice({...});

export const authActions = authSlice.actions; // Expose the actions (for dispatch)
export default authSlice.reducer;
```

整合到 `index.js` 裡面，其中 `configureStore` 時的 KEY（`counter` 與 `auth`）會影響到使用 `useSelector` 時的撰寫（即 `state.KEY.stateName`）

```jsx
// src/store/index.js
import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './counter'
import authReducer from './auth'

const store = configureStore({
  // KEY for useSelector (state.KEY.stateName)
  reducer: { counter: counterReducer, auth: authReducer },
})

export default store
```

除此之外，在元件中調用 Actions 物件時，也要注意 Import 的路徑，Actions 是從每個功能個別的 Store 導出的。

```jsx
import { counterActions } from '../store/counter'
```

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- Redux Toolkit

## References

- [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)
