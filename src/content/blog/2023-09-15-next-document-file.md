---
title: 'Next.js 的 "_document.js" 檔案使用紀錄'
excerpt: '我專案都快成型了，老實講這個 document.js 還真的沒什麼修改到，秉持著自己專案內不能有一丁點自己不懂的東西的想法，來探探這個底線 document.js 是個什麼玩意兒。'
tags: ['nextjs', 'pagesrouter']
date: 2023-09-15
author: 'Sean Huang'
image: 'nextjs.png'
slug: 2023-09-15-next-document-file
---

Next.js 有 `_app.js` 與 `_document.js` 這兩個比較特別的頁面元件，其中 `_app.js` 比較好理解，它就是在做一些全局的配置，像是 Layout、Meta Tags 等設置。

而 `_document.js` 則是在定製你的基底 HTML 檔案結構，最基本的預設配置如下：

```jsx
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
```

你可以在 Document 設置文件的語系（`lang`），或是新增一個 `#overlay` 的 `div` 元素，方便之後使用 React Portal 製作 Modal 元件時使用。
