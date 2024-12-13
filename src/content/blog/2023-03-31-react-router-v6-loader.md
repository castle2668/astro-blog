---
title: 'React Router V6 - Fetch data with Loader'
excerpt: '上一篇介紹了 React Router V6 的基本架構，包含導頁、動態路由與巢狀路由，本文則會介紹 V6 全新的重要功能 Loader。'
tags: ['react', 'reactrouter']
date: 2023-03-31
author: 'Sean Huang'
image: 'react.jpg'
slug: 2023-03-31-react-router-v6-loader
---

## New Feature - Loader

「進入畫面後，需要 Call API 取得初始資料！」這個需求應該不陌生吧？許多頁面都有這個動作，例如：一進到商品頁，先取得商品資料。

這麼做並沒錯，但是這在使用者體驗 (UX) 上比較差，因爲當 User 進入頁面時，畫面或許還沒渲染完成。針對這一點，React Router V6 提供了 `loader` 這項功能，讓資料可以透過路由系統先行處理，在渲染前預先 Loading Data。

## 使用 Loader 與 useLoaderData 獲取資料

要透過路由系統取得資料，首先我們要在路由中定義 `loader` 這個參數，其值需要是一個函式，並且預期會回傳資料，讓我們能夠在元件中取用這份資料。

範例：我們使用 `loader` 與 Async/Await 去呼叫 API，雖然這會回傳一個 Promise，但是 React Router 會確保 API 資料已經回傳，讓我們能夠在元件中取得 `resData.events` 的資料。

```jsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: 'events',
        element: <EventRootLayout />,
        children: [
          {
            index: true,
            element: <Events />,
            loader: async () => {
              const response = await fetch('http://localhost:8080/events')
              if (!response.ok) {
                // Handle Error...
              } else {
                const resData = await response.json()
                return resData.events
              }
            },
          },
        ],
      },
    ],
  },
])
```

回傳成功後，我們就可以在元件裡面透過 `useLoaderData` 取得資料了。

範例中，我們透過 `useLoaderData` 取得 Events 的相關資料。

```jsx
const EventsPage = () => {
  const events = useLoaderData()

  return <EventsList events={events} />
}

export default EventsPage
```

不過，如果我們在 `App.js` 這種定義路由的檔案中撰寫 `loader` 的函式，這個檔案會變得很大一包，所以建議的做法還是將 Loader 寫在 Page Component 裡面再 `export` 到路由檔案去做定義喔。

例如：我們將 Loader 寫在 Page-Level 元件中。

```jsx
export default EventsPage

export const loader = async () => {
  const response = await fetch('http://localhost:8080/events')
  if (!response.ok) {
    // Handle Error...
  } else {
    const resData = await response.json()
    return resData.events
  }
}
```

定義好 Loader 後，將元件裡面定義的 `loader` 通過 `import` 引入進來，並且可以使用 alias 定義不同頁面元件所使用的 Loader 名稱，常見的命名方式為 `Events` 頁面就叫做 `eventsLoader`。

```jsx
import Events, { loader as eventsLoader } from './pages/Events'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      ,
      {
        path: 'events',
        element: <EventRootLayout />,
        children: [
          {
            index: true,
            element: <Events />,
            loader: eventsLoader,
          },
        ],
      },
    ],
  },
])
```

最後一樣就可以在元件裡面透過 `useLoaderData` 取用資料啦！

## Behind The Scenes: When Are loader() Functions Executed

如果你的 API 回傳時間較長，或是刻意讓 API 延遲回傳，就可以發現 Router 的跳轉，其實是等到 `loader` 取得資料後才執行。

這個機制的優點是能夠確保你已經取得資料，接著才去渲染畫面。

但缺點是，使用者在切換路由時可能會出現延遲，搞不好還會因此以為網頁壞掉了！？

關於這個問題，我們可以透過 `useNavigation` 的 `state` 去判斷該路由的狀態，藉由這個狀態動態地加上 Loading 樣式。

> 注意：`useNavigation` 是用來取得路由狀態等資訊，而上一篇提到的 `useNavigate` 則是用來執行程式化導頁等動作。

```jsx
const RootLayout = () => {
  const navigation = useNavigation()

  return (
    <>
      <MainNavigation />
      <main>
        {navigation.state === 'loading' && <p>Loading...</p>}
        <Outlet />
      </main>
    </>
  )
}
```

另外，Loader 是在 Browser 環境中執行，而非在 Server 環境中執行。

但是，雖然 Loader 是在 Browser 中執行，但是 Loader 裡面還是「不能」使用像 `useState` 與 `useParams` 等 React Hooks 喔。

## Throw Responses and Catch Errors with useRouteError

在上一篇 Setup Routes 的文章裡，我們使用 `errorElement` 來指定當路由導向發生錯誤時，應該渲染的頁面或元件，而這個 Error 頁面除了用在處理錯誤的路由，同樣也能用來處理錯誤的 API 回應。

範例：我們在父路由（也就是最外層）設置錯誤頁面，預計在這一層處理 API 的錯誤回應。

```jsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Error />, // catch any errors
    children: [
      { index: true, element: <Home /> },
      {
        path: 'events',
        element: <EventRootLayout />,
        children: [
          {
            index: true,
            element: <Events />,
            loader: eventsLoader,
          },
        ],
      },
    ],
  },
])
```

> 根據需求，你也可以在父子路由個別設置 `errorElement`，如果子路由沒有設置，那麼子路由出現的 Error 就會 Bubble Up 到父路由。

接下來我們用 `throw new Response()` 的方式拋出錯誤，這是一個近期比較推薦的做法，因為這樣可以讓前端依照不同的 `status` 顯示不同的資訊給使用者。

```jsx
const EventsPage = () => {
  const data = useLoaderData()
  const events = data.events

  return <EventsList events={events} />
}

export default EventsPage

export const loader = async () => {
  const response = await fetch('http://localhost:8080/events')
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not fetch events' }), {
      status: 500,
    })
  } else {
    return response
  }
}
```

定義好錯誤訊息後，我們透過 React Router V6 提供的 `useRouteError` 去取得錯誤訊息。

當我們是 Throw Responses 的時候，`useRouteError` 能透過 `JSON.parse(error.data)` 去取得回傳資料，以及透過 `error.status` 取得不同的狀態。

```jsx
// Error.js

const Error = () => {
  const error = useRouteError()

  let title = 'Oops!'
  let message = 'Sorry, an unexpected error has occurred.'

  // API Error
  if (error.status === 500) {
    message = JSON.parse(error.data).message
  }

  // Path Error
  if (error.status === 404) {
    title = 'Not Found!'
    message = 'Could not find resource or page.'
  }

  return (
    <PageContent title={title}>
      <p>{message}</p>
    </PageContent>
  )
}
```

> 如果你是回傳一般物件，像是 `return { message: "error" }`，那麼這個 `error` 就會是那個物件本身了。

## The Utility Function: json()

看到上面這個做法（回傳 Responses）是不是覺得有點麻煩呢？雖然遵循這個方式可以定義不同的錯誤狀態，以給予更好的使用者體驗，但是這也讓 Code 變得複雜許多。

或許是因為 React Router V6 團隊也覺得很繁瑣？所以他們準備了一個 Utility Function 叫做 `json()` 讓我們使用！剛剛上面那一大串 new Response 可以改成以下寫法。

```jsx
// Events.js

export const loader = async () => {
  const response = await fetch('http://localhost:8080/events22')
  if (!response.ok) {
    // throw new Response(JSON.stringify({ message: "Could not fetch events" }), {
    //   status: 500,
    // });
    throw json({ message: 'Could not fetch events' }, { status: 500 })
  } else {
    return response
  }
}
```

與此同時，你用 `useRouteError` 取得 `error.data` 後也不需要再做 `JSON.parse()` 了。

```jsx
// Error.js

if (error.status === 500) {
  // message = JSON.parse(error.data).message;
  message = error.data.message
}
```

可喜可賀 🍻

## 使用 loader() 的參數

`loader` 自帶兩個參數 `request` 與 `params`：

- `request` 為一個 [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) 的 Standard Web Object，可以存取像是 URL 等資訊
- `params` 為 Route Parameters，也就是動態路由冒號後面的 Segments

例如：位於 `/events/:eventId` 頁面時，`loader()` 可以透過 `params.eventId` 取得動態路由的片段，進而取得活動的詳細資料。

```jsx
// EventDetail.js

export const loader = async ({ request, params }) => {
  const id = params.eventId
  const response = await fetch(`http://localhost:8080/events/${id}`)
  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for the selected event' },
      {
        status: 500,
      }
    )
  } else {
    return response
  }
}
```

## 通過 useRouteLoaderData() 在子路由之間分享 Loader

如果當前路由需要的 Loader 已經在其他路由定義過，我們不需要再重複撰寫，可以直接經由 `useRouteLoaderData()` Hook 取得這份 Loader。

`useRouteLoaderData()` 能夠讓同一個路由樹的子路由共享 Loader，換句話說，想要分享同一份 Loader 時必須是子路由。

為了達到這一點，我們可以新增一層父路由，但是不給予 `element` 只定義 `loader`，並且賦予一個 `id`，這樣裡面的子路由就能透過 `useRouteLoaderData(id)` 取得共享的資料囉。

範例：當 EditEvent 頁面也需要使用 EventDetail 頁面的 Loader 時，首先我們要重新配置路由，將 EventDetail 的 Loader 提出來作為父路由，再把兩個頁面都放在這個父路由底下。

```jsx
const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: 'events',
        element: <EventRootLayout />,
        children: [
          {
            path: ':eventId',
            id: 'event-detail', // 記得加上 ID
            loader: eventDetailLoader, // 共用的 Loader
            children: [
              {
                index: true,
                element: <EventDetail />,
              },
              { path: 'edit', element: <EditEvent /> },
            ],
          },
        ],
      },
    ],
  },
])
```

設定好 RouteLoader 後，進入 EventDetail 頁面將原本的 `useLoaderData` 改為使用 `useRouteLoaderData`。

同樣的，EditEvent 頁面也要使用 `useRouteLoaderData("event-detail")` 來取得 RouteLoader 的資料。

```jsx
// EventDetail.js
const EventDetail = () => {
  const data = useRouteLoaderData('event-detail')

  return <EventItem event={data.event} />
}

// EditEvent.js
const EditEvent = () => {
  const data = useRouteLoaderData('event-detail')

  return (
    <>
      <h1>EditEvent</h1>
      <EventForm event={data.event} />
    </>
  )
}
```

> 注意：`useRouteLoaderData` 必須接收 Routes ID 這一個參數才能運作喔。

## 回顧

看完這篇文章，我們認識了 React Router V6 新增的 Loader 功能，瞭解如何使用 Loader 幫助我們建立更完整的路由系統。

下一篇文章會介紹另一個全新功能 Action 的用法，它可以幫助我們更全面地處理表單送出與驗證等功能。

## References

- [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)
