---
title: 'Next.js 預先渲染頁面與資料取得方式'
excerpt: 'Next.js 除了可以用來做 SSR 之外，其實也可以取代原本的 React 做 SPA，或是取代 Gridsome 做 SSG 靜態網站，也可以根據需求混合生成頁面，稱為 ISG，第一次聽到這麼多種，腦子差點打結了 XD'
tags: ['nextjs', 'pagesrouter']
date: 2023-07-15
author: 'Sean Huang'
image: 'nextjs.png'
slug: 2023-07-15-next-pre-rendering-data-fetching
---

Next.js pre-renders all the pages by default.

Next.js pre-renders all pages that have no dynamic data.

## Static Generation

- props 🆕

Static Generation with "getStaticProps" (only works in `pages` folder)

```jsx
export default function Page({ repo }) {
  return repo.stargazers_count
}

export async function getStaticProps() {
  const res = await fetch('<https://api.github.com/repos/vercel/next.js>')
  const repo = await res.json()
  return { props: { repo } }
}
```

## Incremental Static Generation

- props
- revalidate 🆕

會自動重新生成頁面，可以設定最多每 X 秒請求一次重新生成。 (`revalidate`)

例如：當你重新整理頁面，Server 會重新構建該頁面。然而，如果你在 600 秒內連續刷新 10 次，Next.js 只會構建 1 次而不是 10 次。

```jsx
export default function Page({ repo }) {
  return repo.stargazers_count
}

export async function getStaticProps() {
  console.log('(Re-)Generating...')
  const res = await fetch('<https://api.github.com/repos/vercel/next.js>')
  const repo = await res.json()

  return {
    props: {
      repo,
    },
    revalidate: 600, // Re-generate every 10 minutes
  }
}
```

## getStaticProps Configuration Options

- props
- revalidate
- notFound 🆕
- redirect 🆕
- context 🆕

如果 `notFound` 為 true，Next.js 將渲染 404 頁面。

```jsx
export default function Page({ repo }) {
  return repo.stargazers_count
}

export async function getStaticProps() {
  console.log('(Re-)Generating...')
  const res = await fetch('<https://api.github.com/repos/vercel/next.js>')
  const repo = await res.json()

  // If we have no data, maybe we want to show the NotFound page
  if (repo.length === 0) {
    return {
      notFound: true,
    }
  }

  // If we have at least one data, we return the regular page
  return {
    props: {
      repo,
    },
    revalidate: 600,
  }
}
```

The `redirect` key is set to an object, you can set a `destination` to a route.

```jsx
export default function Page({ repo }) {
  return repo.stargazers_count
}

export async function getStaticProps() {
  console.log('(Re-)Generating...')
  const res = await fetch('<https://api.github.com/repos/vercel/next.js>')
  const repo = await res.json()

  // If you failed to fetch data, maybe you want to redirect
  if (!repo) {
    return {
      redirect: {
        destination: '/no-data',
      },
    }
  }

  if (repo.length === 0) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      repo,
    },
    revalidate: 600,
  }
}
```

“getStaticProps” has an argument `context` with some extra information about this page.

```jsx
// /pages/[uid].js

function UserIdPage(props) {
  return <h1>{props.id}</h1>
}

export default UserIdPage

export async function getServerSideProps(context) {
  const { params } = context

  const userId = params.uid

  return {
    props: {
      id: 'userid-' + userId,
    },
  }
}
```

## getStaticPaths

- paths 🆕
- fallback 🆕

如果一個頁面是「動態路由」並使用 `getStaticProps`，它「必須」定義一個要被 Next.js 靜態生成的路徑列表。

當你從使用動態路由的頁面中導出一個名為 `getStaticPaths` 的函式（Static Site Generation），Next.js 會預先生成被 `getStaticPaths` 指定的所有路徑。

規範需返回的 `paths` 要是一個物件陣列，值應該是 `[{ params: <slug>: <id> }]`。

以下範例是使用 `getStaticPaths` 與設定成 `fallback: false` 時的效果，它會預先生成所有頁面。

```jsx
// /pages/[pid].js

export async function getStaticPaths() {
  const data = await getData()

  const ids = data.products.map(product => product.id)
  const pathsWithParams = ids.map(id => ({ params: { pid: id } }))

  return {
    // paths: [
    //   { params: { pid: "p1" } },
    //   { params: { pid: "p2" } },
    //   { params: { pid: "p3" } },
    // ],
    paths: pathsWithParams,
    fallback: false,
  }
}
```

> 💡 另外，Next.js 還會自動做 Link Prefetching，你會發現在 Network 中預先呼叫了 p1, p2, p3.json 等檔案。我們都還沒進入這些頁面，Next.js 就先幫我們準備好這些頁面了，這讓頁面操作更順暢。

另一個用法是 `fallback: true`，它預先生成一些頁面，但仍然在需要時才實時生成其他頁面。

這讓我們可以預先生成那些時常被瀏覽的頁面，並針對不太頻繁訪問的頁面延遲生成，只在需要用到時才開始進行預先生成。

但是，在使用 `fallback: true` 功能時，你需要在元件中準備好「Fallback 狀態」。

因為有些頁面是在需要時才初次載入，所以需要像是 Loading 等呈現方式，以便等待 Next.js 初次載入頁面，載入完成後 Next.js 會自動更新這個頁面並且返回內容。

```jsx
function ProductDetailPage(props) {
  const { loadedProduct } = props

  // prepare the fallback state
  if (!loadedProduct) {
    return <p>Loading...</p>
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  )
}

async function getData() {
  // ...
  return data
}

export async function getStaticProps(context) {
  // ...
  return {
    props: {
      loadedProduct: product,
    },
  }
}

export async function getStaticPaths() {
  const data = await getData()

  const ids = data.products.map(product => product.id)
  const pathsWithParams = ids.map(id => ({ params: { pid: id } }))

  return {
    paths: pathsWithParams,
    fallback: true,
  }
}

export default ProductDetailPage
```

第三種選項是 `fallback: "blocking"`。

Next.js 會等待這個頁面在 Server 上完全預先生成完畢，然後再提供該頁面。

使用者會在等待畫面返回的過程中，需要多等待一段時間，但是返回的內容將會是完整的（也因此無需準備 Fallback 狀態）。

```jsx
export async function getStaticPaths() {
  const data = await getData()

  const ids = data.products.map(product => product.id)
  const pathsWithParams = ids.map(id => ({ params: { pid: id } }))

  return {
    paths: pathsWithParams,
    fallback: 'blocking',
  }
}
```

## getServerSideProps

- props
- notFound
- context

"getServerSideProps" is a Next.js function that enables server-side rendering (SSR) for a page. When a page is requested, the server-side code is executed and the page is rendered on the server before being sent to the client.

```jsx
export default function Page(props) {
  if (props.hasError) {
    return <div>Invalid data</div>
  }

  return <div>{props.data}</div>
}

export async function getServerSideProps(context) {
  const res = await fetch('<https://api.example.com/data>')
  const data = await res.json()

  if (!data) {
    return {
      // notFound: true, // 如果有錯誤，可以導向 NotFound Page
      hasError: true, // 或者使用自定義的 Error State
    }
  }

  return {
    props: {
      data,
    },
  }
}
```

With "getServerSideProps", you can fetch data from an API or perform other server-side operations and pass the fetched data to the page as props. This allows the page to be rendered with the latest data on each request.

Server-side rendering is useful when you have data that frequently changes or when you need to fetch data that is specific to each request.

Note that "getServerSideProps" is not executed at build time like "getStaticProps". Instead, it runs on every request, so it may have a performance impact on the server depending on the complexity of the operations inside the function.

如果你有動態路由像是 `[uid].js`，可以透過 `context.params.uid` 取得動態值。
