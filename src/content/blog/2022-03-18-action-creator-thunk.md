---
title: 'Redux Toolkit with Action Creator Thunk'
excerpt: '本文介紹 Redux Toolkit 當中的 Action Creator Thunk 設計，透過 Thunk 幫助我們更好地處理非同步邏輯。'
tags: ['react', 'redux', 'reduxtoolkit']
date: 2022-03-18
author: '海豹人 Sealman'
image: 'react.jpg'
slug: 2022-03-18-action-creator-thunk
---

## Asynchronous code 在 Redux 中的問題

在 Reducer 中我們只處理「同步」行為，因為在 Reducer 執行 Call API 這種非同步的動作會造成 Side Effect。我們會在 Reducer 裡面更改 (mutate) 狀態，而且我們不應該在 Reducer 以外的地方 mutate 任何的 state。

那麼究竟該怎麼處理非同步行為呢？

有兩種方式，一種是在「元件」中透過 `useEffect()` 處理非同步行為，或者是透過 Redux 的 Action Creator 來處理它，本篇文章會詳細介紹後者，也就是 Action Creator 的處理方式。

## 程式碼邏輯應該放在哪裡

- 同步，沒有 Side Effect 的程式碼，例如：資料轉換
  - **建議**在 Reducers 中更改 🟢
  - **避免**在 Action Creators 或 Components 中更改 ❌
- 非同步，或者有 Side Effects 的程式碼，例如：呼叫 API
  - **建議**在 Action Creators 或 Components 中執行 🟢
  - **千萬不要用 Reducers** ❌

## 透過 Action Creator Thunk 處理非同步行為

> 很類似 Vuex 裡面的 Actions 在處理的事情

根據上面所歸納的結果，我們知道非同步的 Code 可以放在 Component 或是 Action Creator Thunk 當中。

- 什麼是 Thunk：Thunk 其實只是一個函式，目的是將某一個動作「延後」到其他事情完成後再執行

因此，如果一個 Action Creator 是 Thunk，那麼這個 Action Creator 就不會回傳 Action 物件，而是會回傳一個函式，而這個函式才會返回 Action 物件。

舉例來說，我們想要在 Dispatch 之前先完成一些事情，像是設定 Loading 等等，於是我們可以建立一個名為 `sendCartData` 的函式，它會回傳一個 Async Function，內容就是執行一連串的事件與操作。

> 使用 Redux Toolkit 的時候，Redux 的 `dispatch` 不只可以接收一個含有 `type` 的物件，還可以接收一個返回函式的 Action Creator

```jsx
// Thunk
export const sendCartData = cart => {
  // Redux Toolkit 會自動給予這個 "dispatch" 參數，並且會自動執行這個函式
  return async dispatch => {
    // 想要在 Fetching Data 之前顯示通知
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    )

    const sendRequest = async () => {
      const response = await fetch(
        'https://react-http-14f5a-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      )
      if (!response.ok) {
        throw new Error('Sending cart data failed.')
      }
    }

    try {
      await sendRequest()
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        })
      )
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      )
    }
  }
}
```

透過這個 `sendCartData`，也就是我們自定義的 Action Creator Function (Thunk)，就可以幫助我們把元件裡的邏輯抽離，改為放在 Redux 裡面，達到讓元件更精簡的作用。

當然，這些邏輯原本就可以直接放在元件裡面，也可以選擇抽離成 Thunk 放在 Redux 當中，兩個方式都可行，也沒有誰比較不好。

後者的概念與作法也與 Vuex 比較接近，因此可以在個人偏好與經驗上面做判斷與抉擇，我個人是因此對 Thunk 的方式感到比較熟悉，也更適應這個實作方式。

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- Action Creator Thunk

## References

- [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)
