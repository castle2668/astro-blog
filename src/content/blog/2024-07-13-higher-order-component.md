---
title: 'React Code Reuse - Higher Order Component (HOC)'
excerpt: '本篇文章會透過一個簡單的 Functional Components 的範例，讓大家瞭解 React Higher Order Component (HOC) 的實作方式。'
tags: ['react']
date: 2024-07-13
author: 'Sean Huang'
image: 'react.jpg'
slug: 2024-07-13-higher-order-component
---

## Higher Order Component (HOC)

- HOC 是一個函式，帶入一個元件作為參數，並回傳一個加強版的元件
- 使用 HOC 的目的，是將共用的邏輯放在 HOC 中，變動的部分由帶入的元件的 Props 和 State 傳入
- 做到元件的重用 (Reuse)，讓開發者不用撰寫相似的程式碼
- 舉例：`connect()` 就是一個 HOC

以下我們來實作一個簡單的 HOC，幫助理解 HOC 的概念。

首先，我們有兩個主角，分別是 `Person1` 與 `Person2` ，他們的程式碼定義與功能幾乎都一樣，所以這裡我就只放 `Person1` 的 JSX。

```jsx
import React, { useState } from 'react'

function Person1() {
  const [money, setMoney] = useState(10)

  const handleIncrease = () => {
    setMoney(money * 2)
  }

  return (
    <div>
      <h1>Person 1</h1>
      <p>Money: {money}</p>
      <button type="button" onClick={handleIncrease}>
        Increase
      </button>
    </div>
  )
}

export default Person1
```

今天我們希望對這兩個人的 Money 數量做增加，然而 `Person1` 與 `Person2` 兩個元件都有 `money` 狀態以及 `handleIncrease` 函式，會造成重複撰寫相同程式碼的情況。因此，當兩人執行功能類似時，我們就可以撰寫一個高階元件，同時去滿足這兩個元件的需求。

1. 我們新增一個 HOC 名為 `UpdatedComponent`，它會傳入一個參數就是原本的元件（在此稱它為 `OriginalComponent`）
2. `UpdatedComponent` 最後會回傳一個新的元件 `NewComponent`，新的元件只是負責把傳入的舊元件做加強之後就回傳

以上步驟也就是 HOC 的基本概念與流程。

```jsx
import React, { useState } from 'react'

function UpdatedComponent(OriginalComponent) {
  function NewComponent() {
    const [money, setMoney] = useState(10)
    const handleIncrease = () => {
      setMoney(money * 2)
    }
    return <OriginalComponent handleIncrease={handleIncrease} money={money} />
  }

  return NewComponent
}

export default UpdatedComponent
```

完成 HOC 的撰寫後，原本的 `Person1` 與 `Person2` 就不需要再撰寫 State 與 Function 了，取而代之的是可以從 Props 得到 HOC 給予的 `money` 與 `handleIncrease`。

並且在最後是回傳一個 `UpdatedComponent`，因為這樣原本的元件 `Person1` 與 `Person2` 才能取得到 Props。

```jsx
import React from 'react'
import UpdatedComponent from './HOC'

function Person1({ handleIncrease, money }) {
  return (
    <div>
      <h1>Person 1</h1>
      <p>Money: {money}</p>
      <button type="button" onClick={handleIncrease}>
        Increase
      </button>
    </div>
  )
}

export default UpdatedComponent(Person1)
```

最後在使用時，只要在 JSX 渲染 `<Person1>` 與 `<Person2>`，就可以使用 HOC 同時去管理這兩個元件囉！

## 回顧

高階元件的概念，可以讓同樣功能的 State 與 Function 更好地被重複應用。

- Higher Order Component (HOC)
