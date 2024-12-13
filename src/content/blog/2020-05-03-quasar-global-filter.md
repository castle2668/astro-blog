---
title: '在 Quasar 使用全域 Filter 過濾器'
excerpt: '這篇文章會介紹如何在 Quasar 加入全域的 Filter 過濾器，讓我們在各元件之中都能直接使用過濾器。'
tags: ['quasarframework']
date: 2020-05-03
author: '海豹人 Sealman'
image: 'development.jpg'
slug: 2020-05-03-quasar-global-filter
---

## 在 Quasar 使用全域 Filter

### STEP 1：新增 Filter 過濾器

> 由於 Filter 過濾器的功能不是本文的重點，所以程式碼的部分我就簡單帶過哩

新增 Filter 過濾器的步驟如下：

1. 新增 Filter 過濾器
2. 將檔案放在 `src/boot/` 資料夾底下，例如：`src/boot/filters/example.js`

範例程式碼：

```javascript
// src/boot/filters/example.js
export default ({ Vue }) => {
  Vue.filter('YourFilter', (value) => {
    return ...
  });
};
```

### STEP 2：全域啟用 Filter 過濾器

- 在 `quasar.conf.js` 中啟用 Boot files

現在我們來啟用製作完成的過濾器！

如果是使用 Vue CLI，我們都是在**進入點**，也就是 `/main.js` 裡面啟用 Filter 過濾器，不過 Quasar Framework 並沒有 `main.js` 檔案，那麼我們到底該怎麼啟用 Filter 呢？

答案是從 Quasar 專案的根目錄下的 `quasar.conf.js` 設定檔啟用。我們可以用它來啟用 **Boot files**，而所謂的 Boot files 指的就是放在 `src/boot/` 這個資料夾下的檔案。

此外，不只是 Filter，其他像是 Mixin、Axios、i18n 等重要的功能，其實都是要透過啟用 Boot files 的方式來使用的。藉由這個方式，我們就能宣告一個全域的 Filter 過濾器哩！

```javascript
// quasar.conf.js
module.exports = function(ctx) {
  return {
    boot: ['i18n', 'axios', 'filters/example'],
    ...
  }
}
```

## 參考資料

1. [How do i add global filters to Quasar? | Quasar Framework Community](https://forum.quasar-framework.org/topic/5540/how-do-i-add-global-filters-to-quasar)
2. [Configuring quasar.conf.js | Quasar Framework](https://quasar.dev/quasar-cli/quasar-conf-js#Introduction)
3. [Boot files | Quasar Framework](https://quasar.dev/quasar-cli/cli-documentation/boot-files#Introduction)

> 以上資源是我自己整理過後的筆記，若有錯誤歡迎隨時和我聯繫
