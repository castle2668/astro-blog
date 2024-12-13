---
title: '使用 vue-tribute 實作標記功能'
excerpt: '這篇文章主要說明如何透過 vue-tribute 來實作網頁上的標記功能（@mention），先備知識必須要已經基本會使用 Vue。'
tags: ['vue', 'javascript', 'html']
date: 2020-07-19
author: '海豹人 Sealman'
image: 'development.jpg'
slug: 2020-07-19-vue-tribute
---

## 開始使用 vue-tribute

> [vue-tribute](https://github.com/syropian/vue-tribute) @ GitHub

vue-tribute 是將 ES6 Native 的 [tribute](https://github.com/zurb/tribute) 經過 Vue.js 的寫法包裝後的套件，方便支援 Vue.js 框架的寫法。

### 安裝 vue-tribute

我個人是習慣使用 npm 安裝套件。

```bash
npm install vue-tribute --save
```

### 使用 vue-tribute

我們可以在 vue-tribute 中使用 `input`、`textarea`、`contenteditable` 等 HTML 標籤，當我們輸入內容時，vue-tribute 會存取選項 `tributeOptions` 裡的屬性與方法，呈現出 @mention 後的畫面與功能。

```html
<vue-tribute :options="tributeOptions">
  <input type="text" placeholder="@..." />
</vue-tribute>
```

如果想要對輸入框做進一步的處理，像是讓文字變色、轉為連結等功能，可以使用 `contenteditable` 來完成。

```html
<vue-tribute :options="tributeOptions">
  <div contenteditable="true" id="myElement" placeholder="輸入留言"></div>
</vue-tribute>
```

### 參數選項設定

`tributeOptions` 是 vue-tribute 的參數選項，這個參數選項在 vue-tribute 與 tribute 套件中都是相同的，因為 vue-tribute 的參數設定就是沿用 tribute 的設定。

以下列出一些我自己常用的參數：

- `values`：唯一的必填參數，就是你要用來搜尋的資料
- `trigger`：觸發條件，可使用符號或字串
- `selectTemplate`：選取後新增到輸入框裡面的內容，如果不是使用 `contenteditable` 元素，這邊就只能寫入純文字哩
- `menuItemTemplate`：標記清單所呈現的組合樣板，以 Twitter 的 @mention 功能來說，就會呈現頭像、名稱、ID 等資料
- `lookup`：通常放字串即可，但若要透過資料裡的多個屬性來搜尋，可以把 `key` 相加來做複合搜尋
- `requireLeadingSpace`：觸發前要有空格
- `allowSpaces`：@mention 的內容允許空格
- `menuItemLimit`：清單最多呈現多少筆篩選結果
- `menuShowMinLength`：觸發前至少要打幾個字

```javascript
tributeOptions: {
  values: [],
  trigger: '@',
  selectTemplate(item) {
    return `<span><a href="http://twitter.com/${item.original.id}">@${item.original.name}</a></span>`;
  },
  menuItemTemplate(item) {
    return `<span>${item.original.name}</span>`;
  },
  lookup(item) {
    return item.friend_name + item.friend_suuid;
  },
  requireLeadingSpace: true,
  allowSpaces: false,
  menuItemLimit: 10,
  menuShowMinLength: 1,
},
```

這是一個簡易的參數設定範例，若有其他需求可以參考 [所有參數](https://github.com/zurb/tribute#a-collection) 的說明。

## 處理標記結果

接著，我們要來處理 @mention 得到的結果。  
由於 vue-tribute 沒有提供方法來綁定與監聽選取到的項目，所以我們只好從選取後的文字框當中，將標記到的對象給篩選出來。

### 篩選出所有的標記對象

要擷取使用者這則留言總共標記了哪些人，我們可以直接用正規表達式篩選出 @ 後面的文字，並將結果以陣列傳回後端。

```javascript
// 計算留言 (content) 裡面標記了哪些人
const str = this.content
const pattern = /\B@([a-z0-9_-]+)/gi // 透過正規表達式查找符合規則的字段
const arr = str.match(pattern) // ['@sean', '@sealman']
let result = []
if (arr) {
  result = arr.map(item => item.substr(1)) // ['sean', 'sealman']
}
```

### 將文字轉換成連結

透過正規表達式，我們也可以將標記文字轉為連結，像是將 @vuejs 這個標記，轉換為 Twitter 使用者的個人頁面連結，像是 [http://twitter.com/vuejs](http://twitter.com/vuejs)。

```javascript
// 將 @mention 轉為 twitter.com/mention 帳號的 Link
const replaceContent = content.replace(
  /\B@([a-z0-9_-]+)/gi, // 可位於開頭 or 左右有空格，可包含 _ 與 - 符號
  '<a href="http://twitter.com/$1">@$1</a>'
)
```

> 參考資料：[Replace @mention with link - Stack Overflow](https://stackoverflow.com/questions/16879588/replace-mention-with-link)

## Troubleshooting

根據過往的開發經驗，如果需求比較複雜，或是想要實作出像是留言板等功能較完善的輸入框的話，輸入框可能就會選用 `contenteditable` 元素。不過 `contenteditable` 在使用時可能會遇到一些問題，以下就是我自己在實作中遇到過的幾個坑。

### Contenteditable 滑鼠游標自動 Focus 至最後方

使用 `contenteditable` 時，如果有 Focus 游標的需求，無法直接透過一般的 `focus()` 完成，需要使用到 `Selection` 與 `Range` 屬性。

在 Stack Overflow 上 [Nico Burns](https://stackoverflow.com/users/140293/nico-burns) 在 [javascript - How to move cursor to end of contenteditable entity - Stack Overflow](https://stackoverflow.com/a/3866442/13594832) 這篇問題裡提到的解法，應該是目前可行的解法。

> 不過若 `contenteditable` 裡面有放其他元素，在 Node 節點上可能要再做判斷

```javascript
function setEndOfContenteditable(contentEditableElement) {
  var range, selection
  if (document.createRange) {
    range = document.createRange()
    range.selectNodeContents(contentEditableElement)
    range.collapse(false)
    selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)
  } else if (document.selection) {
    range = document.body.createTextRange()
    range.moveToElementText(contentEditableElement)
    range.collapse(false)
    range.select()
  }
}
```

接著，我們透過 `setEndOfContenteditable` 觸發整個方法，完成將游標移動到最後面的功能。

```javascript
const elem = document.querySelector('.input-area')
this.setEndOfContenteditable(elem) // 游標移到最後面
```

### Contenteditable 複製貼上時限制為純文字

若要防止使用者貼上文字以外的內容，可以加上以下程式碼，防止使用者貼上任何內容。

在 [Javascript trick for \'paste as plain text\` in execCommand - Stack Overflow](https://stackoverflow.com/a/12028136/13594832) 這個問題串的最佳解答，算是比起另一個網路上的熱門答案更簡單、更好理解，且不容易出現 Bug 的寫法。

```javascript
editor.addEventListener('paste', function (e) {
  e.preventDefault()
  var text = (e.originalEvent || e).clipboardData.getData('text/plain')
  document.execCommand('insertHTML', false, text)
})
```

> 以上資源是我自己整理過後的筆記，若有錯誤歡迎隨時和我聯繫
