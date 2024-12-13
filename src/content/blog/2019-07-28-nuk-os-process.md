---
title: 'Operating System: Process'
excerpt: 'Program、Process、Thread 傻傻分不清楚？本文介紹作業系統 Process 的概念。'
tags: ['os', 'nuk']
date: 2019-07-28
author: 'Huang, Yung-Hsiang'
image: 'development.jpg'
slug: 2019-07-28-nuk-os-process
---

## Program vs. Process vs. Thread

### Program

靜態的指令集 (File)，例如：秘密小文件、週記、Hello World 程式等等。

### Process

正在執行的指令集，有被載入主記憶體的 Program (Executable File)。

首先會先被傳入 Ready Queue（準備變成 Process 的動作），再來被載入主記憶體、載入 CPU 裡面正在執行。

簡而言之，就是正在執行的程式。

### Thread

Process 的小分身，寄生在 Process 裡面，共用 Process 的記憶體，而且自己也擁有一個獨立的空間 (Stack) 可以做自己的事情。

例如：Word 拼音檢查的紅線。

如果拼音檢查也寫成 Process 的話，Word 的 Process 會先被關掉才能做拼音檢查。

### 小結

一定要有 Process 才會有 Thread；一個 Process 有好多個 Thread（看看我們常用的 Chrome 就知道）。

## Process 組成架構

Text：一個 C 語言的程式

Data：全域變數

Heap：動態記憶體配置

Stack：放一些暫存的資料

### I/O-bound process

平常的程式通常是 I/O 與 CPU 這兩個 bound process 結合起來的。

- I/O-bound process
  - 通常我們較多使用 I/O 的東西使用
  - 例如：Word processor
- CPU bound process
  - 需要 CPU 不斷運算的程式
  - 例如：算圓周率

### Process 狀態及流程

New：新增一個 Process 出來

Ready：程式載入記憶體

Running：正在跑，Process 正在運算

Waiting：有中斷，進入等待

Terminated：此 Process 結束

## Process Control Block, PCB

像是 ER 圖用資料庫存起來，或者像是排球紀錄表，而 OS 管理 Process 所使用的紀錄表，就叫做 PCB。

PCB 有以下幾個重要資訊：

- Process State：上面提到的那五個狀態，像是 new 與 ready
- Process Number：即 Process 的 ID
- Process Counter：記錄下一個 Process 的位址
- CPU Registers：紀錄一些中斷資訊

## 排程器

### 短程排程器 (Short-Term Scheduler)

不管哪個 OS 都一定有。

因為 CPU 暫存器大小有限，所以會挑選哪些 Process 最適合現在做、最有效率。

### 中程排程器 (Median-Term Scheduler)

類似資源短程排程。

在 Process 載入 CPU 之前，已經通過了長程、短程排程器的篩選，使 CPU 以最有效率的排程完成 Process 們。但是排程的 Process 愈多，Content Switch 轉換的次數就愈多，代表 Degree of Multi-programming 愈高，也就是 CPU 大部分的時間都在做 Content Switch。

因此，中程排程器就會在 Degree of Multi-programming 過高的時候，挑選幾個 Process 回到 Ready Queue。例如：Content Switch 轉換太頻繁時，100 個工作 1000 秒會完成，其中 CPU 花 500 秒在轉換工作，這對 CPU 來講很沒效率！

這時候就需要中程排程器，把幾個 Process 拉回 Ready Queue。以下三個例子都是發生中斷，而使得 Process 跳回 Ready Queue：

- 需要鍵盤或滑鼠，產生 I/O Request、中斷，先放在 I/O Queue 裡面再逐一使用
- 某一個 Process 使用時間到了，它會先跳回 Ready Queue，再重新分配
- OS 發現其他東西有中斷，做 Context Switch

### 長程排程器 (Long-Term Scheduler)

不一定每個 OS 都有。

看哪個 Process 適合現在載入主記憶體，將它放入 Ready Queue。

## Context Switch

轉換 CPU 至另一個行程。先儲存舊行程的狀態，再載入新行程的狀態。例如：A 發生中斷，要把 A Process 的 PCB 表轉換成 B Process 的 PCB 表，才能繼續執行。

有點類似交接班表。

花的時間的多寡取決於硬體的快慢。

## Process 的溝通方式

- 獨立的 Process (Independent Process)
  - 獨立不受其他 Process 影響
- 需要溝通的 Process (Cooperating Process)
  - 例如：「洗手」這個 Process 必須搭配「開水龍頭」這個 Process 才能達成洗手的動作
  - 用 Inter-process Communication (IPC) 溝通

### Inter-process Communication (IPC)

- 共享記憶體 (Shared Memory)：Process 之間共用一個記憶空間，你的資料就是我的資料，我的資料就是你的資料。
- Message Passing (Block send/receive, rendezvous)
  - 兩個 Process 中間會多一個 Process Queue（類似郵箱的功能）暫存，需要的 Process 可以從這裡拿取資料
  - 隔開來多一個 Queue 去傳送
    - Blocking send：確保一定寄出
    - Blocking receive：確保一定收到
    - Rendezvous：兩者兼具，確保一定會寄出去，也確保一定會收到

## Client-Server 之間 Process 的傳遞

### Socket

IP 位址 (IP Address) + 服務口 (Port) = A Socket

- 3 種 Socket 方式：
  - Connection-Oriented (TCP)：確保兩邊都活著，規範嚴謹、動作多、檢查需要時間
  - Connectionless (UDP)：串流影音、通常需要大量傳遞的
  - Multicast Socket（類似廣播）：傳播出去讓很多主機連接
- 使用 Socket 是比較底層、有效率的，通常傳一些位元、字串等比較難懂的東西，會一個一個傳

### Remote Procedure Call, RPC

運用在應用層（最上層）的服務。

把需要的東西（服務）包起來傳出去給其他主機，就像是一台主機本身有另一台主機的東西（服務），最常見的例子像是分散式網路服務、遠端管理、NFS 檔案分享等等。

## RPC 傳遞中的一些小問題

### XDR 轉換

- 不同主機，定義存取（儲存記憶體）的方式不同
- Big endian：數字最大的東西放在記憶體位置最大的地方
  - 例如：1 儲存在 A；5 儲存在 E
- Small endian：數字最小的東西放在記憶體位置最大的地方
  - 例如：1 儲存在 E；5 儲存在 A
- 造成雙方聽不懂、雞同鴨講的問題，因此需要一位翻譯、代理人，也就是 Stub

### Stub (proxy)

主要就是做 XDR 轉換 (External Data Representation)，也就是轉換 Big/Small 的部分。

XDR 的意思是一種通用的格式，Big/Small Endian 的資料經過 Stub 都會轉換成這種大家都看得懂的格式。

Stub 轉換成 XDR 送出去的動作是 Marshalling，即翻譯好丟出去，例如：中翻英，再用英文講出去的這個動作）。而 Stub 收到 XDR 格式的資料就會依自身主機需求，轉換成 Big/Small Endian (Unmarshalling)，例如：聽到英文，轉成中文再傳給 Server 聽（解譯）。

過去 big endian 比較常見，但現在的作業系統 big 跟 small 兩種都會，比較少出問題了。

### RPC 在 TCP/IP 傳輸時可能漏掉東西，或是多傳了幾次

改善的方式與技術：

- Exactly once（僅處理一次）：一定要剛好傳一次就到
  - 資料不能重複，要求 100%，做法較難
  - 使用 match maker，類似三方交握的方法
- At most once（最多處理一次）：最多傳一次就到
  - 一直傳，使用時間戳記 (Timestamp) 紀錄，發現時間戳記不對就丟掉，因此資料可能會丟失
  - 大部分都是這個方式，因為比較簡單

## Pipe

仿照硬體 Pipeline 的行為，在 Process 之間開一條或數條線來放資料。

電腦如果要一次做很多工作，會先把動作切成碎片，每個工作輪流做一些、快速切換，讓人看起來是很多工作同時被做。

有讀取端 (Read-end) 與寫入端 (Write-end)，就叫做 Pipeline，輸入 Linux 指令或 CGI 時會看到。

Pipe 又分為 Ordinary Pipe（單向）與 Named Pipe（雙向）。

### Ordinary Pipe

兩個 Process 的 `f_inode` 會指向同一個地方，`f_op` 代表這個 Process 是要做什麼的，有 `fd[0]` (Write end) 跟 `fd[1]` (Read end)。

步驟：

首先有一個人先建管線，假設是 A process 自願建 Pipe 跟 B 連接，A 的 `f_inode` 連到 Pipe，此時 A process 的 `f_op` 有寫入端與讀取端。

A Process 透過 `fork()` 的動作，複製子 Process (`fd[0]`, `d[1]`) 的定義給 B Process，接著 B 把它的 `f_inode` 也連起來，此時兩邊都有讀取端與寫入端。

因為一端只能是讀或是寫，所以 A 把自己的讀取端砍掉，B 把自己的寫入端砍掉，變成 A process 寫給 B Process 去讀取。

### Named Pipe

有一端可以同時是讀 + 寫。

> 以上資源是我自己整理過後的筆記，若有錯誤歡迎隨時和我聯繫
