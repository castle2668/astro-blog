---
title: 'Introduction to Class-based Components'
excerpt: '本文介紹 React Class-based Components 的使用方式。'
tags: ['react']
date: 2022-01-09
author: '海豹人 Sealman'
image: 'react.jpg'
slug: 2022-01-09-class-based-components
---

## Basic Usage

Traditionally (**React < 16.8**), you had to use Class-based Components to manage **State**.

```jsx
import { Component } from 'react'
import classes from './User.module.css'

class User extends Component {
  render() {
    return <li className={classes.user}>{this.props.name}</li>
  }
}
// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>;
// };

export default User
```

幾個重點：

- 狀態是一個名為 state 的 Object
- 提供 setState 方法**合併** state Object（不是覆蓋）
- 使用 Function 時要加上 `.bind(this)`，讓函式的 this 指向 Class Component
- 當使用 extends 時，constructor 裡面一定要加 super

```jsx
class Users extends Component {
  constructor() {
    super() // 當使用 extends 時一定要加 super
    // Class Component 的狀態只能是一個名為 state 的 Object
    this.state = {
      showUsers: true,
      more: 'Test',
    }
  }

  toggleUsersHandler() {
    // this.state.showUsers = false; // NOT!
    // 這個 setState 是 Class Component 提供的方法，會合併 state Object
    this.setState(prevState => {
      return { showUsers: !prevState.showUsers }
    })
  }

  render() {
    // helper constant
    const usersList = (
      <ul>
        {DUMMY_USERS.map(user => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    )

    return (
      <div className={classes.users}>
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? 'Hide' : 'Show'} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    )
  }
}
```

## 使用 Context

```jsx
import { Component } from 'react'
import UsersContext from '../store/users-context'

class UserFinder extends Component {
  // class component 只能使用一個 context
  static contextType = UsersContext

  componentDidMount() {
    this.setState({
      // 取得 context 的資料
      filteredUsers: this.context.users,
    })
  }
}
```

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- Class-based Component

## References

- [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)
