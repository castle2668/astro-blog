---
title: 'React Router V6 - Setup Routes'
excerpt: 'React Router 團隊最近又來一次全面升級，新增了許多功能，特別是 Loader 功能實在是讓我大開眼界。除此之外，我發現他們的文件寫得很好，基本上只要跟著走一遍 Tutorial 就可以掌握新版的寫法調整與新功能哩。'
tags: ['react', 'reactrouter']
date: 2023-03-14
author: 'Sean Huang'
image: 'react.jpg'
slug: 2023-03-14-react-router-v6-setup
---

不多說，讓我們重新開始，就從建立路由開始吧 ⋯⋯ ( Ꙭ)🥕

## 資料夾結構

首先，我們的 React 專案都有一個 `src` 資料夾，裡面會有一個進入點 (Entry)，可能叫做 `App.js(x)` 或是 `main.js(x)`，我們會在這裡配置路由。

接著，可以在 `src` 底下建立 `/pages` 或 `/routes` 資料夾，用途是放置 Page-Level 的元件。

Folder Structure 其實沒有什麼特殊的變更，直接開始建立路由吧！

## 建立路由 - createBrowserRouter

React Router v6.4 新增的 [Data APIs](https://reactrouter.com/en/main/routers/picking-a-router#using-v64-data-apis) 提供了幾個創建路由的新方式，我們使用其中的 `createBrowserRouter()` 方法來建立路由系統。

此方法需要傳入一個由物件所組成的陣列（每一個物件就是一組路由），然後把回傳值提供給 `RouterProvider`。

```jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from '@/routes/Home'
import ProductsPage from '@/routes/Products'

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/products', element: <ProductsPage /> },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
```

> 還有另一種建立方法 `createRoutesFromElement` 個人覺得較為冗長，且跟之前使用 JSX 的寫法相似，這裡就不予介紹啦。

## 路由鏈結 - Link 與 NavLink

在 React Router 中要實現頁面跳轉的功能，我們不是使用原生的 `<a>` 標籤，而是使用 React Router 提供的 `<Link>` 元件。

```jsx
import { Link, NavLink } from 'react-router-dom'
;<Link to="/products">Products Page</Link>
```

另一種路由鏈結是 `<NavLink>`，它與 `<Link>` 的作用相同，但是還內建了 `isActive` 和 `isPending` 兩個狀態屬性。

你可以將它們解構出來，用於判斷當前路由的狀態，並且動態地設置樣式。

```jsx
const getNavLinkClass = ({ isActive, isPending }) => {
  if (isActive) {
    return 'active'
  }
  if (isPending) {
    return 'pending'
  }
  return ''
}

;<NavLink to="/products" className={getNavLinkClass}>
  Products Page
</NavLink>
```

在製作巢狀路由時，可以為 `<NavLink>` 加上 `end` 屬性，以確保該元件不會在進入其子路由時，也被匹配到 `isActive` 等狀態，例如：

- Home 只會對應到網站的根路由 (`'/'`)，也就是後面不帶任何路徑時
- Blog 只會對應到 `/blog`，當進入 `/blog/hello-world` 頁面時不會有 `isActive` 狀態

```jsx
<NavLink to="/" end>Home</NavLink>
<NavLink to="/blog" end>Blog</NavLink>
<NavLink to={`/blog/hello-world`}>Hello World</NavLink>
```

## 共用外框 - children 與 Outlet

一個網站通常會有一個共用的外框，例如上方或左側的導覽列、商標、版權宣告等等，這些內容會全部放在一個 Layout 元件當中。

以下的 RootLayout 元件是一個父路由，我們會使用 `children` 配置子路由，而那些子頁面的內容就會顯示在 `<Outlet />` 這個輸出點的位置。

```jsx
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <>
      <h1>Root Layout</h1>
      <Outlet />
    </>
  )
}

export default RootLayout
```

> 底下的範例，我們可以看到 `RootLayout` 的擺放位置

## 巢狀路由的相對與絕對路徑

路由配置上，使用 `"/"` 開頭的路徑為絕對路徑，通常父路由會使用絕對路徑，子路由使用相對路徑並且依賴於父路由。例如：父路由為 `"/root"` 等於網址 `my-domain/root`，而子路由設定 `"products"` 等於網址 `/root/products`。

另外，還有一個小地方可以改善。下方範例中，可以看到子路由的 HomePage 與父路由其實是指向同一個路由。這種情況下，我們可以把 `path: ""` 改用 `index` 這個特殊的屬性去定義，明確地表示 HomePage 是一個 Index Route。

```jsx
const router = createBrowserRouter([
  {
    path: '/', // 絕對路徑
    element: <RootLayout />,
    children: [
      // 相對路徑
      // { path: "", element: <HomePage /> },
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductsPage /> },
    ],
  },
])
```

> 使用 Index Route 會讓程式的語意更加明確，但是不使用也沒關係喔。

## 錯誤頁面 - errorElement

如果進入一個未定義的路由，通常會顯示 404 錯誤頁面，並且頁面上可能會有一些錯誤訊息。

製作專案時，我們通常不會直接使用 React Router 內建的錯誤頁面，而是選擇建立一個屬於自己專案的錯誤畫面。

```jsx
import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {
  const error = useRouteError()
  console.error(error)

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}

export default ErrorPage
```

完成了這個簡單的 404 頁面後，可以透過 `errorElement` 來配置這個錯誤處理的專屬頁面。

```jsx
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />, // catch any errors
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductsPage /> },
    ],
  },
])
```

## 程式化導頁 - useNavigate

除了使用 `<Link>` 來換頁，我們也可以手動地去執行路由跳轉的動作，例如：在表單送出或按下按鈕後導頁。

透過 react-router-dom 提供的 `useNavigate` 函式，就可以執行程式化導頁。

```jsx
import { useNavigate } from 'react-router-dom'

const Home = ({ film }) => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/products')
  }

  return (
    <div>
      <button onClick={handleNavigate}>前往產品頁面</button>
    </div>
  )
}
```

## 動態路由與 useParams

動態路由在許多網站中都很常見，例如電商網站的所有商品頁面，點擊任一商品後便會進入商品明細頁。

在 React Router 中可以使用冒號 (`:`) 代表該片段屬於一個動態路由。

```jsx
const router = 'createBrowserRouter'([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'products/:productId', element: <ProductDetailPage /> },
    ],
  },
])
```

接下來，我們可以透過 React Router 提供的 `useParams` Hook 去取得這個動態路由片段的資訊物件。

這裡的 Identifier (`productId`) 是來自於路由設定裡的 `/product/:productId`，因此如果路由配置更改，這裡取得的 Identifier 也會跟著改變喔。

```jsx
import { useParams, Link } from 'react-router-dom'

const DUMMY_PRODUCTS = [
  { id: '1', title: 'Product 1' },
  { id: '2', title: 'Product 2' },
]

const ProductDetailPage = () => {
  const params = useParams()

  return (
    <div>
      <h1>Product Detail</h1>
      <p>{params.productId}</p>
      {DUMMY_PRODUCTS.map(product => (
        <li key={product.id}>
          <Link to={`/products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </div>
  )
}

export default ProductDetailPage
```

## 回顧

看完這篇文章，我們認識了 React Router V6 的基礎架構，瞭解如何使用它建立一套路由系統，並且能實際應用在專案上。

下一篇文章會介紹 React Router V6 這次新增的 `Loader` 等等全新功能，讓我們的路由系統更加全面。

## References

- [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)
