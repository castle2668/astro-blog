---
title: '透過 Next.js API Routes 新增後端程式碼，實現 Fullstack React'
excerpt: '其實專案使用 Next.js 的話，可以考慮直接在 Next 專案中的 API Routes 進行後端的開發，只是這次開發公司專案是第一次用，當初並沒有規劃這一塊，所以目前專案完成上線後，沒有安排進行這方面的重構，不過我們還是可以學習一下怎麼在 Next 這個框架中完成全端開發。'
tags: ['nextjs', 'pagesrouter', 'apiroutes']
date: 2024-01-15
author: 'Sean Huang'
image: 'nextjs.png'
slug: 2024-01-15-next-api-routes
---

## 什麼是 API Routes

Next.js API Routes 是 Next.js 框架中用來處理 API 請求的一個特殊目錄，透過 API Routes，我們可以用非常簡單的方式創建 API。

首先。這些 API Routes 的檔案必須位於專案的 `pages/api` 目錄下，Next.js 會將它們視為 API Endpoints 而非 Pages。

此外，這些檔案與程式碼都只會執行在 Server Side，並不會打包到 Client Side 的 Bundle 裡面。就如同 “getStaticProps” 與 “getServerSideProps” 裡面的程式碼一樣，都不會外洩給客戶端的使用者看見內容。

```jsx
// <root>/pages/api/feedback.js

function handler(req, res) {
  res.status(200).json({ message: 'Our First API Route' })
}

export default handler
```

實際上這邊就是在撰寫 Node.js 程式碼，Next.js 把 API Routes 設計得跟 Express.js 很像。

- `req`：Request Object
- `res`：Response Object

接著當你造訪 `http://localhost:3000/api/feedback` 時，你就可以看到我們的 JSON Response。

## 將 SPA 連接到資料庫的問題

在 Web 應用程式中，我們也會需要在資料庫中保存和提取資料，否則我們只能使用瀏覽器存取資料，但是將資料庫連接到 Web 應用程式會有一個嚴重的問題，那就是「安全」。

正所謂在前端的世界豪無隱私，你沒辦法隱藏任何 Client Side 的程式碼，不管你怎麼藏，只要開啟開發工具仔細翻找 Source，你儲存在 Client-Side Code 的機密資訊都是會被找到的。因此，像這種資料庫的登入憑證是不能放在前端的，通常我們會在後端像是 Node.js 來存放與編寫。

有些專案則是使用 Firebase 等服務提供的 SDK，但是這也不是直接與資料庫溝通，而是透過他們提供的 Web API 再去存取 Firebase 資料庫。

不過在 Next.js 的世界，我們可以透過 API Routes 完美地解決以上問題。

## 表單提交範例

這是一個提交表單的範例，透過 React 的 “useRef” 取得表單 Input 與 Email 欄位的值之後，禁止默認的提交行為，改用 JavaScript 自定義後續的表單送出方式。

這邊串接的 API Routes 不用寫 Domain，相對路徑會直接帶上我們目前的 Domain。

我們這裡預期會有兩種 HTTP Method，`POST` 提交表單並返回所有資料，與 `GET` 取得所有資料，所使用的 URL 是同一個，符合 CRUD。

```jsx
import { useRef, useState } from 'react'

function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState([])

  const emailInputRef = useRef()
  const feedbackInputRef = useRef()

  // 送出 JSON 資料提交表單，並返回最新 JSON 資料
  function submitFormHandler(event) {
    event.preventDefault()

    const enteredEmail = emailInputRef.current.value
    const enteredFeedback = feedbackInputRef.current.value

    const reqBody = { email: enteredEmail, text: enteredFeedback }

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => console.log(data))
  }

  // 取得最新 JSON 資料
  function loadFeedbackHandler() {
    fetch('/api/feedback')
      .then(response => response.json())
      .then(data => {
        setFeedbackItems(data.feedback)
      })
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef}></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {feedbackItems.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  )
}

export default HomePage
```

這是我們對應的 API Routes 的 Code，我們會判斷 `req.method` 如果是 `POST` 就將新的 Feedback 寫入檔案，然後將最新的所有資料返回給前端顯示。

```jsx
// <root>/pages/api/feedback.js

import fs from 'fs' // import file system Node.js module
import path from 'path' // import path Node.js module

export function buildFeedbackPath() {
  // process.cwd() returns the current working directory of the Node.js process
  return path.join(process.cwd(), 'data', 'feedback.json')
}

export function extractFeedback(filePath) {
  // readFileSync() reads the entire contents of a file synchronously
  const fileData = fs.readFileSync(filePath)
  // JSON.parse() parses a JSON string, constructing the JavaScript value or object described by the string
  const data = JSON.parse(fileData)
  return data
}

function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body
    const feedbackText = req.body.text

    const newFeedback = {
      id: new Date().toISOString(),
      email,
      text: feedbackText,
    }

    // store that in a database or in a file
    const filePath = buildFeedbackPath()
    const data = extractFeedback(filePath)
    data.push(newFeedback)
    // writeFileSync() writes data to a file, replacing the file if it already exists
    // JSON.stringify() converts a JavaScript object or value to a JSON string
    fs.writeFileSync(filePath, JSON.stringify(data))
    res.status(201).json({ message: 'Success!', feedback: newFeedback })
  } else {
    const filePath = buildFeedbackPath()
    const data = extractFeedback(filePath)
    res.status(200).json({ feedback: data })
  }
}

export default handler
```

當然這些 Node.js 的 Code 也能使用在同為 Server Side 的 Pre-Rendering Page 上面，舉例來說，在 “getStaticProps” 或 “getServerSideProps” 中取得 Feedback 資料。

在 Server Side 不能使用 `fetch` 取得資料，但是我們可以直接使用從 API Routes 使用 `buildFeedbackPath` 與 `extractFeedback` 來取得 Feedback 資料。

```jsx
export async function getStaticProps() {
  const filePath = buildFeedbackPath()
  const data = extractFeedback(filePath)
  return {
    props: {
      feedbackItems: data,
    },
  }
}
```

## 動態 ID 的 API Routes

在 Next.js 我們可以使用 `[slug]` 的方式創建資料夾或檔案，完成前端動態 ID 的路由配置。

同樣地，我們想要取得特定 Feedback ID 的資訊，希望 API 路徑是 `/api/feedback/[feedbackId]` ，這也是可以做到的。

我們是命名為 `[feedbackId].js` ，就可以透過 `req.query.feedbackId` 取得動態的 ID，再進一步篩選出該 ID 的資料並返回。

```jsx
// <root>/pages/api/feedback/[feedbackId].js

import { buildFeedbackPath, extractFeedback } from '.'

function handler(req, res) {
  const feedbackId = req.query.feedbackId
  const filePath = buildFeedbackPath()
  const feedbackData = extractFeedback(filePath)
  const selectedFeedback = feedbackData.find(
    feedback => feedback.id === feedbackId
  )
  res.status(200).json({ feedback: selectedFeedback })
}

export default handler
```

至於在 Feedback 詳細頁等元件中的使用方式，大概就像是以下這樣 👇

```jsx
function loadFeedbackHandler(id) {
  fetch(`/api/feedback/${id}`)
    .then(response => response.json())
    .then(data => {
      setFeedbackData(data.feedback)
    })
}
```

> 💡 Catch-All Routes 也能在這裡使用，總之只要記得，不管是 Pages Router 或是 API Routes 都是愈具體的路由順位愈高（Concrete Routes > Dynamic Routes > Catch-All Routes）

最後，Next.js 的 API Routes 完全可以取代 Node.js Server，你可以使用 Node.js 建構一個完整的 MERN App。
