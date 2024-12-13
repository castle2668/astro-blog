---
title: 'ES6 Modules - Exports & Imports'
excerpt: '在現代前端當中，模組化是相當推薦而且實用的做法，為了要存取其他模組，我們需要透過 export 讓模組可以被引用，並使用 import 來存取模組。'
tags: ['javascript']
date: 2021-08-05
author: '海豹人 Sealman'
image: 'javascript.png'
slug: 2021-08-05-es6-modules-exports-imports
---

## Default Export

使用 `default` 關鍵字，表示這個 JavaScript 檔案默認「只會」導出這個資料，這個方法稱為 Default Export。

```jsx
const person = {
  name: 'Max',
}

export default person
```

### 引入預設的導出 (Import default export)

導入透過 `default` 關鍵字導出的資料時，因為只有導出預設的一個變數資料，所以**導入時可以任意更改名稱**。

```jsx
import person from './person.js'
import prs from './person.js'
```

## Named Export

導出多個常量 (Constant)。

一個 JavaScript 檔案可以包含一個 Default export 與無限多個 Named export。

```jsx
export const clean = () => {...}
export const baseData = 10;
```

### 引入單一或數個導出 (Import constant)

如果是導出常量，導入時可以用「大括號」取得導出的資料，這算是最常用的引入方式。

這裡應用到物件解構賦值的概念，因此**屬性必須對應到確切的名稱**。

```jsx
// Import a single export from a module
import { clean } from './utility.js'
import { baseData } from './utility.js'

// Import multiple exports from module
import { clean, baseData } from './utility.js'
```

### 引入時重新命名 (Assign an alias)

使用 `as` 關鍵字為導入的常量變數命名。

例如：關鍵字前方的 `clean` 是導出時設定的常量變數名稱，後方的 `Cleaning` 則是自己更改的替代名稱。

```jsx
// Rename an export when importing it
import { clean as Cleaning } from './utility.js'

// Rename multiple exports during import
import { clean as Clean, baseData as BaseData } from './utility.js'
```

### 引入整個導出的模塊 (Import an entire module's contents)

使用 `*` 特殊字符導入所有內容，此時的 `bundled` 會是一個物件，並且可以透過 `bundled.clean`或是 `bundled.baseData` 等方式取用資料。

```jsx
import * as bundled from './utility.js'
```

## Recap

- Default Export
  - Import default export
- Named Export
  - Import constant
  - Assign an alias
  - Import an entire module's contents

> 以上資源是我自己整理過後的筆記，若有錯誤歡迎隨時和我聯繫
