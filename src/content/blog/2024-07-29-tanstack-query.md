---
title: '使用 TanStack Query 輕鬆處理 HTTP Requests'
excerpt: 'TanStack Query 可以幫助我們發送 HTTP Request 也就是串接 API，讓前端畫面與後端資料能夠溝通與同步。沒錯！這些事情透過 useEffect 以及 Fetch 或 Axios 就能做到了，只是 TanStack Query 大幅地簡化了這方面的 Code，一起來看看 TanStack Query 如何提升開發者體驗吧。'
tags: ['react', 'tanstackquery']
date: 2024-07-29
author: 'Sean Huang'
image: 'react.jpg'
slug: 2024-07-29-tanstack-query
---

## 什麼是 TanStack Query

在專案中，我們可以撰寫一個 `useHttp` 的 Custom Hook，來幫助自己複用 Try & Catch Error 與 Loading 等等操作，不過儘管我們花時間處理，仍會有些漏網之魚的功能或者小錯誤，而這些網路請求的處理全部都已經包裝在 TanStack Query 裡面，這大幅提升了 Developer Experience (DX)，讓身為開發者的我們生活得更加 Chill~

除此之外，TanStack Query 也包含了許多咱們 Developer 親自實作會相當複雜而且花時間的功能，例如：緩存功能 (Caching)。當使用者透過 Router 切換至新的畫面後，使用者返回前一個畫面可以不用再次獲取所有的資料，而是先使用 Web 記憶體中的儲存的資料，並且在背後撈取 API 再更新資料，這一切都已經由 TanStack Query 幫我們處理好了。

這麼香的東西，不裝嗎 d(`･∀･)b

## 安裝套件與配置 QueryClient

> [Installation | TanStack Query React Docs](https://tanstack.com/query/latest/docs/framework/react/installation)

```bash
npm i @tanstack/react-query
```

安裝完成後，我們只需要再做兩個步驟，就能完成 TanStack Query 的設定並解鎖所有功能了。

首先是透過 `QueryClient` 建立一個新的 Client 的實例 (Instance)，接著在要使用 TanStack Query 的元素外層包上 `<QueryClientProvider>`，通常會在 `<App>` 裡面包裝。

```jsx
import {
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}
```

## useQuery Hook

首先介紹 TanStack Query 的 `useQuery` Hook，它會回傳該 Request 的 Data、Loading 與 Error 等資訊。

### useQuery 的參數

- `queryKey`：在陣列中放入一個 Key（不一定是字串，也可以是物件），Key 是用來記錄與辨識這個 HTTP Request 是哪個 API 請求的，由於 API 回傳結果會被 Cached，如果發送的是重複的 API Request 就會先使用過去儲存的回應結果
- `queryFn`：放上一個 Promise 函式，像是使用 Fetch API 或者 Axios 撈取資料的函式
- `staleTime`：同一個 Request 需要間隔的時間，預設為 0（例如：設定為 5000 就是在 5 秒內重複呼叫的話，第二次 API 不會被執行）
- `gcTime`：Garbage Collection Time，也就是緩存內容存留的時間，預設為 5 分鐘（例如：設定為 30000 就是半分鐘，也就是 30 秒後緩存的資料就會被丟棄）
- `enabled`：為 API 查詢加上條件判斷，例如：`searchTerm !== undefined` 得到 `true` 代表可以執行 API 呼叫，反之如果 `searchTerm` 為 `undefined` 的時候就會禁止使用這個 Query

### useQuery 的回傳結果

> 可使用解構方式提取值

- `data`：API 的回傳資料，一開始會回傳 Cached 的資料，等到 API 真正撈取後會在背景裡更新為新資料
- `isPending`：Request 是否還在進行中，是否已經取得了 Response 資料
- `isLoading`：與 `isPending` 類似，差異在於當此 Query 為 Disabled 狀態時，`isLoading` 會是 `false`，而 `isPending` 仍為 `true`
- `isError`：Response 是否有錯誤
- `error`：錯誤訊息

範例：

```jsx
import { useQuery } from '@tanstack/react-query'

function Example() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['exampleData'],
    queryFn: async () => {
      const response = await fetch(
        'https://api.github.com/repos/TanStack/query'
      )
      return await response.json()
    },
  })

  if (isLoading) return 'Loading...'

  if (isError) return 'An error has occurred: ' + error.message

  return (
    <div>
      <h1>{data.full_name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  )
}

export default Example
```

### 如何為 queryFn 帶上參數

在 `queryFn` 中，其實 TanStack Query 為它默認自帶一個物件的參數，你可以從中拿到一些資訊，例如： `signal`，它可以用在 Fetch 或 Axios 上面，透過 `await axios(url, { signal: signal })` 等方式給予當下是否中止 API 呼叫的訊號。

如果想要給 `queryFn` 的函式傳參數，必須在函式帶上「具名」的參數，除了原有的 `signal` 以外，再加上自己要做為參數傳遞的內容，例如： `searchTerm`，透過 searchTerm 我們就可以為 API 呼叫帶上參數了。

```jsx
const { data, isPending, isError, error } = useQuery({
  queryKey: ['exampleData', { search: searchTerm }],
  queryFn: ({ signal }) => fetchData({ signal, searchTerm }),
})
```

## useMutation Hook

剛才介紹的 `useQuery` 是在取得資料，當我們想要做的是更新資料的操作就可以使用 `useMutation` Hook。

### useMutation 的參數

- `mutationFn`：跟 `queryFn` 不同，就算需要傳參數 `mutationFn` 也不用透過匿名函式進行包裝
- `onSuccess`：放一個匿名函式，在成功後執行裡面的動作

### useMutation 的回傳結果

- 一樣有 `isPending`、`isError`、`error` 等資料可以使用
- `mutate`：我們會用這個屬性來實際發送請求

範例：

```jsx
import { useNavigate } from 'react-router-dom'
// 引入 useMutation Hook
import { useMutation } from '@tanstack/react-query'

function NewEvent() {
  const navigate = useNavigate()

  // 使用 useMutation Hook
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent,
    onSuccess: () => {
      navigate('/home')
    },
  })

  // 將資料傳送給後端
  function handleSubmit(formData) {
    mutate({ event: formData }) // 這個 { event: formData } 參數是依照 API 要求的 Payload 格式
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>New Event</h1>
        {isPending && <p>Submitting...</p>}
        {!isPending && (
          <>
            <button type="button">Cancel</button>
            <button type="submit">Create</button>
          </>
        )}
        {isError && <p>Failed to create event.</p>}
      </form>
    </>
  )
}

export default Example
```

### QueryClient - Invalidate Queries

當在執行 `useMutation` 的 `onSuccess` 時，我們還可以透過 `queryClient.invalidateQueries()` 幫助我們告訴特定 `queryKey` 的 `useQuery` 它獲取的 `data` 已經是過時的，以要求它馬上進行更新。

```jsx
const { mutate, isPending, isError, error } = useMutation({
  mutationFn: createNewEvent,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['exampleData'] })
    navigate('/home')
  },
})
```

### Optimistic Updating - onMutate + onError + onSettled

到這邊，我們已經可以透過執行 `mutate` 去更新資料，並且在完成後透過 `onSuccess` 再次更新畫面，在這個過程中我們通常會加上一個 Loading 效果以等待所有操作完成。然而，在 UX 上我們還有一個更好的做法，那就是 Optimistic Updating。

簡單來說，就是在 API 資料回傳前，先本地更新畫面，讓使用者更快地看見更新結果，API 則在背景中運行。

在 TanStack Query 中，`onMutate` 就是指開始更新資料，但是尚未完成的時間點。因此，我們製作 Optimistic Updating 的方式，就是在 `onMutate` 時透過 `queryClient.setQueryData()` 去手動更新已緩存的 Query 資料。

另外，這邊還會先使用 `queryClient.cancelQueries()` 確保取消關於該 Key 的 `useQuery` 動作，再去進行 Optimistic Updating。

```jsx
const { mutate, isPending, isError, error } = useMutation({
  mutationFn: updateEventData,
  onMutate: async data => {
    const newEvent = data.event
    await queryClient.cancelQueries({ queryKey: ['events', params.id] }) // 先確保取消所有此 Key 的查詢
    queryClient.setQueryData(['events', params.id], newEvent) // 手動更新此 Key 的緩存
  },
})
```

更完整一點的寫法，我們還可以在 `onMutate` 中透過 `queryClient.getQueryData()`取得緩存中的前一個結果並且放在 `return`中回傳，這個回傳資料可以在 `onError` 的 `context` 中拿到，我們可以把這個東西用來當作錯誤情況的退路。

最後的最後，我們在 `onSettled` 再加上 `invalidateQueries`，這麼做的用意，就是告訴 TanStack Query 不管我樂觀更新是成功或是失敗，都要再次重新查詢一次，確保後端資料庫的內容與前端畫面是一致的。

```jsx
const { mutate, isPending, isError, error } = useMutation({
  mutationFn: updateEventData,
  onMutate: async data => {
    const newEvent = data.event

    await queryClient.cancelQueries({ queryKey: ['events', params.id] })
    const previousEvent = queryClient.getQueryData() // 更新前的資料

    queryClient.setQueryData(['events', params.id], newEvent)

    return { previousEvent } // 簡潔寫法
  },
  onError: (error, data, context) => {
    queryClient.setQueryData(['events', params.id], context.previousEvent) // 錯誤處理
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['events', params.id] })
  },
})
```
