---
title: 'Operating System: Scheduling'
excerpt: '本文介紹作業系統中「排程」的基礎概念，主要是在講四種演算法 FCFS、Priority Scheduling、SJF、RR，並說明各演算法延伸出的概念。'
tags: ['os', 'nuk']
date: 2019-07-30
author: 'Huang, Yung-Hsiang'
image: 'development.jpg'
slug: 2019-07-30-nuk-os-scheduling
---

## 排程的四種演算法

### FCFS

- 先來先做
- Convoy effect
  - 很多短時間的 Process，都在等一個長時間的 Process 時，所產生的效應

### Priority Scheduling

- 號碼牌 (Priority) + FCFS
- Starvation
  - 解決方法：Aging → 將等待了長時間的 Process 的優先權提高

### SJF

選擇執行當前 Process 裡 Burst Time 最小者。

- Non-preemptive SJF：不會被插隊
- Preemptive SJF：可以插隊，又稱 Shortest-remaining-time-first

### RR

- q + FCFS
- 公平輪流
  - q 太大：等於 FCFS
  - q 太小：Context Switch 過多

## Multilevel Queue

把 Ready Queue 分成兩種 queue：

- Foreground queue
  - 需交談
  - I/O Bound Process
  - FCFS
- Background queue
  - 需批次處理
  - RR

缺點：有些 process 可能做上面的演算法比較好，但是不能上去做。

## Multilevel Feedback Queue

- 允許 Process 在 queue 之間移動，是一種 Aging 技術的形式
- 比起 Multilevel Queue，可以互相連通，較靈活

## 硬體多工

### Muti-processor

- Asymmetric multiprocessing
  - 非對稱式
  - 其中一個 CPU 主導排程分配
- Symmetric multiprocessing
  - SMP
  - 每一個 Process 自己來做 Scheduling
  - 現在電腦大多都是 SMP 架構

### Multicore Processors

多顆 CPU 封裝成一顆，比 Muti-processor 更快更省電。

## SMP 架構中，CPU 的溝通問題

### 溝通問題：NUMA

local/remote data access 時間不一致的現象。

### 解決方法：Process affinity

盡量安排所有東西都在同一個 processor 上做，盡量減少跨部門動作。

- 硬性 hard affinity：強迫安排
- 軟性 soft affinity：盡量安排

但是這樣處理的結果，導致某些 CPU 閒置 (idle) 或 Overload！

### 再次解決：Load balancing

- Push migration：Loading 太重的 processor 丟掉工作
- Pull migration：閒置的 processor 去其他 CPU 拿工作

## Real-Time System

保證每個 Process 可以被即時執行，不會有很長的等待時間，且能夠在 Deadline 前完成任務。

一般 Real-Time System 分成兩類：

- Soft Real-Time System：盡量達到即時（影片播放器）
- Hard Real-Time System：不允許延遲（煞車系統、安全氣囊）

## Real-Time Scheduling

### Rate Montonic Scheduling

- 一般 Real time 中最常使用到的演算法
- 類似 SJF，Process 的週期 (Period time) 愈短者，優先權 (Priority) 愈高
- 缺點是可能會超出 Deadline

### Earliest Deadline First Scheduling (EDF)

- 上述 Rate Montonic Scheduling 的改善方式
- 愈接近 Deadline 的 Process 給予愈高的優先權 (Priority)

### Proportional Share Scheduling

- 比較注重公平性
- 類似 RR 演算法
- 平均分配固定的區隔時間

例如：當前總共 CPU 時間是 T，共有 N 個 process 要分享 (N < T)，則每個 process 輪流做 N/T 的時間。

## 評估最合適的演算法

### Deterministic Modeling

每個演算法都給一個固定的工作量去做，看哪個花得時間最少。

### Queuing Model

使用 Little Formula 的統計結果來評估。

### Simulation

模擬當時的環境情況，並隨機產生數據去測試。

### Implementation

全部拿去實際操作，但非常耗時、耗資源。

> 以上資源是我自己整理過後的筆記，若有錯誤歡迎隨時和我聯繫
