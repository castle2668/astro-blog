---
title: 'Next.js 15 (App Router) - Rendering'
excerpt: 'Next.js 從 Pages Router 轉換到 App Router 後，資料獲取和渲染策略有了重大改變。本文將詳細解說如何將 Next.js 12 的 CSR、SSG、ISR 和 SSR 模式轉換到 App Router 架構中。'
tags: ['nextjs', 'approuter']
date: 2024-12-13
author: 'Sean Huang'
image: 'nextjs.png'
slug: 2024-12-13-nextjs-app-router-rendering
---

在 Next.js 12 (Pages Router) 中，渲染有以下幾種模式：

1. CSR: 直接寫就是了
2. SSG: 使用 `getStaticProps` + `getStaticPath`
3. ISR: 多設定 `revalidate`
4. SSR: 使用 `getServerSideProps`

那麼到了 Next.js 15 (App Router) 之後，該怎麼做到以上四種渲染方式呢？

## 1. CSR (Client-side Rendering)

在 App Router 中，要實現 CSR，需要使用 `'use client'` 指令：

```tsx
'use client'

import { useState, useEffect } from 'react'

export default function ClientComponent() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data')
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <div>Loading...</div>
  if (!data) return <div>No data</div>

  return <div>{/* 渲染資料 */}</div>
}
```

## 2. SSG (Static Site Generation)

在 App Router 中，默認情況下，所有元件都是 Server Components 且是靜態渲染的。如果需要獲取資料，可以使用：

```tsx
// 靜態資料獲取
async function getData() {
  const res = await fetch('https://api.example.com/data')
  return res.json()
}

export default async function Page() {
  const data = await getData()
  return <div>{/* 渲染資料 */}</div>
}
```

如果是動態路由的 SSG，可以使用 `generateStaticParams` 來完成：

```tsx
// 定義靜態路徑
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts').then(res =>
    res.json()
  )

  return posts.map(post => ({
    slug: post.slug,
  }))
}

// 可以使用 generateMetadata 為每個頁面生成 Meta Data
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  return {
    title: `Post ${params.slug}`,
  }
}

async function getData(slug: string) {
  const res = await fetch(`https://api.example.com/posts/${slug}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getData(params.slug)
  return <div>{/* 渲染資料 */}</div>
}
```

## 3. ISR (Incremental Static Regeneration)

ISR 可以依照時間基礎重新驗證，或是按照需求重新驗證。在 App Router 中，如果是按照時間重新驗證，可以在 fetch 時設置 `revalidate：`

```tsx
// 方法 1：時間基礎重新驗證
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: {
      revalidate: 60, // 每 60 秒重新驗證
    },
  })
  return res.json()
}
```

另一種則是按照需求重新驗證（On-demand Revalidation）：

```tsx
// 方法 2：按需重新驗證
// 在 API 路由中使用
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request: Request) {
  // 重新驗證特定路徑
  revalidatePath('/blog')
  // 或重新驗證特定標籤
  revalidateTag('blog-posts')

  return Response.json({ revalidated: true, now: Date.now() })
}
```

## 4. SSR (Server-side Rendering)

在 App Router 中，要實現 SSR 需要在 fetch 時設置 `cache: 'no-store'` 或 `revalidate: 0`：

```tsx
// 使用動態函數
import { headers, cookies } from 'next/headers'

async function getData() {
  const headersList = headers()
  const cookiesList = cookies()

  const res = await fetch('https://api.example.com/data', {
    cache: 'no-store',
    headers: {
      Authorization: headersList.get('authorization') || '',
      Cookie: cookiesList.toString(),
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Page() {
  const data = await getData()
  return <div>{/* 渲染資料 */}</div>
}
```

## 補充說明

### 快取策略

在 Next.js 15 中，快取是 Next.js 的一大重點，這跟渲染方式也有相關：

1. 強制快取：`fetch(URL, { cache: 'force-cache' })` 等同於默認的 SSG 行為
2. 不快取：`fetch(URL, { cache: 'no-store' })` 等同於 SSR 行為
3. 重新驗證：`fetch(URL, { next: { revalidate: 60 } })` ISR 行為

### 動態與靜態渲染

除此之外，也有區分為動態與靜態渲染，不過靜態渲染算是比較少會使用到。

1. 使用 `dynamic = 'force-dynamic'` 強制動態渲染
2. 使用 `dynamic = 'force-static'` 強制靜態渲染

## 總結

1. App Router 預設就是伺服器端元件（Server Components），除非明確使用 `'use client'`
2. 不再需要 `getStaticProps` 與 `getServerSideProps` 等方法
3. 資料獲取是透過在元件中直接使用 `async/await` 等方式
4. 緩存和重新驗證的配置是通過 `fetch` 的選項來完成
5. 動態路由使用 `generateStaticParams` 替代了 `getStaticPaths`

這些新的模式雖然看起來不同，但是其實也很直觀，不會到很難理解。主要就是通過配置 `fetch` 的選項來控制渲染和資料獲取的行為。
