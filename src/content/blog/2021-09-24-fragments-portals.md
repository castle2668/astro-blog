---
title: 'Cleaner Code with React Fragments & Portals'
excerpt: '透過 Fragments 與 Portals 讓我們可以使用 React 撰寫出更乾淨的 HTML Code。'
tags: ['react']
date: 2021-09-24
author: '海豹人 Sealman'
image: 'react.jpg'
slug: 2021-09-24-fragments-portals
---

## React Fragments

使用 React Fragments 避免使用不必要的 `<div>`。

`<React.Fragment>...</React.Fragment>` or `<Fragment>...</Fragment>` or `<>...</>`。

為什麼要使用 React Fragments 或是接下來會提到的 React Portals 呢？

雖然我們都不使用它們其實也不會怎麼樣，但是它們可以幫助我們撰寫出更乾淨的 HTML code。

## React Portals

> Portal (or move) the rendered HTML content to somewhere else.

### 為什麼要使用 Portal

舉例來說，我們通常會把 Modal 放在整個頁面的最外層，此時可能就會應用到 Portal，但是為什麼要這樣做呢？

因為從語意上 (Semantically)，這麼做可以得到更加乾淨的 HTML Outline 結構，像是 Modal 是整個頁面的一個 Overlay，所以它並不應該被包在層層元素之中。

這個做法其實很常見，像是 Element UI 的 Dialog 元件也有提供 `append-to-body` 這項屬性，讓我們把 Modal 提到更高的層級。

這些細節其實格外重要，因為在一些閱讀裝置上 HTML 結構其實是非常有用的。

### 使用方式

首先定義要 Portal 的目的地。

```html
<div id="backdrop-root"></div>
<div id="overlay-root"></div>
<div id="root"></div>
```

接著到 Component 中使用 `ReactDOM.createPortal` 定義要 Portal 的元件，以及目的地的 `id`。

```jsx
const LoadingModal = () => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop />, // "What" to portal
        document.getElementById('backdrop-root') // "Where" to portal
      )}
      {ReactDOM.createPortal(
        <SpinnerOverlay />,
        document.getElementById('overlay-root')
      )}
    </Fragment>
  )
}
```

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- 為什麼要使用 React Portals
- 如何使用 React Portals

## References

- [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)
