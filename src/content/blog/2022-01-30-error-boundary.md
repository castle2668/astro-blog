---
title: '在 React Class-based Components 中使用 Error Boundary 處理錯誤'
excerpt: '本文介紹 React Class-based Components 中 Error Boundary 的使用方式。'
tags: ['react']
date: 2022-01-30
author: '海豹人 Sealman'
image: 'react.jpg'
slug: 2022-01-30-error-boundary
---

## 錯誤邊界 (Error Boundary)

如果今天在某些情況下我們拋出錯誤，但是沒有處理它，就會造成整個 App 崩潰，那麼我們該怎麼處理錯誤呢？

```jsx
componentDidUpdate() {
  if (this.props.users.length === 0) {
    throw new Error('No users provided!'); // 拋出錯誤
  }
}
```

在 JavaScript 中我們常用的就是 `try...catch`，但是它僅限在一個元件下使用，如果今天是子元件拋出錯誤，想要在父元件 Handle Error 就沒有辦法。

這時候我們就能使用 **Error Boundary** 與 `componentDidCatch` 生命週期函式來處理這個情況，每當 ErrorBoundary 裡面的子元件拋出錯誤時就會觸發 `componentDidCatch。`

我們可以將 `ErrorBoundary` 作為「保護子元件」的父元件，因此 `render()` 函式的內容就單純只放子元件的內容，也就是 `this.props.children`，

```jsx
import { Component } from 'react'

class ErrorBoundary extends Component {
  componentDidCatch() {}

  render() {
    return this.props.children
  }
}

export default ErrorBoundary
```

像這樣將 `ErrorBoundary` 元件包覆在想要保護的元件外圍（其實 `ErrorBoundary` 也可以包覆多個元件，不只一個）。

```jsx
<ErrorBoundary>
  <Users users={this.state.filteredUsers} />
</ErrorBoundary>
```

現在我們就能在 `componentDidCatch` 加上一些錯誤處理，確保拋出錯誤時整個 App 不會崩潰，反而可以 Catch 那些錯誤並處理它們。

```jsx
import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor() {
    super()
    this.state = { hasError: false }
  }

  componentDidCatch(error) {
    console.log(error)
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong!</p>
    }
    return this.props.children
  }
}

export default ErrorBoundary
```

## Summary: Class-based vs Functional Components

Helper Decision Tree:

- General: Prefer Functional Components
- If you're building an Error Boundary: Use Class-based Components

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- Error Boundary

## References

- [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)
