---
title: 'React Redux with Class-based Components'
excerpt: '本文介紹 React Redux 於 Class-based Components 的使用。'
tags: ['react', 'redux']
date: 2022-03-04
author: '海豹人 Sealman'
image: 'react.jpg'
slug: 2022-03-04-redux-with-class-based-components
---

## The Connect Function

這個 `connect()` 是一個 HOC，會接收一個元件。

它的寫法可以解讀為 `connect()` 會回傳一個 Function，接著把 Counter 元件作為參數傳進去。

```jsx
export default connect()(Counter)
```

除了接收元件，`connect()` 本身也會接受兩個 Function 作為參數：

- 第一個參數是將 Redux State map to Props，做的事情其實就跟 `useSelector` 一樣
- 第二個參數則類似 `useDispatch`，作用是將 `dispatch` 函式儲存為 Props

```jsx
import { Component } from 'react'
import { connect } from 'react-redux'

class Counter extends Component {
  incrementHandler = () => {
    this.props.increment()
  }

  decrementHandler = () => {
    this.props.decrement()
  }

  render() {
    return (
      <main>
        <div>{this.props.counter}</div>
        <div>
          <button onClick={this.incrementHandler.bind(this)}>Increment</button>
          <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
        </div>
      </main>
    )
  }
}

const mapStateToProps = state => {
  return {
    counter: state.counter,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT' }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
```

## References

- [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)
