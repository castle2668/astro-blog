---
title: '關於 React Refs 的概念，以及如何 Forwarding Refs'
excerpt: '本文會介紹 React 當中的 Refs，及其延伸出的 useRef 與 forwardRef 的使用方式。'
tags: ['react']
date: 2021-10-01
author: '海豹人 Sealman'
image: 'react.jpg'
slug: 2021-10-01-useref-forwardref
---

## 什麼是 Ref

Ref 就是 Reference 的意思，它是一個「唯讀屬性」，只能讀不能寫。如果我們只是想要讀取一個值，可以使用 Ref 就好，不需要使用到 State。

## useRef Hook

Ref 的主要用法，通常是用來訪問 DOM。

如果只是要取得送出的值，不需要操作、修改值的話（例如：監控每一次輸入的變化），我們不一定要使用 `useState` 與 `onChange`，我們可以使用 `useRef` 來處理這種情況。

`useRef` 會回傳一個 Object，裡面的 `current` 屬性為初始傳入的參數（通常不寫或者寫 `null`），與 DOM 進行綁定後，存取這個 `current` 就會拿到你用 Ref 設定的相應 DOM 節點。

```jsx
// 新增 useRef 加到 HTML <Input> 上面
const nameInputRef = useRef()
;<input id="username" type="text" ref={nameInputRef} />

// useRef.current 指向 <input> element
console.log(nameInputRef.current) // <input id="username" type="text">
```

特別注意，`useRef.current.value` 所取得的值會是 String 型別，即使 Input 的 `type` 設定為 `number` 也一樣，如下所示。

```jsx
console.log(nameInputRef.current.value) // "1"
console.log(+amountInputRef.current.value) // Convert a numbered "String" to a "Number"
```

如果非得要透過 Ref 去操作 DOM，基本上只建議進行一些簡單操作，因為 DOM 是所謂的 **Uncontrolled Component**，也就是它並不受到 React 控制的意思。

在使用 Ref 時，沒有操作 State 太多的行為是勉強能接受的（例如：清空輸入欄），因為我們沒有透過 `useRef` 來新增 DOM 或者改變太多狀態，但還是盡量少這樣操作。

```jsx
// Manipulating the DOM
nameInputRef.current.value = ''
```

另一個使用 Ref 的常見用法，是當我們有一個值需要管理，但是希望它不是一個 State 的時候。由於 State 會在變更時也重新評估與執行元件，所以像是初始化階段時，如果要判斷是否已經初始化，可以透過 Ref 來做紀錄，因為 Ref 在變更時不會重新評估元件，而且也會僅作用於該元件內。

## React.forwardRef

如果不是原生的 HTML 標籤，而是自己寫的元件的話，我們沒辦法直接使用 `ref`。

```jsx
// 自己做的 <Input> 元件，沒辦法直接使用 ref

<Input ref={xxxRef} />
```

我們必須要透過 `forwardRef` 把元件包裝起來，變成 `<forwardInput>` 來把 `<Input>` 往前傳遞。

```jsx
const forwardInput = React.forwardRef(Input)
```

當我們自製的元件使用 `forwardRef` 包裝後，這個 `<Input>` 元件就能夠取用 `ref` 這個參數了，現在我們把 `ref` 當成 props 傳遞給裡面的 HTML `<input>` 使用。

> 注意，此時在父元件當中，我們要使用的仍然是 `<Input>`，而不是 `<forwardInput>` 喔！

```jsx
const Input = (props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  )
}

const forwardInput = React.forwardRef(Input)

export default forwardInput
```

> 實際使用範例可參考 [React Hook useRef and forwarding refs with forwardRef](https://youtu.be/ScT4ElKd6eo) 這部影片。

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- useRef Hook
- React.forwardRef

## References

- [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)
