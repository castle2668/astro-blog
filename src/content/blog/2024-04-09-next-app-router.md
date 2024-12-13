---
title: 'Next.js v12 到 v14 版本升級紀錄！有何不同？'
excerpt: '專案一直以來都是使用 Next 12 以及 Pages Router 進行開發，不久前 Next 發表了 v14，其中 v13 與 v14 都陸續新增了一些概念，最重要的就是 App Router 成為默認的架構方式，而近期 App Router 的功能已經大致完善，因此打算試用看看。族繁不及備載，本篇文章只有記載本身學習與使用 Next 14 的體驗，以及瞭解到的幾項改變。'
tags: ['nextjs', 'approuter', 'reactservercomponents']
date: 2024-04-09
author: 'Sean Huang'
image: 'nextjs.png'
slug: 2024-04-09-next-app-router
---

## Next Project Structure

### Pages

首先，我最喜歡的 Next.js Feature 也就是 File-System Based Router 在這次升級後活得好好的，不過運作方式有一些不同。

在 App Router 下，被命名為 `page.js` 的檔案才會被視為一個路由頁面的元件。

```jsx
app
├─ about
│   └─ page.js // our-domain.com/about
├─ blog
│   └─ page.js // our-domain.com/blog
├─ [slug]
│   └─ page.js // our-domain.com/anything-else
└─ page.js     // our-domain.com/
```

> 上述範例中，Dynamic Route 優先級較低，而擁有具體命名的路由優先級比較高，所以並不會產生衝突。

### Favicon

Next 14 提供了一項便利的設定，就是在 `/app` 這一層當中，被命名為 `icon` 的圖片檔案會直接被視為該網站的 Favicon。

除此之外還有更多的 File Conventions，像是創建對應名字的元件，默認就會被拿去做相對應的功能，例如 [error](https://nextjs.org/docs/app/api-reference/file-conventions/error#error) 與 [not-found](https://nextjs.org/docs/app/api-reference/file-conventions/error#not-foundjs) 等頁面。

### Root Layout (Required)

現在的路由資料夾 `/app` 底下「一定」要有一個 Layout，這在 App Router 版本是必要的。而內層的嵌套路由如果也新增 Layout，Root Layout 跟內層 Layout 兩個會同時作用。

除此之外，在寫法上 Root Layout 必須要包含 `<html>` 與 `<body>` 這兩個標籤。

```jsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        <main>{children}</main>
      </body>
    </html>
  )
}
```

### Folder Structure

在 Next 14 中，專案資料夾結構的組成可以有許多種，官方文章 [Project Organization and File Colocation](https://nextjs.org/docs/app/building-your-application/routing/colocation) 裡面也有列出所有的架構方式，可以詳細查閱。

對我而言，我自己偏好將 `components` 資料夾獨立於 `app` 之外，也就是在 Root 底下同層有 `app` 與 `components` ，因為我希望 `app` 這個資料夾就是專門在處理「路由」相關的任務，不處理其它元件。

```jsx
project
├─ app
│   ├─ blog
│   │   └─ page.js
│   └─ page.js
└─ components
    └─ ...
```

關於這個架構方式，在官方文檔裡的 [Store project files outside of app](https://nextjs.org/docs/app/building-your-application/routing/colocation#store-project-files-outside-of-app) 也有描述到，不過選擇哪種架構方式都可以，這只是個人喜好而已。

## React Server Components (RSC)

### Why RSC

- 透過 CRA 或 Vite 所建構的普通 React App，所使用的是 Client Components，這些程式碼是在 Client Side 執行
- 透過 Next.js 所建構的 Next App，會預設所有的 React Components 都是 RSCs，這些程式碼是在 Server Side 執行

在 Next.js 裡面，你的元件其實是在 Server Side 先處理完 JSX 程式碼後，再將 HTML Code 返回給 Client Side 去做呈現的。

舉例來說，你可以直接在 Function Components 裡面執行 `console.log`，這段 Log 會出現在 Backend Terminal，而非前台瀏覽器的主控台。

那麼...這麼做有什麼好處嗎？

![Sponge Bob](https://media3.giphy.com/media/myPdoRAlad0J2/giphy.gif?cid=7941fdc6b880zac1akf55nd3ois460wv36exkryo6xkkxzhm&ep=v1_gifs_search&rid=giphy.gif&ct=g)

還真的有！

通過 RSC 的方式，客戶端需要下載的 JavaScript 就會減少，因此可以提高網站的性能。

同時，RSC 也更適合搜尋引擎優化 (SEO)，因為爬蟲可以看到完整的頁面內容，相較於 CRA 建立出來的 APP，Next.js 專案的 Source Code 不再是空頁面了。

### Use Client

雖然 RSC 很不錯，但是預設 RSC 會讓我們無法使用 Client Side 的一些功能來製作元件，像是 React 的 `useState` Hook、Next.js 的 `usePathname` Hook，或者 Event Handler `useEffect`...等等，這個時候只要在元件頂部加上 `'use client'` 就可以了！

在使用 `'use client'` 時可以盡量用在最小的元件上，例如：大元件中只有一小部分需要借助 Client Side 的功能的話，就可以抽離出來製造成小元件，只為小元件指定 `'use client'` 在客戶端運行，而不是讓整個大元件都失去 RSC 的優勢。

### Async Server Components

除此之外，RSC 還可以加上 `async`，它會回傳一個 Promise，渲染時 RSC 會等到 Promise 解析完畢才將 HTML 內容送回瀏覽器。

```jsx
export default async function AsyncPage() {
  const data = await getData()

  return (
    <div>
      <h1>Async Page</h1>
      <DataGrid data={data} />
    </div>
  )
}
```

### 透過 Suspense 製作 Loading 效果

Suspense 是 React 提供的元件，我們可以用它包住剛剛的 Async RSC，這樣 Async RSC 在完成渲染之前，就會先顯示 `fallback` 所傳入的 UI 內容，用以替代載入完成前的畫面。

```jsx
export default async function AsyncPage() {
  const data = await getData()

  return (
    <div>
      <h1>Async Page</h1>
      <Suspense fallback={<p>Fetching Data...</p>}>
        <DataGrid data={data} />
      </Suspense>
    </div>
  )
}
```

### Server Actions (Use Server)

我們看過 `'use client'` 可以將元件限制為 Client Side，那麼其實也有另一個 `'use server'` ，這是用於將 Function 限制在 Server Side 時運行。

需要特別注意，如果當前的元件已經透過 `'use client'` 指定為 Client Side，則同個元件檔案內的 Function 就不能再被指定為 `'use server'` ，這會導致 Next.js 無法進行判斷。

解決方法是新建一個檔案，在頂部指定 `'use server'`，這樣這個檔案中的所有函式就都會是 Server Actions，這時候再從 Client Side 的 Component 匯入這個 Server Action 就不會出現錯誤哩。

> 貼心提醒：如果你要使用 Server Action 將表單資料儲存在 Local 的話（像是透過 [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) 這種輕量的 SQL 資料庫套件），建議你再多安裝 [xss](https://github.com/leizongmin/js-xss) 這個套件，讓它先幫你刪除任何有害的內容後，再去將資料存到本地的資料庫。
