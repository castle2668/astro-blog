---
title: 'Forms in React'
excerpt: '本文介紹如何在 React 中使用 Forms 表單相關元素。'
tags: ['react']
date: 2021-10-10
author: '海豹人 Sealman'
image: 'react.jpg'
slug: 2021-10-10-forms-in-react
---

## Controlled Components

在 HTML 中，表單 (Forms) 裡面的項目像是 Input、Textarea、Select 會自動跟著使用者輸入的值而改變狀態，而在 React 中，狀態則是透過 `setState()` 來更新，屬於單向資料流。

因此，當我們在 React 使用 Input 時，就要一起把 State 與 Input 的 `value` 屬性做綁定，這麼一來 Input 的值又會是透過 React 控制了。此時，這樣的元件又被稱作 **Controlled Components**，很重要，記得要綁定！

## 表單範例：Input、Textarea、Checkbox

可以看到 Input, Textarea 的 `value` 都被我們綁上了 React 的 State，還有 Checkbox 的 `checked` 屬性也是。

現在這些表單的值都會等於 React 的 State，因此我們透過 `onChange` 事件去更改 State，並且監聽每一個 Keystroke 隨時更新表單呈現的值。

除此之外，這裡的 `handleChange` 有幾個小巧思，可以特別留意一下：

1. 回傳時，我們使用 Spread 來把原物件展開，再添加新的 Key-value Pair
2. 所有表單元素都有 `name` 屬性用來聲明欄位名稱，我們使用 ES6 的 Computed Property 來動態取得 `name`，藉由它來當作新的物件的 Key
3. 透過三元判斷，去判斷 `type` 是否為 Checkbox，因為只有 Checkbox 需要的值是 `checked` (Boolean) 而非 `value` (String)

```jsx
import React from 'react'

const Form = () => {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    comments: '',
    isFriendly: true,
  })

  const handleChange = event => {
    const { name, value, type, checked } = event.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value,
      }
    })
  }

  return (
    <form>
      <input
        type="text"
        placeholder="First Name"
        onChange={handleChange}
        name="firstName"
        value={formData.firstName}
      />
      <input
        type="text"
        placeholder="Last Name"
        onChange={handleChange}
        name="lastName"
        value={formData.lastName}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={handleChange}
        name="email"
        value={formData.email}
      />
      <textarea
        value={formData.comments}
        placeholder="Comments"
        onChange={handleChange}
        name="comments"
      />
      <input
        type="checkbox"
        id="isFriendly"
        checked={formData.isFriendly}
        onChange={handleChange}
        name="isFriendly"
      />
      <label htmlFor="isFriendly">Are you friendly?</label>
      <br />
    </form>
  )
}

export default Form
```

## 表單範例：Radio

製作 React 表單的 Radio 時，我們可以對 `checked` 屬性判斷 `formData.employment` 是否等於選取到的 `value`，以呈現哪一個選項是被選取的。

```jsx
import React from 'react'

const Form = () => {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    comments: '',
    isFriendly: true,
    employment: '',
  })
  console.log(formData.employment)

  const handleChange = event => {
    const { name, value, type, checked } = event.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value,
      }
    })
  }

  return (
    <form>
      <fieldset>
        <legend>Current employment status</legend>

        <input
          type="radio"
          id="unemployed"
          name="employment"
          value="unemployed"
          checked={formData.employment === 'unemployed'}
          onChange={handleChange}
        />
        <label htmlFor="unemployed">Unemployed</label>
        <br />

        <input
          type="radio"
          id="part-time"
          name="employment"
          value="part-time"
          checked={formData.employment === 'part-time'}
          onChange={handleChange}
        />
        <label htmlFor="part-time">Part-time</label>
        <br />

        <input
          type="radio"
          id="full-time"
          name="employment"
          value="full-time"
          checked={formData.employment === 'full-time'}
          onChange={handleChange}
        />
        <label htmlFor="full-time">Full-time</label>
        <br />
      </fieldset>
    </form>
  )
}

export default Form
```

## 表單範例：Select & Option

在 HTML 中 Select 與 Option 會透過 `selected` 屬性標註被選取到的選項，例如：

```html
<select>
  <option selected value="seal">Seal</option>
</select>
```

但是在 React 中，因為我們要控制狀態，所以必須想辦法把 State 綁定上去。

我們新增狀態 `favColor` 把它綁定到 `<select>` 的 `value` 屬性上，並且透過 `onChange` 事件更新狀態。

```jsx
const [formData, setFormData] = React.useState({
  firstName: '',
  lastName: '',
  email: '',
  comments: '',
  isFriendly: true,
  employment: '',
  favColor: '',
})
console.log(formData.favColor)
```

跟其他範例一樣新增 HTML `name` 屬性，用 ES6 Computed Property 作為 `setState` 更新的 `key`，另外也新增了空值的預設選項。

```jsx
<select
  id="favColor"
  value={formData.favColor}
  onChange={handleChange}
  name="favColor"
>
  <option value="">-- Choose --</option>
  <option value="red">Red</option>
  <option value="orange">Orange</option>
  <option value="yellow">Yellow</option>
  <option value="green">Green</option>
  <option value="blue">Blue</option>
  <option value="indigo">Indigo</option>
  <option value="violet">Violet</option>
</select>
```

## 最後來送出表單吧

在 HTML 中，如果在 `<form>` 裡面放 `<button>` 預設就會是 `type="submit"`，網頁會透過這個按鈕去送出表單。

```html
<form method="POST" action="somePhp.php">
  <button>Submit</button>
</form>
```

以下則是我們在 React 送出表單的做法，我們透過 Submit Button (Default type in form) 去觸發 `onSumbit` 事件來監聽表單送出，然後執行我們自訂的函式。

```jsx
<form onSubmit="handleSubmit">
  <button>Submit</button>
</form>
```

然而，如果表單沒有寫 `action` 的話，默認 HTML 會重整頁面，並且在網址後面加一段 Query String 例如：

`/index.html?firstName=Sean&lastName=Huang&email=&comments=&isFriendly=on&favColor=red`

這是預設的行為，但是我們在 React 當然不想這麼做，所以這裡先加個 `event.preventDefault()` 阻止預設行為，然後再呼叫 API 送表單資料給後端。

```jsx
function handleSubmit() {
  event.preventDefault()
  submitToApi(formData)
}
```

## Recap

- Event listeners
- State
- Conditional rendering
- Forms
