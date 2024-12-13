---
title: 'Operating System: Introduction'
excerpt: '覺得之前課堂上講的 OS 很抽象，因此打算寫個筆記複習，考試前也多少有幫助吧！本文介紹作業系統的定義以及基本概念。'
tags: ['os', 'nuk']
date: 2019-07-27
author: 'Huang, Yung-Hsiang'
image: 'development.jpg'
slug: 2019-07-27-nuk-os-introduction
---

## 作業系統介紹

### 定義

Operating System (OS) 是讓使用者妥善使用軟硬體資源的一種系統程式，其中不同的對象對於作業系統也會有不同的要求，例如：

- 使用者：便利、效能、圖形化介面、使用者體驗
- 手機：方便、效能、省電
- 作業系統本身：電腦資源的分配者，負責管理且公平分配資源

### 核心 (Kernel)

電腦隨時都在運行的核心程式，一開機就會執行。

- 系統程式 (System Program)
  - Kernel 安裝完就有，協助 OS 運作的程式
  - 應用程式 (Application Program)：Kernel 安裝後還要自己去安裝的程式
  - 其他協助使用者解決問題的程式
- 靴帶式程式、開機程式 (Bootstrap Program)
  - 通常是已經燒在 ROM，或是儲存在韌體、EEPROM 裡面，待載入主記憶體之後執行，作用是載入 Kernel 開機

### 中斷驅動式 (Interrupt Driven)

現在的作業系統是中斷驅動式 (Interrupt Driven)：如果沒有行程要執行、沒有 I/O 裝置要服務、沒有使用者需要回應時，則作業系統將安靜的進入等待事件的發生。

## 中斷服務判別

### 硬體中斷 (Interrupt)

I/O 等硬體設備需要 CPU 時，會對 CPU 發出中斷。

例如：I/O Interrupt。

### 軟體中斷 (Trap)

Trap 又稱為 exception，是一種軟體的中斷，當 Error 發生時就會發生 trap。

例如：用 Java 寫分數除以 0。

#### 何謂 System Call

使用作業系統某些服務的時候所產生的中斷，是由指令所引發的中斷，目的是為了要保護系統資源。

當使用者介面需要使用作業系統的相關服務時會需要呼叫。

System Call 非常底層，OS 通常會將它包裝成 API，方便使用者使用，好處是可攜性與易用。

例如：新增、刪除檔案。

#### System Call 的傳遞方式

- By Register（透過暫存器傳遞）
  - 傳遞快
  - 但是一次只能傳一個參數，超過 Register 許可值就無法執行
- By Address（指標）
  - 需要傳遞大量參數時可以用，將參數位址丟給 OS 去查詢
  - 缺點是較慢
- By Stack（暫存陣列）
  - First in, Last out
  - 大量處理，比暫存器慢

#### 直接記憶體存取 (Data Memory Access, DMA)

有些裝置會使用 DMA，允許大量資料轉移，且不需要中斷服務的介入。

通常用於需要高速傳送的裝置，例如：螢幕。

CPU 不介入這些大量資料的傳輸，而是改由 DMA 處理，待 DMA 完成才通知 CPU 來做處理，使得 1 次 CPU 收到的中斷可以處理很多東西。

### 中斷處理 (Interrupt Handling)

- polling：一個一個問
- vectored：每個裝置都有編號、根據中斷的編號找到該裝置

### 多重程式與分時系統

- 多重程式 (Multiprogramming)
  - 容許好幾個程式同時執行
- 分時系統 (Time-sharing system)
  - CPU 排程
  - 把時間分割成許多小塊分享給 Program，也是 Multi-programming

#### 差異比較

差異在 Time-sharing 系統盡量讓每一個 Process 使用相同份量的 CPU 時間 (Equal Share)。

例如：在有 3 個 Process 的 Time-sharing 系統中，每一個 Process 在單位時間中都有 1/3 的機會或時間。

Time-sharing 就是把時間分割成許多小塊，這部分又有分為以下幾種：

- 分享給 Process → Multi-process
- 分享給 Thread → Multi-threading
- 分享給 Program → Multi-programming (= Multi-process)

> 以上資源是我自己整理過後的筆記，若有錯誤歡迎隨時和我聯繫
