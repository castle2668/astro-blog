---
title: 'Operating System: Multi-programming'
excerpt: '本文介紹作業系統 Multi-programming 的概念。'
tags: ['os', 'nuk']
date: 2019-07-29
author: 'Huang, Yung-Hsiang'
image: 'development.jpg'
slug: 2019-07-29-nuk-os-multiprogramming
---

## Multi-programming

### 並發 (Concurrent)

- 單核心的實現方式，只有一個執行緒
- 例如：利用排程建立班表，使多個 Process 快速切換處理，感覺好像同時處理很多事情（A 先做 1 秒、B 做 2 秒、C 做 1 秒）

### 平行、並行 (Parallelism)

- 真的可以同時進行多個 Process
- 多核心才能做、單核心不能做
- 兩個以上的執行緒

### 舉例說明

假設有 150 份 15 題的考卷，由 3 個助教來批改：

- Data Parallelism：每個助教分別改 50 份考卷（1 ~ 15 題）
  - 資料的分割
- Task Parallelism：每個助教改 150 考卷，分別改前、中、後 5 題
  - 指令的分割
  - 理論上 Task Parallelism 效率較好，但會有溝通的問題，所以實作上兩者速度會差不多

## Thread 的分類

有兩種不同階級的 Thread。

### User Thread

- 使用者端操作的部分的 thread
- 在 User 端使用 thread library 產生 thread
- e.g. Pthread, Win32 Thread, Java Thread

### Kernel Thread

- 提供 OS 服務的 thread
- 用來處理 OS 各種服務（e.g. system call, daemon 的使用，以及處理 User Thread）
- 三種方法：Grand Central Dispatch, Open MP, Thread Pool

## Multi-threading Model

### Many-to-One

- LWP：一個「負責排程」的小 process
- 最後還是全部分配給一個 Kernel Thread（感覺這個多執行緒有跟沒有一樣）

### One-to-One

- 一個 User Thread 各給一個專屬的 Kernel Thread
- 例如：Java 產生兩個 Thread，分別經過兩個 LWP，各自分配一個 Kernel Thread 去執行

這個一對一看似很美好，但是它一定要有一個機制去限制使用者產生的執行緒的數量！

因為不論是 User 還是 Kernel Thread，它的記憶體都是有限的，若不斷的生出一堆 User Thread，每個都還要再分配給一個 Kernel Thread，作業系統會受不了，會被榨乾的！  
（因此，又再衍生出以下這種比較折衷的方式…）

### Many-to-Many

顧名思義：多個連多個。

- 限制 Kernel Thread 的數量，讓無限多個 User Thread 去使用有限多個 Kernel Thread
- Kernel Thread 可能會爆掉，OS 可能被榨乾，所以改為只能產生有限的 Kernel Thread 的數量，而可以產生無限個 User Thread

因此可能會產生三個 User Thread 共用兩個 Kernel Thread 的狀況，同時又有另一個 User Thread 使用另一個 Kernel Thread 的一對一的狀況。

## Thread Pool

> 游泳池 → Swimming Pool  
> 水餃池 → Dumpling Pool  
> 執行緒池 → Thread Pool  
> 🤪🤪🤪

有工作時，thread pool 會彈出一個 thread 分派給 task 去執行，完成之後小蝌蚪會再回到 thread pool 待命，等待下一個工作。

如果所有 thread 都在工作的話，task 則先放到 Ready Queue 裡面等待，等到有 thread 遞補回來的時候才使用。

## Grand Central Dispatch

- 將一個一個工作包裹成 Block（小積木），放在 Dispatch Queue 裡面，再丟到 Thread Pool 去處理
- 跟 Thread Pool 根本 87% 像，只是包裝成 Block 跟換個格式而已
- 蘋果電腦執行的方式~~（果然尊爵不凡）~~

## OpenMP

- 跨平台
- 主執行緒用 fork() 產生一系列的子執行緒，結束後子執行緒用 join() 併回去主 thread，之後有需要的話再 fork()，做完再 join()

## Signal (訊號)

- 像是一種給 Thread 聽的 System Call
- User > user-defined signal > 自己寫程式產生 Signal
- Kernel > default signal > Kernel 預設的 Signal
- 可傳給特定的 Thread、所有的 Thread，或者傳給一些或任一 Thread

## 補充一個網路上看到的問題

- Q：兩個 Thread 進行 Context Switch 的時間是不是會比兩個 Process 進行 Context Switch 的時間短呢？為什麼？
- A：是的。因為 Process 的轉換需要的是一種記憶體空間的轉換，很花費時間；而 Thread 轉換時仍然處於同一個 Process，因此需要調度的東西比 Process 少很多，也就有效率很多了。  
  也是因為這樣大部份多工的程式（e.g. 拼音檢查）會使用 threading 來實作，而不是 multi-process。

> 以上資源是我自己整理過後的筆記，若有錯誤歡迎隨時和我聯繫
