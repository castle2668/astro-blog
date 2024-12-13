---
title: '為什麼 React State 在 Event Listener 中沒有正確更新'
excerpt: '最近在使用 Ant Design 的 Table 元件時，想要監聽 Scroll 事件去更改呈現的欄位，但是發現 State 成功更新後，Table 所使用的 State 卻沒有跟著更新，這到底是怎麼回事哩。'
tags: ['react', 'antdesign']
date: 2022-08-31
author: 'Sean Huang'
image: 'react.jpg'
slug: 2022-08-31-react-state-eventlistener
---

## 應該盡量使用 JSX 處理事件

其實這個不是 Ant Design 的問題，雖然它的 Table 在綁定 `dataSource` 屬性上確實比較特殊，這與它背後的運作機制有關，不過在 `columns` 屬性的使用上是沒問題的，所以這裡先不把問題歸咎於套件。

真正問題在於，使用 React State 時，我們應該盡量不要去使用原生的 DOM 方法，像是本文提到的 `addEventListener` 等等。

我們應該使用與 React 相關的綁定方式，例如在 JSX 中使用 `onClick` 來監聽事件，這種方式會更符合意義、更簡潔，同時也能避免一些問題。

```jsx
<Button onClick={() => console.log(seamValue)}>Click me!</Button>
```

## 原生 DOM 事件需配合 Dependency 監聽

如果你真的無法把你想監聽的 Element 掛上 JSX 的事件處理，那就只能硬著頭皮使用原生的 DOM 事件了。

這種情況其實也很常見，像是使用 UI 套件如 Ant Design 的時候，若想監聽 Ant Design Table 的滾動，會發現 Table Body 的位置被套件包裝在元件渲染後的內層，我們沒辦法直接在 JSX 掛上 `onScroll` 事件。

這時候就只能透過 `addEventListener` 去做監聽了。

```jsx
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';

const columns = [...];
const data = [...];

const App = () => {
  const [col, setCols] = useState(columns);

  useEffect(() => {
    const scrollEvent = () => {
      // Get newColumns...
      setCols(newColumns);
    };
    const tableElement = document.querySelector('.ant-table-body');
    tableElement.addEventListener('scroll', scrollEvent);
  }, []);

  return <Table columns={col} dataSource={data} scroll={{ y: 240 }} />;
};

export default App;
```

這麼做之後，你會發現 Scroll 觸發時，你所設定的 State 沒有被正確更新成 `newColumns`，然而在 React DevTools 裡面卻可以看到 State 已經更新。因此準確地說，是畫面上 Table 所使用的 State 沒有被更新。

會出現這個問題，主要是因為原生的 DOM 事件並不會知道 React State 的更新，原生 EventListener 綁定到的值其實一直都是最初的 Initial State。

## 解決方法

如果想要更新綁定的值，我們必須重新綁定一個新的 Event Listener 上去。

我們把更新的 State 放到 useEffect 的 Dependency 陣列中，當監聽到 State 改變時，React 就會重新為 DOM 元素綁定事件，此時的 Listener 所使用的值就會是更新後的 State 囉！

```jsx
const [col, setCols] = useState(columns)

useEffect(() => {
  const scrollEvent = event => {
    const left = event.target.scrollLeft
    if (left < 50) {
      // 調整欄位...
      setCols(newColumns)
    }
  }
  const tableBodyEl = document.querySelector('.ant-table-body')
  tableBodyEl.addEventListener('scroll', scrollEvent)

  // Avoid Memory Leaks
  return () => {
    tableBodyEl.removeEventListener('scroll', scrollEvent)
  }

  // React State cannot attach to EventListener, so we need to attach the listener again when the state changes
}, [dataColumn])
```

對了，記得在 Cleanup Function 中執行 `removeEventListener` 清除之前綁定的監聽，這樣可以盡量避免 Memory Leaks 的發生喔。

> 以上資源是我自己整理過後的筆記，若有錯誤歡迎隨時和我聯繫
