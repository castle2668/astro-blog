---
title: 'Deploying React Apps over Firebase Hosting'
excerpt: '有很多做法能夠部署 React 專案，本文會介紹如何透過 Firebase Hosting 這項服務來部署一個 SPA 專案。'
tags: ['react']
date: 2022-06-06
author: '海豹人 Sealman'
image: 'react.jpg'
slug: 2022-06-06-deploying-react-apps
---

## Upload Production Code to Server

任何 SPA 框架 Build 出來的都是一個 Static Website，意思就是網站是由 HTML、CSS，以及 Client Side 的 JavaScript React Code 所組成，並沒有需要在 Server 執行的 JavaScript Code。

因此，我們需要的是一個 Static Site Host，例如：Google Cloud、AWS、Firebase。

這裡會用 Firebase 為例，我們除了用它來開設 API 之外，也能用 Firebase 提供的 Hosting 服務部署專案。

## Firebase Hosting

### 在專案下建立 Firebase 設定

```bash
firebase init
```

一開始輸入 `firebase init` 進入專案設定後，會有一個問題是「Configure as a single-page app (rewrite all urls to /index.html)?」這是在詢問是否配置的是 SPA 專案。

這裡選擇 "Yes" 讓所有頁面都使用 index.html 作為進入點，而這就是 SPA 在做的事情。我們是透過 React Router 去定義路由，所有頁面其實都是同一個 HTML 檔案，我們是透過 Router 的切換讓頁面呈現的內容改變。

### 部署專案

完成上面的步驟後，專案目錄會多一個 firebase config 檔案，接下來就能打包我們的專案，然後執行 Deploy 的動作哩。

```bash
npm run build
firebase deploy
```

完成後應該會顯示部署的網址，也可以到 Firebase Console 裡面查看。

最後，如果要下架已部署的專案，可以輸入 `firebase hosting:disable` 指令。

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- Upload Production Code to Firebase Hosting Service

## References

- [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)
