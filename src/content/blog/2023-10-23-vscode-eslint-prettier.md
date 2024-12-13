---
title: '使用 Prettier 與 ESLint 自動對 JavaScript 排版與除錯'
excerpt: '近一兩年專案都是使用這套 Linter 與 Formatter 的組合拳，IDE 使用 VS Code 的話歡迎參考看看。'
tags: ['eslint', 'prettier']
date: 2023-10-23
author: 'Sean Huang'
image: 'javascript.png'
slug: 2023-10-23-vscode-eslint-prettier
---

近年來都會在專案中使用 EditorConfig + Prettier + ESLint 來統一程式碼撰寫風格與規則，主要是因為完成這些設定後，可以直接透過 VS Code 的 Format on Save，在儲存時一次執行排版與除錯，讓團隊成員之間的協作更為一致。

在開始之前，請先檢查專案內存在 `/.vscode/settings.json` 這個檔案，如果沒有的話可以自行新增一個，並且寫入底下的執行規則，其內容為指定執行 Prettier 後再執行 ESLint。

```json
{
  "editor.formatOnSave": false,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": ["source.formatDocument", "source.fixAll.eslint"]
}
```

完成設定後，確認你的 VS Code 已經安裝 [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)、[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)、[Format Code Action](https://marketplace.visualstudio.com/items?itemName=rohit-gohri.format-code-action) 這三個插件，如果你在其他專案用不到某些插件，你可以將它設定為僅在此工作區使用。
