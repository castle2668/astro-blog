---
title: 'React Router V6 - Form & Action'
excerpt: '上一篇介紹了 React Router V6 的 Loader，本文會介紹另一個重要的新功能 Action 與表單處理方式。'
tags: ['react', 'reactrouter']
date: 2023-04-14
author: 'Sean Huang'
image: 'react.jpg'
slug: 2023-04-14-react-router-v6-action
---

## Use action() to Send Form Data

在 React 中，如果要提交表單，我們通常不會採取原生的提交方式，而是利用 State 去管理表單資料，並建立 Function 去串接 API 以送出表單，可能還會加上 Loading 效果、處理 Error 與 Redirect 等等。

React Router V6 提供的 `<Form>` 元件會阻止原生的表單行為，路由會在表單送出後執行 `action` 的內容，以下是一個簡單的範例。

```jsx
import { Form } from 'react-router-dom'

const EventForm = () => {
  return (
    <Form method="post">
      <label htmlFor="title">Title</label>
      <input id="title" type="text" name="title" />
    </Form>
  )
}

export default EventForm
```

在使用 React Router 的 `<Form>` 時，記得要為 Form Elements 加上 `name` 這個屬性，方便後續取得該欄位的值。

接著，我們建立 `action` 來做送出表單的行為，Action 與 Loader 一樣都有 `request` 與 `params` 這兩個參數。

我們可以使用 `request` 提供的 `formData()` 方法，取得使用者提交的表單資料，再透過原生 FormData 提供的 `get(name)` 方法，就能取得對應 `name` 屬性的 `value` 囉。

```jsx
export const action = async ({ request, params }) => {
  const data = await request.formData()

  const eventData = {
    title: data.get('title'), // get("title") 對應到 name＝"title" 的 input
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  }

  const response = await fetch('http://localhost:8080/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  })

  if (!response.ok) {
    throw json({ message: 'Could not send event' }, { status: 500 })
  }

  return redirect('/events')
}
```

最後我們使用了 React Router 提供的 `redirect()` 函式來進行重新導頁。

當判斷已成功取得回應時，我們傳入目標路由作為該函式的參數，例如：執行 `return redirect("/events")` 讓 Router 導回活動列表頁面。

## 使用 useSubmit 程式化提交表單

結合 `react-router-dom` 提供的 `useSubmit` Hook 以及 `action()` 函式，我們也可以不使用 `<Form>` 元件，直接以程式化的方式去執行表單的送出與後續處理。

以下範例中，我們希望用程式化的方式執行刪除功能，而非透過送出表單的方式執行。

首先，將刪除按鈕綁上 `startDeleteHandler` 函式，這個函式會在執行後出現 Confirm 提示，一旦確認後就會執行 `useSubmit` Hook 的功能。

接著執行的 `submit()` 函式可以放入兩個參數，第一個參數是 FormData 的物件，第二個參數是 Form 表單元素的 Properties。

```jsx
import { useSubmit } from 'react-router-dom'

const EventItem = ({ event }) => {
  const submit = useSubmit()

  const startDeleteHandler = () => {
    const proceed = window.confirm('Are you sure you want to delete')

    if (proceed) {
      // params: FormData Object, Form Properties
      submit(null, { method: 'delete' })
    }
  }

  return (
    <article>
      {/* ... */}
      <button onClick={startDeleteHandler}>Delete</button>
    </article>
  )
}

export default EventItem
```

使用 `useSubmit` 就跟送出表單一樣，都會去觸發路由裡面定義的 `action()`，所以我們要在負責執行刪除行為的元件中定義 `action()` 的內容。

當 `useSubmit` 觸發時，路由會執行 `action()` 去呼叫執行刪除動作的 API，並且 `useSubmit` 所定義的參數也會傳入 `request` 當中。

例如：撰寫 `fetch()` 的 `method` 時，可以使用傳入的 `request.method`。

```jsx
export const action = async ({ request, params }) => {
  const eventId = params.eventId

  const response = await fetch(`http://localhost:8080/events/${eventId}`, {
    method: request.method, // submit(null, { method: "delete" });
  })

  if (!response.ok) {
    throw json({ message: 'Could not delete event' }, { status: 500 })
  }

  return redirect('/events')
}
```

這樣就能順利以程式化的方式執行刪除動作囉！

## 回顧

看完這篇文章，我們認識了 React Router V6 新增的 Action 與 Form 元件。

除此之外還有許多實用的功能，建議可以看看他們的官方文件，這次更新後文件整理得很不錯。

## References

- [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)
