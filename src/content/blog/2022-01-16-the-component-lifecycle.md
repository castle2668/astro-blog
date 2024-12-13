---
title: 'React Class-based Components 的生命週期（Lifecycle）'
excerpt: '本文介紹 React 的 Lifecycle，這是只有 Class-based Components 才有的喔。'
tags: ['react']
date: 2022-01-16
author: '海豹人 Sealman'
image: 'react.jpg'
slug: 2022-01-16-the-component-lifecycle
---

## componentDidMount()

元件渲染完成後執行一次。

= 等於 Vue.js `mounted` Hook

= 等於 React `useEffect` Hook 的 `useEffect(..., [])` 形式

Example: Get loaded data from server

```jsx
// Only run once (when the component initially mounted)
componentDidMount() {
  // Send http request...
  this.setState({
    filteredUsers: DUMMY_USERS,
  });
}
```

## componentDidUpdate()

當有狀態 (State) 被修改時執行（在元件更新完成、執行完 `render()` 重新繪製後）。

= 等於 Vue.js `updated` Hook

= 等於 React `useEffect` Hook 的 `useEffect(..., [someValue])` 形式

Example: Replace useEffect with componentDidUpdate

```jsx
// componentDidUpdate 提供渲染前最後的 Props 與 State
componentDidUpdate(prevProps, prevState) {
  // 加入 if 判斷避免無限迴圈
  if (prevState.searchTerm !== this.state.searchTerm) {
    this.setState({
      filteredUsers: DUMMY_USERS.filter((user) =>
        user.name.includes(this.state.searchTerm)
      ),
    });
  }
}
```

## componentWillUnmount()

當元件即將從 DOM 被移除前（重新渲染前），還需要執行一些事情的時候，就會執行一次。這也是每次 `useEffect` 運行前都會運行的清理功能 (Cleanup Function)。

= 等於 Vue.js `beforeUnmount` Hook

= 等於 React `useEffect` Hook 的 Cleanup Function `useEffect(() => {return () => {...}}, [])`

```jsx
componentWillUnmount() {
  console.log('User will unmount!');
}
```

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- Class-based Components Lifecycle

## References

- [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)
