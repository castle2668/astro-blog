---
title: '基於檔案的 Next.js 頁面路由'
excerpt: '今年下半年接了一個公司的對外專案，因此有 SEO 需求，不知道是不是靜茹給我的勇氣，讓我主動提出可以使用 Next.js 的 SSR 來架構新專案，總之就是且戰且走吧，從零開始一邊做一邊學。'
tags: ['nextjs', 'pagesrouter']
date: 2023-06-15
author: 'Sean Huang'
image: 'nextjs.png'
slug: 2023-06-15-next-file-based-routing
---

## useRouter hook

```jsx
// file: <root>/pages/clients/[id]/[projectId].js
// visit: localhost:3000/clients/sean/project1

import { useRouter } from 'next/router'

function SelectedClientProjectPage() {
  const router = useRouter()

  console.log(router.pathname) // "clients/[id]/[projectId]"
  console.log(router.query) // {projectId: "project1", id: "sean"}

  // send a request to some backend server
  // to fetch the piece of data with an id of router.query.projectId

  return (
    <div>
      <h1>The Project Page for a Specific Project for a Selected Client</h1>
    </div>
  )
}

export default SelectedClientProjectPage
```

## Catch-All Routes

e.g. `[...xxx].js`

```jsx
// file: <root>/pages/blog/[...slug].js
// visit: localhost:3000/blogs/2023/09

import { useRouter } from 'next/router'

function BlogPostsPage() {
  const router = useRouter()

  console.log(router.query) // {slug: ["2023", "09"]}

  return (
    <div>
      <h1>The Blog Posts</h1>
    </div>
  )
}

export default BlogPostsPage
```

## Navigating To Dynamic Routes

```jsx
import Link from 'next/link'

function ClientsPage() {
  const clients = [
    { id: 'sean', name: 'Sean' },
    { id: 'chi', name: 'Chi' },
  ]

  return (
    <div>
      <h1>The Clients Page</h1>
      <ul>
        {clients.map(client => (
          <li key={client.id}>
            <Link href={`/clients/${client.id}`}>{client.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ClientsPage
```

## A Different Way Of Setting Link Hrefs

```jsx
<Link
  href={{
    pathname: '/clients/[id]',
    query: { id: client.id },
  }}
>
  {client.name}
</Link>
```

## Navigating Programmatically

```jsx
const router = useRouter()

router.push({
  pathname: '/clients/[id]/[projectId]',
  query: { id: 'sean', projectId: 'project1' },
})
```

## Custom 404 Page

```jsx
// file: <root>/pages/404.js (Must)
// visit: localhost:3000/something

function NotFoundPage() {
  return (
    <div>
      <h1>Page not found!</h1>
    </div>
  )
}

export default NotFoundPage
```

## Public folder

Files and folders stored **outside of `public/`** are **NOT made accessible** by Next.js - visitors can NOT load files from there.
