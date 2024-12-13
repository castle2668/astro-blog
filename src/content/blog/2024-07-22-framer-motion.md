---
title: '為你的 React Apps 加上動畫效果'
excerpt: '沒有動畫效果的 Web Apps 不是說不好，但就是在完整度上少了一點什麼。如果可以適當添加一些動畫效果，除了可以讓網站看起來更加用心，也可以吸引使用者持續瀏覽。本文會介紹前端加入動畫效果的幾種方式，包含 CSS Transitions、CSS Animations，以及 Framer Motion 這套動畫效果 Library。'
tags: ['react', 'css', 'framermotion']
date: 2024-07-22
author: 'Sean Huang'
image: 'react.jpg'
slug: 2024-07-22-framer-motion
---

介紹順序會從 CSS 開始，最後提到 Framer Motion 的使用。許多情況下，我們或許不需要使用到 Framer Motion，而是使用 CSS 內建的 Transitions 與 Animations 就可以完成我們想要達到的效果。

## CSS Transitions

- CSS Transitions 可以讓你指定 CSS 屬性，讓它在兩個屬性值之間絲滑地切換

### 範例：旋轉圖標

CSS Transitions 常常被用在製作旋轉圖標上，許多下拉選單操作都會有一個三角形 ▲ 的圖標，我們可以為它加上 CSS 動畫效果，讓使用者點擊 ▲ 後會旋轉為一個倒三角形 ▼。

```jsx
// 假設已知我們有一個控制是否展開的狀態為 isExpanded
<div className={`item-details ${isExpanded ? 'expanded' : ''}`}>
  <button onClick={onViewDetails}>
    View Details <span className="item-details-icon">▲</span>
  </button>
</div>
```

在 CSS 裡把 `transition` 屬性加到要旋轉的圖標上面，這裡不要加在 `.item-details.expanded`，而是加在 `.item-details-icon` 上面，因為我們希望圖標不論是展開還是收合都能有旋轉的動畫效果。

```css
.item-details-icon {
  display: inline-block;
  font-size: 0.85rem;
  margin-left: 0.25rem;
  transition: transform 0.3s ease-out; /* CSS Transitions */
}

.item-details.expanded .item-details-icon {
  transform: rotate(180deg);
}
```

## CSS Animations

- CSS Animations 可以讓元素初始渲染時，執行自定義的 `@keyframes` 動畫

### 範例：卡片滑出效果

這個範例中，當 Modal 在關閉狀態時，Modal 並不存在於 DOM 之中，因此我們沒辦法使用 CSS Transitions 為它製作動畫效果，這種時候可以使用 CSS Animations 為 Modal 加上動畫。

```jsx
return (
  <>
    isShowModal && <Modal onDone={handleDone} />
  </>
)
```

當 Modal 開啟時，就會執行我們在 `@keyframes` 定義的 `slide-up-fade-in` 動畫效果，Modal 會從一開始的 `opacity: 0` 浮現到 `1`，同時位置也會透過 `translateY` 從下方 `30px` 的位置往上移動到 `0px`。最後的 `forwards` 則是指希望元素在動畫完成後，保留在動畫結束的狀態。

```css
.modal {
  top: 10%;
  border-radius: 6px;
  padding: 1.5rem;
  width: 30rem;
  max-width: 90%;
  z-index: 10;
  animation: slide-up-fade-in 0.3s ease-out forwards;
}

@keyframes slide-up-fade-in {
  0% {
    transform: translateY(30px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
```

## Framer Motion

- 強大且效果自然的 React 動畫效果 Library

安裝 Framer Motion 之後，可以引入 `motion` 並且選用它包裝過後的 HTML 元素像是 `motion.div`，準備完成後，我們就可以開始為元素加上動畫了。

```jsx
import { motion } from 'framer-motion'

function App() {
  return <motion.div />
}
```

可以通過以下屬性，為元素加上動畫：

- `initial`：元素加入 DOM 時，為將要執行的動畫加上「初始」值
- `animate`：指定要「執行」動畫的屬性與目標值
- `exit`：從 DOM「刪除」該元素時，希望顯示的動畫效果
- `transition`：動畫執行的細節設定，可以設置 `duration`、`type`、`stiffness` 等等
- `AnimatePresence`：延緩內部元件從 React Tree 中消失，等到動畫完成才真正地移除 DOM
- `whileHover`：whileXxx 定義的動畫效果，會在 Tapping 或者 Hovering 等時候執行
- `variants`：建立變數方便複用效果

> 更多詳細內容可以參考 [Framer Motion 官方文件](https://www.framer.com/motion/)

### 範例：位移效果

這個範例中，我們根據不同欄位的輸入值，讓方塊執行移動或旋轉動畫。

```jsx
import { motion } from 'framer-motion';

function App() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotate, setRotate] = useState(0);

  return (
    <motion.div
      animate={{ x y, rotate }}
      transition={{
        duration: 0.5,
        // debounce: 0 ~ 1, // Bouncing 程度 (0 = 無彈跳, 1 = 非常彈跳)
        type: 'spring', // 'spring', 'tween'
      }}
    />
  );
}
```

### 範例：取代 CSS Animations 完成卡片滑出效果

這個範例我們透過 `initial` 與 `animate` 這兩個屬性，讓 Modal 加入到 DOM 之後，從初始值執行動畫到指定的目標值，以完成由下往上滑出卡片的動畫效果。

除此之外，我們還可以加上 `exit` 為 DOM 移除的動作也加上動畫效果。也因此還必須加上 `<AnimatePresence>` 來包裝這個 Modal，讓 Framer Motion 確保這個元素已經執行了退出動畫才從 DOM 中移除 Modal。

```jsx
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  return (
    <AnimatePresence>
      <motion.dialog
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        open
      />
    </AnimatePresence>
  )
}
```

最後，再稍微講一下 `variants` 的用法，它可以為一個動畫效果建立一個變數，命名後可以讓你更方便複用這個效果。

舉例來說，剛剛的 Modal 就可以改為以下寫法，讓 Modal 的動畫效果看起來更好理解與管理。

```jsx
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  return (
    <AnimatePresence>
      <motion.dialog
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        open
      />
    </AnimatePresence>
  )
}
```
