---
title: '瞭解 React Router V5 基礎知識'
excerpt: '現代前端開發常見的 SPA 是指頁面 URL 切換時，不必重新 Fetch 新的 HTML 檔案，且會阻止瀏覽器的默認行為，直接去更新畫面上的內容。在 React 技術線當中，可以藉由 React Router 幫助我們完成 SPA 下的頁面切換，根據 Route 的更改呈現出不同的元件。'
tags: ['react', 'reactrouter']
date: 2022-04-04
author: '海豹人 Sealman'
image: 'react.jpg'
slug: 2022-04-04-react-router-v5
---

## 前言

在認識 React Router 時，我們可以從它的[三大類元件](https://v5.reactrouter.com/web/guides/primary-components)去著手，分別是 Routes、Macthers、Navigation。

- Routers: `<BrowserRouter>` and `<HashRouter>`
- Route Matchers: `<Route>` and `<Switch>`
- Navigation (Route Changers): `<Link>`, `<NavLink>`, and `<Redirect>`

這些元件都是包含在 `react-router-dom` 裡面。

## Primary Components - Routers

- [Router](https://v5.reactrouter.com/web/api/Router)
  - [BrowserRouter](https://v5.reactrouter.com/web/api/BrowserRouter)
  - [HashRouter](https://v5.reactrouter.com/web/api/HashRouter)

### BrowserRouter 與 HashRouter 的差異

BrowserRouter

- 有比較乾淨的 URL
- 在切換 URL 時會發送 request
- 是使用 HTML5 History API (`pushState`, `replaceState`, `popState`) 去切換路由與畫面渲染

HashRouter

- 在頁面路徑的最前面會有個井字號 (#)
- 切換時不會發送 request
- 一直是維持在同一個 Location，是使用 `window.location.hash` 和 `hashchange` 事件來切換路由與呈現不同的渲染畫面

## Primary Components - Route Mathers

- [Route](https://v5.reactrouter.com/web/api/Route)
- [Switch](https://v5.reactrouter.com/web/api/Switch)

### Route & render methods & props

`<Route>` 可以用來註冊頁面，或是製作動態路由。最常見的用法為 Children 方式，寫法如下：每個 Route 底下都有一個元件，當路徑符合時就會渲染該元件，當路徑不符合時則會渲染出 `null`。

```jsx
function App() {
  return (
    <div>
      <MainHeader />
      <main>
        <Route path="/welcome">
          <Welcome />
        </Route>
        <Route path="/products">
          <Products />
        </Route>
        <Route path="/products/:productId">
          <ProductDetail />
        </Route>
      </main>
    </div>
  )
}

// our-domain.com/welcome => Welcome Component
// our-domain.com/products => Products Component
// our-domain.com/products/anyValue
```

除了以上的 Children 寫法，React Router 還有支援以下三種渲染方式：

- `<Route component>`
- `<Route render>`
- `<Route children>`

這三個方式中，個人比較建議使用 `<Route children>`，除了它是基礎的 Children 用法的進階寫法，同時它也最方便我們之後銜接 V6 的寫法。

> 注意，這三種方式之中，我們一個 `<Route>` 一次只能使用其中一種。

除此之外，使用這三種方式可以額外傳遞三個 Props 到路由元件中，它們分別是 `history`、`location`、`match`：

- [history](https://v5.reactrouter.com/web/api/history) 物件：基本上就是 URL 的意思
  - mutable
  - 例如：`history.push()` 方法
- [location](https://v5.reactrouter.com/web/api/location) 物件：回傳 App 所在路由，也是 URL 的意思
  - never mutated
  - 例如：常用 `location.search` 取得 URL 的 Query String
  - 我們可以在 `history.location` 找到同樣的內容，但是不該使用它，因為 `history` object 是可以被改變的
  - 我們應該使用 `location` props 才能確保得到 React lifecycle hooks 中的正確結果
- [match](https://v5.reactrouter.com/web/api/match) 物件：描述路由是如何配對的
  - 例如：常用 `match.params` 取得 URL 中的所有參數，像是動態路由 `/product/:id` 的 id 就能透過 `match.params.id` 取得

### Switch

Router 使用 `<Switch>` 和不使用 `<Switch>` 的差異：

- 使用 `<Switch>`：React Router 會由上而下搜尋，使用第一個 match 的 `<Route>` 或 `<Redirect>`。
- 沒有使用 `<Switch>`：React Router 會一次搜尋全部的 Routes，只要是符合的路由就會通通被渲染，全部都呈現到畫面上。

### Route 加上 exact 屬性

使用 `<Route>` 的 `exact` 屬性可以讓路由只有在「完全匹配」到的時候才會生效。

Route 使用 `exact` 與不使用 `exact` 的差異：

- 沒有加上 `exact`：當輸入網址 `domain.com/products/book` 時，會進入率先找到的 `<Products>`。
- 加上 `exact` 後：React Router 能夠正確匹配到完全對應的路由 `<ProductDetail>`。

範例：Switch component and exact property

```jsx
<Switch>
  <Route path="/products" exact>
    <Products />
  </Route>
  <Route path="/products/:productId">
    <ProductDetail />
  </Route>
</Switch>
```

## Primary Components - Navigation (Route Changers)

### Link

- `<Link>` component：導引到其他頁面的連結，會被 render 成 `<a>` 標籤。

```jsx
const MainHeader = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/welcome">Welcome</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
```

### NavLink

- `<NavLink>` component：與 `<Link>` 一樣都是 Router Link，且最後都會被 render 成 `<a>` 標籤。

與 `<Link>` 的差別在於，`<NavLink>` 可以加上一些 Styling，像是透過 `activeClassName` 為 Active Route 加上樣式。

```jsx
<NavLink activeClassName={classes.active} to="/welcome">
  Welcome
</NavLink>
```

### Redirect

- `<Redirect>` component: Redirect the users to somewhere else.

例如：當訪問到 `/` 這個路由時，React 就會渲染 `<Redirect>` 這個元件，而這個元件只要被渲染，就會執行路由的重新導向，也就是前往 `/welcome` 這個頁面。

```jsx
<Switch>
  <Route path="/" exact>
    <Redirect to="/welcome" />
  </Route>
</Switch>
```

## Nested Routes

除了在 App.js 註冊路由，我們也可以在 Page component 中註冊與部署路由，這兩個做法有什麼差別呢？

在 App 中註冊路由後，我們就可以直接打網址訪問該路徑的頁面，但是從 Page 註冊的路由，則必須要在該 Page component 屬於 Active 狀態下才能訪問得到。

例如：若在 Welcome Page 註冊 `/new-user` 路由，我們將永遠無法訪問到這個頁面，因為路徑必須包含 `/welcome` 才能讓 Welcome 這個元件 Active，所以註冊的路由要改成 `/welcome/new-user` 才會正確運作。

```jsx
const Welcome = () => {
  return (
    <section>
      <h1>The Welcome Page</h1>
      <Route path="/welcome/new-user">
        <p>Welcome, new user!</p>
      </Route>
    </section>
  )
}
```

除此之外，如果是位於動態路由之下的巢狀路由，可以用以下兩種寫法。

```jsx
<Route path="/quotes/:quoteId/comments">

const params = useParams();
<Route path={`/quotes/${params.quoteId}/comments`}>
```

## 404 Not Found Page

如果 User 訪問了我們沒有定義的 Route，通常應該就要出現一個 404 頁面。

實作邏輯：在所有 Route 定義完成後，在最後面加上一個「任何路徑都會符合」的路由，如此一來，只要 React Router 由上而下尋找 Route 全都不符合，就會接著進入我們製作的 404 `<NotFound>` 頁面。

```jsx
<Switch>
  <Route path="/" exact>
    <Redirect to="/quotes" />
  </Route>
  <Route path="/quotes" exact>
    <AllQuotes />
  </Route>
  <Route path="/quotes/:quoteId">
    <QuoteDetail />
  </Route>
  <Route path="/new-quote">
    <NewQuote />
  </Route>
  <Route path="*">
    <NotFound />
  </Route>
</Switch>
```

## Hooks

### useParams Hook

`useParams` Hook 會回傳一個含有「網址參數」的物件，存取的 Key 就是註冊動態路由時的參數名稱。

例如：`/products/:productId` 就是取用 `productId`。

```jsx
// ourdomain.com/products/p1
import { useParams } from 'react-router-dom'

const ProductDetail = () => {
  const params = useParams()
  console.log(params) // Object
  console.log(params.productId) // p1
  // ...
}
```

### useHistory Hook

用於更改瀏覽器的歷史紀錄，提供 `push` 與 `replace` 等方法，前者可以返回上一頁，後者則無法。

與 Vanilla JavaScript 提供的 History API 不同的地方在於：

- React Router DOM 的 useHistory 不會刷新頁面，只會重新渲染元件
- 原生 History API 的操作像是 `window.location.href`，則會使整個頁面重整，效果上不是那麼理想

此外，React 與 React Router DOM 之間的配合也比較好，彼此之間也有優化與除錯，因此比較推薦使用 useHistory。

最後，除了用 Template Literal 組出路徑的字串之外，React Router 還有提供一個**可讀性更好**的寫法，就是將傳遞的路徑使用 Object 來表達，拆分為 `pathname` 與後續參數 `search`。

```jsx
history.push(`${location.pathname}?sort=${isSortingAscending ? 'desc' : 'asc'}`)

history.push({
  pathname: `${location.pathname}`,
  search: `?sort=${isSortingAscending ? 'desc' : 'asc'}`,
})
```

### useLocation Hook

`useLocation` Hook 可以取得當前載入的頁面的訊息，而且是不可變的 (immutable)。

範例：透過 `useLocation` 搭配 [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) 與 [URLSearchParams.get()](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/get) 取得網址參數，便可得到當下的排序方式 `isSortingAscending`，並且經過運算取得排序後的資料。

```jsx
// 載入頁面後取得排序方式，得到排序後的資料
const location = useLocation()
const queryParams = new URLSearchParams(location.search)
const isSortingAscending = queryParams.get('sort') === 'asc'
// sortQuotes (Sorting Helper) 的詳細寫法這裡省略
const sortedQuotes = sortQuotes(props.quotes, isSortingAscending)

// 透過 useHistory 更新路由
const history = useHistory()
const changeSortingHandler = () => {
  // history.push('/quotes?sort=' + (isSortingAscending ? 'desc' : 'asc'));
  history.push(
    `${location.pathname}?sort=${isSortingAscending ? 'desc' : 'asc'}`
  )
}
```

Q: Why do we need useLocation? Isn't everything from useLocation included in useHistory?

A: There is a difference which might be relevant in a specific situation, or might not. The [docs](https://reactrouter.com/web/api/location) say:

_"It is also found on `history.location` but you shouldn’t use that because it’s mutable. You can read more about that in the [history](https://v5.reactrouter.com/web/api/history) doc._  
_A `location` object is never mutated so you can use it in the lifecycle hooks to determine when navigation happens, this is really useful for data fetching and animation."_

### useRouteMatch Hook

`useRouteMatch` Hook 可以取得當前所在的路徑，適合用於取代 hard-coded 的動態路徑。

這麼一來，如果之後最外層註冊的路由修改名稱，也不用修改內部一個個的巢狀路由。

```jsx
// ourdomain.com/quotes/q2/comments

const match = useRouteMatch();
console.log(match);

// 提供的 match 物件格式
{
  isExact: false,
  params: {
    quoteId: "q2"
  },
  path: "/quotes/:quoteId",
  url: "/quotes/q2"
}
```

例如：透過 match 物件的 `path` 與 `url` 取代原本 Template Literal 的寫法。

- `path`: The path pattern used to match. Useful for building nested `<Route>`
- `url`: The matched portion of the URL. Useful for building nested `<Link>`

> `match.path` is the path written for the router. - "/users/:userId"  
> `match.url` is the actual path in the browser URL. - "/users/5"  
> Check this article: [All About React Router 4 | CSS-Tricks](https://css-tricks.com/react-router-4/#aa-which-to-choose)

```jsx
<Route path={`/quotes/${params.quoteId}/comments`}>
<Route path={`${match.path}/comments`}>

<Link className="btn--flat" to={`/quotes/${params.quoteId}/comments`}>
<Link className="btn--flat" to={`${match.url}/comments`}>
```

## The Prompt Component

往往我們在填寫表單時，如果不小心按到上一頁或是連結，而導致頁面跳轉，之後我們就只能重新填寫表單資料。因此，我們希望 Router 可以在某些情況下，在跳轉頁面之前可以先提醒我們，防止進行不想要的換頁。

`<Prompt>` 元件可以設定 `when` 屬性指定不要跳轉的時機，並設定 `message` 屬性來輸出 Alert 的訊息內容。

例如：如果 `isEntering` 這個 State 為 true，則當我們要離開當前頁面時，`<Prompt>` 元件就會作用。

```jsx
<Prompt
  when={isEntering}
  message={location => 'Are you sure you want to leave'}
/>
```

特別注意 `message` 的值是一個 Function，預設帶有 `location` 這個參數，並且最後要回傳一段字串，作為 User 想要離開時會看到的訊息。

## Recap

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- React Router V5 基礎用法

## References

- [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)
- [React Router: Declarative Routing for React.js](https://v5.reactrouter.com/web/guides/quick-start)
