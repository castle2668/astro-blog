---
title: 'Operating System: Synchronization'
excerpt: '本文介紹作業系統「同步」的概念。'
tags: ['os', 'nuk']
date: 2019-07-31
author: 'Huang, Yung-Hsiang'
image: 'development.jpg'
slug: 2019-07-31-nuk-os-synchronization
---

## 同步的三要件

### Mutual Exclution (互斥存取)

一次只允許一個 Process 進入 C.S.，不允許多個 Process 同時在各自的 C.S. 活動。

### Progress (進行)

若有一個 Process 正等待進入 C.S.，且沒有其他 Process 想要進去，則此 Process 可以在有限時間內進入。

若有多個 Process 有意願進入 C.S.，則可以在有限時間內挑選一個 Process 進入 C.S. (No Deadlock)。

### Bounded Waiting (有限等待)

若有 n 個 Process 在等待進入 C.S.，則最長需等待 (n-1) 個 Process 才能進入 C.S.，不能一直有 Process 佔用 C.S. (No Starvation)。

## Peterson's Solution

目的：以軟體程式方式解決同步問題，利用 turn() 與 flag[]。

架構：

```c
do{
	flag[i] = true;
	turn = j;
	while(flag[j]=true && turn==j);
		critical section
	flag[i] = flase;
		remainder section
}while(true);
```

## Mutex lock

利用 `acquire()`、`release()`，及以 busy waiting 限制要進入 C.S. 的 process，達成 Mutual Exclution。

例如：鑰匙。有人使用就會拿走鑰匙 (available = false)，使用完就會釋放鑰匙 (available = true)。

## Semaphore

是一種解決同步問題及臨界區設計的「資料型態」。

C 語言宣告方式：

```c
Samephore *S = make_samephore(1);
```

與 Mutex lock 類似，提供 `wait()` 及 `signal()` 來控制要進入 C.S. 的 process。

- `wait()` 以 `block()` 方法，將 Process 放在 Waiting Queue (FIFO) 等待
- `signal()` 以 `wakeup()` 方法，將 Process 從 Waiting Queue 拿到 Ready Queue

差別：前者從 C.S. 中的 Process 釋放鑰匙使用權，後者則可能是從其他 Process 釋放使用權。

> 以上資源是我自己整理過後的筆記，若有錯誤歡迎隨時和我聯繫
