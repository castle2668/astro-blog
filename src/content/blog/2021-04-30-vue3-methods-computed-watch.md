---
title: 'Vue 3 Methods × Computed × Watch'
excerpt: '本文主要內容為探討 Vue 3 的 Methods、Computed、Watch 的寫法與相關知識。'
tags: ['vue', 'compositionapi']
date: 2021-04-30
author: '海豹人 Sealman'
image: 'development.jpg'
slug: 2021-04-30-vue3-methods-computed-watch
---

## Methods vs. Computed

- Methods：不會進行緩存，每次載入都會重新執行一次，但是可以傳入參數進行計算處理。
- Computed：會緩存計算資料，只要原始資料沒有被更改，Computed 就不會重新執行計算。

什麼是緩存呢？

當有一份資料被修改，導致外層 DOM 重新被渲染時，如果內層資料使用的是 Computed，那麼內層資料的這個 DOM 就不用重新渲染。  
但是，如果內層資料是使用 Function 得到的資料的話，Function 就會重新執行，因此就多跑了一次，效能也就會比較差。

選用方法：看需不需要傳入參數去做計算，只要不用傳參數，一律建議用 Computed 去計算資料並返回 DOM 上，才能達到緩存的效果。

範例一：用 Computed 重新包裝要呈現的字串，不會影響原本的資料內容。

```javascript
const App = {
  const { reactive, computed } = Vue;
  setup() {
    // 商品列表
    const listArr = reactive([
      { name: "白色海豹抱枕", money: 1400 },
      { name: "小貓咪披風", money: 600 },
      { name: "彩色圍巾", money: 800 },
      { name: "兔子娃娃", money: 800 },
      { name: "白雪飄風圍巾", money: 900 }
    ]);

    // 重組字串
    const newArr = computed(() => {
      const mapArr = listArr.map(item => {
        return { product: `${item.name} $: ${item.money}` };
      });
      console.log(mapArr);
      return mapArr;
    });

    return {
      newArr
    };
  }
};
```

範例二：當 reactive 的資料被用 Computed 包裝起來之後，要使用這個計算結果資料時，要加上 `.value` 才能使用！

我們透過 `console.log(newArr)` 可以看到它其實是一個物件，裡面的 `.value` 才是我們要使用的陣列資料。

```javascript
// 商品列表展開時的高度 (每個商品 40px)
const listHeight = computed(() => {
  return isOpen.value ? `${newArr.value.length * 40}px` : '0px'
})
```

## 資料監控 Watch

- 有三個參數：`要監控的值 (expOrFn)`、`改變時觸發的函式`、`{deep: true}`

### 改變時觸發的函式

改變時觸發的函式會回傳被更改後的值 (`newIndex`) 與更改前的值 (`oldIndex`)。

```javascript
// 監控一個 ref 純值
watch(index, (newIndex, oldIndex) => {
  console.log('index', newIndex, oldIndex)
})
```

### 要監控的值

Watch 第一個參數（要監控的值）可能包含以下幾種：

- 使用 getter 函式 (function return)，返回 ref 或 reactive 物件裡面的單一 key
- 監控一個 ref 純值
- 監控一個 reactive 物件整體

```javascript
// expOrFn 可以使用 JavaScript 表達式，或是一個回傳監聽目標值的函式
watch(
  () => refObject.value.index,
  (newIndex, oldIndex) => {
    console.log('refObject', newIndex, oldIndex)
  }
)

// 這邊不是要監控 reactive 物件，而是要監控 reactive 物件裡面單一的 key，所以使用 function return 的方式
watch(
  () => reactiveObject.index,
  (newIndex, oldIndex) => {
    console.log('reactiveObject', newIndex, oldIndex)
  }
)
```

試著監控 ref 與 reactive 整個物件，會發現如果監控整個物件，只有 reactive 可以被成功監控到。

所以如果要監控整個物件，那麼那個物件請用 reactive 來寫，而 ref 物件還是可以監控，但是不能監控整個物件，只能監控一個 key。

```javascript
// 只有 reactive 物件可以整個被監控
watch(refObj, newVal => {
  console.log('refObj', newVal)
})
watch(reactiveObj, newVal => {
  console.log('reactiveObj', newVal) // Proxy {idx: 1}
})

// ref 物件只能監控一個 key
watch(
  () => refObj.value.idx,
  newVal => {
    console.log('refObj', newVal) // refObj 1
  }
)
```

### 深層資料監控 deep

如果需要監控整個物件，但是公司又有規定要統一使用 ref 的話，那麼可以加上第三個參數 `deep`。

```javascript
watch(
  refObj,
  newVal => {
    console.log('data', newVal)
  },
  { deep: true }
)
```

但是 `deep` 是針對每一個 key 做掃描，所以效能耗費大，盡量還是少用，只有真的需要大範圍掃描時才使用。

## 回顧

看完這篇文章，我們到底有什麼收穫呢？藉由本文可以理解到…

- Vue 3 Methods 與 Computed 的使用時機與差異
- Vue 3 使用 Watch 監控資料的方式

> 以上資源是我自己整理過後的筆記，若有錯誤歡迎隨時和我聯繫
