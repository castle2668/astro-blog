---
title: '升級 React Router v6 筆記'
excerpt: '本文為 React Router 升級第 6 版的筆記。'
tags: ['react', 'reactrouter']
date: 2022-04-08
author: '海豹人 Sealman'
image: 'react.jpg'
slug: 2022-04-08-react-router-v6
---

## React Router v6 Changelog

1. 將 `Switch` 替換成 `Routes`
   - 把 `Route` 用 `Routes` 包起來
   - 不再需要 `exact` 屬性
2. 調整 Nested Routes 定義方式
   - 加上米字號來配對子元件中的 `Routes`
   - 巢狀路由的子元件的路徑寫法
   - 集中定義 `Routes` 搭配 `Outlet` Component，且無需米字號
3. `NavLink` 的 `activeClassName` 移除，請改用 `className`
4. 將 `Redirect` 替換成 `Navigate`
5. 移除 `useHistory` 改用 `useNavigate` 執行程式化導航
6. Prompt 直接移除，沒有替代方案
7. 提供 `Suspense` 元件

## 1. Switch 改名為 Routes 並改用 element 屬性指定渲染元件

第一個變化，就是 React Router v6 將原本的 `<Switch>` 改名為 `<Routes>`。只是單純更改名稱，用法沒有改變，在使用上一樣是要用 `<BrowserRouter>` 包住 `<App>` 去指定是要在 `<App>` 底下規劃路由。

然而，註冊路由元件的方式就不一樣了，原先 v5 我們是在 `<Route>` 的子層放入 Page Component，更新到 v6 後則是改用 `<Route>` 元件的 `element` 屬性來指定要渲染的頁面元件等 JSX 程式碼。

### 把 Route 用 Routes 包起來

> 錯誤訊息：A `<Route>` is only ever to be used as the child of `<Routes>` element, never rendered directly. Please wrap your `<Route>` in a `<Routes>`.

在 v5，我們不一定要使用 `<Switch>` 來包住 `<Route>`。但是到了 React Router v6 就強制大家都要在 `<Route>` 外面包一層 `<Routes>`，否則會出現以上錯誤訊息。

### 不再需要 exact 屬性

在 v5 我們需要使用 `exact` 確保配對完全符合的路徑，才不會說只要前半段符合就通通出現。但是到了 v6 我們不再需要加上 `exact`，因為 React Router v6 已經預設讓所有的 `<Route>` 都套用 `exact` 的效果了。

```jsx
<Routes>
  <Route path="/welcome" element={<Welcome />} />
  <Route path="/products" element={<Products />} />
  <Route path="/products/:productId" element={<ProductDetail />} />
</Routes>
```

這麼做的好處是，我們不用再去注意註冊路由時的「順序」。之前在 v5 如果有使用到動態路由，我們需要記得把動態路由放到較後面的順序註冊，因為如果底下還有其他路徑（像是 `/products/edit`），Router 會永遠無法進入那一頁，因為它會被上面的動態路徑 `/products/:productId` 攔截。

升級到 v6 後，React Router 會幫我們自動匹配最佳的路由。

## 2. 調整 Nested Routes 定義方式

### 使用米字號配對子元件中的 Routes

> [v6 docs](https://reactrouter.com/docs/en/v6/upgrading/v5#relative-routes-and-links): Routes with descendant routes (defined in other components) use a trailing `*` in their path to indicate they match deeply.

如果你有巢狀路由，例如 `/welcome` 與 `/welcome/new-user`，那麼它們都會顯示 `<Welcome>` 這個 Page Component，因為是巢狀的關係。

在 React Router v6，如果子元件裡面有配置路由（`<Routes><Route /></Routes>`），我們就必須使用米字號（`/welcome/*`）讓 Router 可以訪問到子路由，而不是只能與 `/welcome` 這一個路由配對。

```jsx
<Route path="/welcome/*" element={<Welcome />} />
```

> 下面會介紹另一個「集中管理」的方式是不需要加上米字號的。

### 子元件的路徑寫法

v6 巢狀路由不用再撰寫上層的路徑，因為 v6 會幫我們自動判斷並加入，所以 `/welcome/*` 底下的巢狀子路由，就可以將 `/welcome/new-user` 直接寫成 `new-user`。如果使用 `<Link>` 也是一樣，可以省略前面的路由。

但要特別注意，如果要這樣寫，最前方「不能加上斜線」，否則會直接成為第一層路由。

```jsx
const Welcome = () => {
  return (
    <section>
      <h1>The Welcome Page</h1>
      <Link to="new-user">New User</Link>
      <Routes>
        <Route path="new-user" element={<p>Welcome, new user!</p>} />
      </Routes>
    </section>
  )
}
```

### 集中定義：Routes 與 Outlet 元件 (Recommended)

React Router v6 全新支援將 Nested Routes 集中於 App.js 中定義，讓我們更方便地管理巢狀路由，而非分散在各個元件當中。

另外，使用這個定義方式的話，父層的 Route 可以不用加上米字號！

> [v6 docs](https://reactrouter.com/docs/en/v6/upgrading/v5#advantages-of-route-element):  
> Notice how `<Route>` elements nest naturally inside a `<Routes>` element. Nested routes build their path by adding to the parent route's path. We didn't need a trailing `*` on `<Route path="users">` this time because when the routes are defined in one spot the router is able to see all your nested routes.
>
> You'll only need the trailing `*` when there is another `<Routes>` somewhere in that route's descendant tree. In that case, the descendant `<Routes>` will match on the portion of the pathname that remains (see the previous example for what this looks like in practice).

```jsx
<Route path="/welcome" element={<Welcome />}>
  <Route path="new-user" element={<p>Welcome, new user!</p>} />
</Route>
```

路由定義完成後，我們需要去指定子路由要渲染的 JSX 要放在哪邊。我們使用 v6 新增的 `<Outlet>` 元件，它的作用是一個 Placeholder，用來表示要在哪裡插入 JSX 內容。

```jsx
const Welcome = () => {
  return (
    <section>
      <h1>The Welcome Page</h1>
      <Link to="new-user">New User</Link>
      <Outlet />
    </section>
  )
}
```

> 以上集中定義的做法並不是強制的，但是個人推薦這樣處理更好理解 👍

## 3. 移除 NavLink 的 activeClassName 屬性，請改用 className 實作

在 v5 時，我們想要加上 `active` 的 Class 可能會這樣添加，但是現在這個屬性直接被移除了。

```jsx
<NavLink activeClassName={classes.active} to="/welcome">
  Welcome
</NavLink>
```

取而代之的是在 `className` 用一個特殊的方式來實作，v6 開放在 `className` 放一個函式！

這個函式有一個參數 `navData`，它是一個物件，裡面有一個名為 `isActive` 的屬性，這個屬性在該 NavLink 正被造訪、處於活動狀態 (Active) 時，其值就會是 `true`。

那麼該如何使用它呢？我們透過箭頭函式 Return Value 的特性，動態判斷 `navData.isActive` 的值，若為 `true` 就回傳 `classes.active`，若為 `false` 則回傳空字串。

```jsx
<NavLink
  className={navData => (navData.isActive ? classes.active : '')}
  to="/welcome"
>
  Welcome
</NavLink>
```

## 4. Redirect 改名為 Navigate 且新增 replace 方法

v5 我們使用 `<Redirect>` 進行重新導向。

```jsx
<Switch>
  <Route path="/" exact>
    <Redirect to="/welcome" />
  </Route>
</Switch>
```

v6 則更換成 `<Navigate>` 元件。還可以加上 `replace` 屬性，讓重新導向時使用「取代」的方式，如果拿掉沒寫就會是預設「Push」的導向方式。

```jsx
<Routes>
  <Route path="/" element={<Navigate replace to="/welcome" />} />
  <Route path="/welcome" element={<Welcome />} />
  <Route path="/products" element={<Products />} />
  <Route path="/products/:productId" element={<ProductDetail />} />
</Routes>
```

## 5. 移除 useHistory 改用 useNavigate 執行程式化導航

v6 把 `useHistory` 移除了，取而代之的是 `useNavigate`。它一樣擁有 Push、Replace、前後導向等功能，但是在寫法上看起來更簡單了。

```javascript
const navigate = useNavigate()
navigate('/welcome')

// 如果要用 Redirect 也就是 Replace 的話，可以加上第二個參數
navigate('/welcome', { replace: true })

// 單純加上 -1，表示回到上一頁
navigate(-1)

// 回到上上一頁
navigate(-2)

// 進到下一頁
navigate(1)
```

除此之外，`useNavigate` 同樣也能支援物件形式，可以處理比較複雜的路徑。

甚至可以使用 `createSearchParams` 幫我們自動將 Params 物件轉為 URL 字串！使用時要注意 `search` 的值前面要加上一個 `?` 作為 Query String 的開頭喔。

```javascript
// 支援物件形式
navigate({
  pathname: `${location.pathname}`,
  search: `?sort=${isSortingAscending ? 'desc' : 'asc'}`,
})

// createSearchParams
const params = { sort: isSortingAscending ? 'desc' : 'asc' }
navigate({
  pathname: location.pathname,
  search: `?${createSearchParams(params)}`,
})
```

## 6. Prompt 直接移除，沒有替代方案

這個是缺點，目前還沒有替代方案，你各位只能自己想辦法啊 🥲

## 7. Optimize code with Lazy Loading and Suspense fallback

- React.memo
- Lazy Loading - Load code only when it's needed

進入頁面前，Browser 會載入我們打包的整個 Bundle，涵蓋所有的 React Code，讓我們進入後可以看到渲染的頁面，以及 Reactive 的各種狀態。

這也代表著進入頁面的 Users 必須等待下載 Code 的過程，直到我們的 Web App 準備完畢為止。

因此，我們想要做的是儘量減少 Users 初次載入頁面的等待時間，透過把大包的 Bundle 切分成一小包一小包 (chunk) 的方式，並且只有在訪問到該頁面時，才去下載該頁面的 Code。

例如：初始進入的頁面是 All Quotes 頁面 (`our-domain.com/quotes`)，此時就不需要載入 New Quote 頁面 (`our-domain.com/new-quote`) 的程式碼。

```jsx
// import NewQuote from './pages/NewQuote';
const NewQuote = React.lazy(() => import('./pages/NewQuote'))
```

完成後回到頁面，會發現頁面顯示有錯誤。這是因為我們把檔案拆分成 chunks 之後，如我們所願 React Router 進行了延遲加載，但是 React 卻也因此無法順利進行渲染的工作而導致 React 報錯。

為了讓 React 繼續進行渲染而非報錯，我們可以準備一個替代的元件 `<Suspense>` 給它，讓 React 在載入完成前先渲染這個替代內容。其中的替代內容我們就寫在 `fallback` 這個屬性裡面，透過箭頭函式回傳 JSX 內容。

範例：將 Lazy Loading 應用在各個需要的頁面上

```jsx
const AllQuotes = React.lazy(() => import('./pages/AllQuotes'))
const NewQuote = React.lazy(() => import('./pages/NewQuote'))
const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <div>
      <Layout>
        <Suspense
          fallback={
            <div className="centered">
              <LoadingSpinner />
            </div>
          }
        >
          <Routes>
            <Route path="/quotes" element={<AllQuotes />} />
            <Route path="/new-quote" element={<NewQuote />} />
            <Route path="/quotes/:quoteId/*" element={<QuoteDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </div>
  )
}
```

## Recap

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- Upgrading To React Router v6
- Optimize code with Lazy Loading and Suspense fallback

## References

- [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)
