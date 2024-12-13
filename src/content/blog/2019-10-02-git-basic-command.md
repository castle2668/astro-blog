---
title: '基本 Command 操作與 Git 指令'
excerpt: '從大二開始接觸前端到現在也快兩年了，途中有煩人的考試，還有充滿雲組員的專題 👻 不過還是陸續學習了 HTML、CSS、jQuery、RWD、JavaScript、Bootstrap，而現在終於要回頭補上 Git 了！雖然目前用 Github Desktop 也可以完成大部分需要的動作，不過 Git 也是遲早要學會的東西，剛好最近的進度告一段落，就順便學個 Git 當作休閒放鬆一下吧。'
tags: ['git']
date: 2019-10-02
author: 'Huang, Yung-Hsiang'
image: 'development.jpg'
slug: 2019-10-02-git-basic-command
---

## 基本 Command 指令

1. 移動路徑：`cd 路徑`
2. 回上一層：`cd ..` (P.S. 是兩個 .. 不是一個 .)
3. 展開列表：`ls`
4. 開新資料夾：`mkdir 資料夾名稱`
5. 開新檔案：`touch 檔案名稱`

> Windows 請用 **git bash** 來進行操作，因為 Windows 預設的命令提示字元沒辦法使用「開新檔案」與「展開列表」。

## Git 基礎指令

### 基礎設定

1. 查詢版本：`git version`
2. 查詢設定列表：`git config --list`
3. 輸入姓名：`git config --global user.name "你的名字"`
4. 輸入 Email：`git config --global user.email "你的 Email"`

### 新增本地 / 遠端數據庫

1. 在本地資料夾新增數據庫：`git init`
2. 複製遠端數據庫：`git clone 遠端數據庫網址`
3. 推送數據庫到 Github：`git push`

### 增加 / 刪除檔案

1. 增加檔案進入索引：`git add 檔案名稱`
2. 增加全部檔案進入索引：`git add .`
3. 查詢狀態：`git status`
4. 顯示歷史紀錄：`git log`
5. 將索引提交到數據庫：`git commit -m '更新訊息'`

### 忽略檔案

使用 **.gitignore** 來忽略檔案

1. `touch .gitignore`：新增 .gitignore 檔案，在該檔案裡新增文字可忽略檔案
2. `*.html`：忽略全部 HTML 檔案
3. `folder/`：忽略資料夾，例如：`css/` 忽略名稱為 css 的資料夾

> 詳細可參考 [gitignore 大全](https://github.com/github/gitignore)，裡面寫到很多程式語言通常會忽略哪些檔案，像是 SASS 會忽略掉 .sass-cache 裡面的 `\*.css.map`

### Git 還原指令

#### 取消索引

1. 單一檔案取消索引：`git reset HEAD 檔案名稱`
2. 全部檔案取消索引：`git reset HEAD`

#### 還原檔案

1. 恢復單一檔案到最新 commit 狀態：`git checkout 檔案名稱`

   > 小招：用於寫錯卻又不知道錯在哪裡的時候，直接幫你還原到還沒寫之前！

2. 還原工作目錄與索引，會跟最後一次 commit 保持一樣：`git reset --hard`

   > 大絕招：一次還原整個工作目錄

3. 刪除最近一次 commit：`git reset --hard HEAD^`
4. 上面語法如果刪除錯了可以再用此語法還原：`git reset --hard ORIG_HEAD`
5. 刪除最近一次 commit，但保留異動內容：`git reset --soft HEAD^`
6. commit 後發現有幾個檔案忘了加入進去，想要補內容進去時：`git commit --amend`

> 以上資源是我自己整理過後的筆記，若有錯誤歡迎隨時和我聯繫
