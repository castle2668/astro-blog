---
title: 'Vue.js 使用 Filter 自訂資料呈現格式'
excerpt: 'Vue 提供的 Filter 過濾器可用於自訂畫面資料的呈現格式，如果不是做複雜的資料處理，只是做簡單調整的話，就很適合使用 Filter。'
tags: ['vue']
date: 2019-12-07
author: 'Huang, Yung-Hsiang'
image: 'development.jpg'
slug: 2019-12-07-vue-filter
---

## 關於 Filter 與 Computed

Filter 與 Computed 有點類似，它們都可以用來做資料處理。  
不過 Filter 適合用於文字、數值格式的簡單處理，像是加上千分號、錢字號等等。  
Computed 則適合用於複雜的資料處理。

## 如何使用 Filter

### STEP 1：在 Mustache 加上 Filter

我們常在 Mustache 雙大括號裡使用 Filter 過濾器，使用方法是在數值後面加上一個直槓 `|` 再加上 Filter 的名稱。

```html
<script type="text/x-template" id="row-component">
  <tr>
    <td>{{ item.icash | currency }}</td>
  </tr>
</script>
```

接下來我們就去定義 Filter 如何執行吧。

### STEP 2：定義元件內 Filter 物件的方法

範例：為數值加上千分號與兩位小數點。

Function 裡面有傳入一個值 `n`，這個 `n` 就是前面的那個 `item.icash`，我們透過貨幣轉換的運算，把 `n` 加上千分號與兩位小數點。

```javascript
var child = {
  // ...
  // 定義 Filter 的方法
  filters: {
    currency: function (n) {
      return n.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    },
  },
  // ...
}
```

### STEP 3：加上多種 Filter

如果覺得加上千分號與小數點還不夠看，想再加上一個 `$` 字號，可以用 Filter 再幫我們加上去。

我們在 Filter 裡加一個 `dollarSign` 的 Function。

```javascript
var child = {
  // ...
  filters: {
    dollarSign: function (n) {
      return `$ ${n}` // ES6 寫法
    },
    currency: function (n) {
      return n.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    },
  },
  // ...
}
```

要特別注意 Filter 傳入參數的順序是「由前往後」的。

範例中 `item.icash` 就是傳入 `currency` 中當作傳入參數 `n` 的值。

而 `item.icash | currency` 完成後的結果，會再被當作另一個參數 `n` 傳進 `dollarSign` 函式中。

```html
<script type="text/x-template" id="row-component">
  <tr>
    <td>{{ item.name }}</td>
    <td>{{ item.cash | currency | dollarSign }}</td>
    <td>{{ item.icash | currency | dollarSign }}</td>
  </tr>
</script>
```

### STEP 4：全域註冊 Filter 在外層也能使用

剛才都是在元件內層的模板上使用 Filter，如果也想在外層元件中使用，像是其他元件或是整個 Vue 應用程式，我們該如何做呢？

```html
<div id="app">
  <!-- 元件的外層也想加上格式 -->
  {{ data[1].cash | currency | dollarSign }}
</div>
```

其實我們剛才都是使用「局部註冊」，如果想要在全部的環境下都能使用 Filter 的話，就要改為「全域註冊」。

Filter 的全域註冊，其實就只是將元件內的函式，移到全域去做註冊。

範例：

```javascript
Vue.filter('dollarSign', function (n) {
  return `$ ${n}`
})

Vue.filter('currency', function (n) {
  return n.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
})
```

完成全域註冊之後，原本元件內的 Filter 函式就能刪掉哩。

```javascript
var child = {
  props: ['item'],
  template: '#row-component',
  data: function () {
    return {
      data: {},
    }
  },
  // 已經改成全域註冊了，因此以下可以刪掉囉
  // filters: {
  //     ...
  // },
  mounted: function () {
    console.log('Component:', this)
  },
}
```

> 以上資源是我自己整理過後的筆記，若有錯誤歡迎隨時和我聯繫
