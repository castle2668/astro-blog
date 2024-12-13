---
title: '使用 React Context 處理全域狀態'
excerpt: '為了避免 Props Drilling，React 提供了 Context API 幫助我們解決這樣的問題，本文會介紹 Context API 的基本用法，包含 createContext、Provider、Consumer、useContext 等概念。'
tags: ['react']
date: 2021-10-31
author: '海豹人 Sealman'
image: 'react.jpg'
slug: 2021-10-31-react-context
---

## React Context (Context API)

當 Props 從 Parent 傳到 Child，再往下傳給下一個 Child 時，這樣一層一層的傳遞鏈 (Props Drilling) 在大型專案上會相當複雜。舉例來說，「是否登入」這個狀態通常會使用在許多元件中，它會被用來驗證用戶是否登入，又或是購物車資料的狀態需要顯示在不同頁面。如果我們可以省略中間這些傳遞過程，直接從父元件傳遞 Props 給真正需要資料的子元件，那不是既方便又優雅嗎？

因此，我們可以使用 React Context 做到這件事情。

### Step 1. 建置 Context (React.createContext)

首先，我們在 `/src` 下建立一個名為 `store` 的資料夾（這是常見的命名，並非絕對），然後新增一個 Context，在此範例中是用來管理登入授權相關的狀態。

可以看到這個 `AuthContext` 本身不是一個元件，它是一個用來包著元件的「物件」。如果想在某個子元件用到 Context，就用 AuthContext 包住那一個子元件。所以如果整個 App 都要用到，那也可以直接用 AuthContext 包住整個 `<App>`，就如同接下來範例的操作。

```jsx
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
})

export default AuthContext
```

> 這裡所設定的值只是為了 IDE 的自動完成提示，跟狀態的預設值無關

### Step 2. 提供 Context (Context.Provider)

要給某個元件使用 Context 的話，就透過 Provider 將這個 React Context 物件變成一個元件，這樣就能提供 Store 的資料給這個子元件使用了。本篇文章的範例中，我們想要讓 `<MainHeader>`、`<Login>`、`<Home>` 等元件都可以訪問到 AuthContext。

```jsx
return (
  <AuthContext.Provider>
    <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
    <main>
      {!isLoggedIn && <Login onLogin={loginHandler} />}
      {isLoggedIn && <Home onLogout={logoutHandler} />}
    </main>
  </AuthContext.Provider>
)
```

### Step 3. 取用 Context (useContext Hook)

接下來，我們可以透過 `useContext()` 這個 Hook 來取得剛才建立好的 Context Store。但是在取用之前，我們必須為 Provider 加上 `value` 屬性以及設定預設值。

```jsx
// 假設已經定義好了 isLoggedIn state 與 logoutHandler function...
return (
  <AuthContext.Provider
    value={{
      isLoggedIn: isLoggedIn,
      onLogout: logoutHandler,
    }}
  >
    <MainHeader />
    <main>
      {!isLoggedIn && <Login onLogin={loginHandler} />}
      {isLoggedIn && <Home onLogout={logoutHandler} />}
    </main>
  </AuthContext.Provider>
)
```

> 這裡所設定的 value 就是預設值，也會跟著 setState 做更新

在元件中使用 Context：

```jsx
const Navigation = props => {
  const authCtx = useContext(AuthContext)

  return (
    <nav className={classes.nav}>
      <ul>
        {authCtx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {authCtx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {authCtx.isLoggedIn && (
          <li>
            <button onClick={props.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navigation
```

### Step 4. 提供為全域狀態 (Optional)

如果想要直接讓 Context 提供給全域使用，可以把 Provider 放到最外層，在 ReactDOM 渲染的時候就包覆整個 App。這麼做可以集中「狀態管理」的部分，也讓元件的邏輯集中，將不同的邏輯分離，算是一個滿推薦的做法。

在進入點 index.js 將 Provider 包在整個 App 外面，提供全域取用 Context。

```jsx
ReactDOM.render(
  <AuthContextProvider
    value={{
      isLoggedIn: isLoggedIn,
      onLogout: logoutHandler,
    }}
  >
    <App />
  </AuthContextProvider>,
  document.getElementById('root')
)
```

### Step 5. 抽取出來建立一個 Context Store (Recommended)

以下是一個範例，我們把所有 Context 相關的東西整理到一個元件中，最後匯出 Provider。

```jsx
// <root>/src/store/auth-context.jsx

import React, { createContext, useState } from 'react'

export const AuthContext = createContext({
  isLoggedIn: false,
  onLogout: () => {},
})

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const loginHandler = (email, password) => {
    // handle login...
  }

  const logoutHandler = () => {
    // handle logout...
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
```

可以看到這裡從 IDE 自動完成提示、useState、Function Handler、設定 Provider 預設值，上面提到的步驟幾乎全都做了，就集中在這個檔案裡面。

所以在最後要使用時，就只需要單純使用 `<AuthContextProvider>`，也不需要再這裡設定預設值了。

```jsx
ReactDOM.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
  document.getElementById('root')
)
```

## Recap

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- React Context
- useContext Hook

## References

- [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)
