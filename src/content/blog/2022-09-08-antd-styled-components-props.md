---
title: '為什麼在 Ant Design 使用 styled-components 傳遞 Boolean Props 會出現警告'
excerpt: '最近要使用 styled-components 包裝 Ant Design 的元件時，想透過傳遞 Boolean 值的 props 來製作動態樣式，結果是成功了但是卻一直跳出警告訊息，這是為什麼呢？'
tags: ['react', 'antdesign', 'styledcomponents']
date: 2022-09-08
author: 'Sean Huang'
image: 'react.jpg'
slug: 2022-09-08-antd-styled-components-props
---

## 警告訊息範例

> [antd + styled-components props warning example | CodeSandbox](https://codesandbox.io/s/antd-styled-components-props-issue-2eq1jd)

這是會出現問題的程式碼，我們想傳遞 `primary` 給 styled-components 讓它根據所帶的布林值，去變換按鈕字體的粗細。

```jsx
const StyledButton = styled(Button)`
  color: palevioletred;
  font-weight: ${props => (props.primary ? 'bold' : 'normal')};
`

const App = () => {
  const [isPrimary, setIsPrimary] = useState(true)

  return (
    <div>
      <StyledButton primary={isPrimary}>test</StyledButton>
      <Button>test</Button>
    </div>
  )
}
```

打開 CodeSandbox 其實是能看到樣式成功出現的，只是 Console 中會有 Warning 訊息。

![Warning Message](https://i.imgur.com/ixJ9xBd.png)

這個 Warning 是指我們傳遞了「非標準」的屬性給 DOM 元素，如果要傳遞非標準的屬性，建議我們改用 String，因為 DOM 不接受非標準的 Boolean 屬性。

什麼是標準的 Boolean 屬性呢？其實我們應該都使用過，像是 `checked`、`disabled`、`readonly`、`required`、`selected` 等等都是，這邊就不全部列舉出來。

而除了上述之外，我們自己定義的屬性像是 `primary` 就是非標準的屬性哩。

## 其實是 Ant Design 的問題

等等！仔細一看，我們是將 Boolean 傳遞給 Ant Design 元件，並不是直接傳遞給 DOM 元素呀！？

沒錯，其實正常來說，我們自己創造的 Component 是「可以」傳遞非標準屬性的，反正只要你沒有傳到 DOM 身上，你想怎麼傳都沒關係！

問題就在於我們這裡使用了 Ant Design 這個套件，由於 Ant Design 會把自己無法識別的 props 再往下傳給 DOM 元素，導致 props 變成 HTML 中的非標準屬性，而 HTML 雖然還是會幫我們顯示出來，但是 HTML 會建議（警告）我們將它轉為字串。

## 解法一：使用字串

既然如此，第一個解決方法就是聽取建議，乖乖地把布林值轉成字串來傳遞。

```jsx
// 使用字串的 "true"

const StyledButton = styled(Button)`
  color: palevioletred;
  font-weight: ${props => (props.primary === 'true' ? 'bold' : 'normal')};
`

const App = () => {
  const [isPrimary, setIsPrimary] = useState('true')

  return (
    <div>
      <StyledButton primary={isPrimary}>test</StyledButton>
      <Button>test</Button>
    </div>
  )
}
```

## 解法二：Transient Props in styled-components (v5.1)

或許是太多人遇到這個問題了，所以 styled-components 官方在 5.1 版本後也提供了一個新的屬性，稱為 [Transient props](https://styled-components.com/docs/api#transient-props)。

Transient props 的作用就是「防止」被 styled-components 使用的 props 被傳遞到底層的 React 節點，或是渲染到 DOM 元素上。

使用方式：在 prop 名稱前面加上一個 Dollar Sign ($)，可以把這個 prop 變成一個臨時的 prop (Transient props)。

```jsx
// primary -> $primary

const StyledButton = styled(Button)`
  color: palevioletred;
  font-weight: ${props => (props.$primary ? 'bold' : 'normal')};
`

const App = () => {
  const [isPrimary, setIsPrimary] = useState(true)

  return (
    <div>
      <StyledButton $primary={isPrimary}>test</StyledButton>
      <Button>test</Button>
    </div>
  )
}
```

使用時要注意 styled-components 的版本喔，因為 Transient props 是在 v5.1 以上才可以使用的屬性。

> 以上資源是我自己整理過後的筆記，若有錯誤歡迎隨時和我聯繫
