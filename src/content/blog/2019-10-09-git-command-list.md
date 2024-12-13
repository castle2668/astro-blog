---
title: 'Git 常用指令大全'
excerpt: '在修習六角學院的 Git 課程後所整理的指令大全，在內容與順序上有做一些調整，方便讓之後使用 Git 的時候能夠做為參考筆記。'
tags: ['git']
date: 2019-10-09
author: 'Huang, Yung-Hsiang'
image: 'development.jpg'
slug: 2019-10-09-git-command-list
---

## 基礎設定

- 查詢版本：`git version`
- 查詢設定列表：`git config --list`
- 輸入姓名：`git config --global user.name "你的名字"`
- 輸入 Email：`git config --global user.email "你的 Email"`

## 新增本地 / 遠端數據庫

- 在本地資料夾新增數據庫：`git init`
- 複製遠端數據庫：`git clone 遠端數據庫網址`
- 推送數據庫到 Github：`git push`
  > master (若要推送分支請參考下方的遠端數據庫操作)

## 增加 / 刪除檔案

- 增加檔案進入索引：`git add 檔案名稱`
- 增加全部檔案進入索引：`git add .`
- 查詢狀態：`git status`
- 顯示歷史紀錄：`git log`
- 將索引提交到數據庫：`git commit -m '更新訊息'`

## 忽略檔案

使用 **.gitignore** 忽略檔案，使用流程：

1. 輸入 `touch .gitignore`：新增 .gitignore 檔案，在該檔案裡新增文字可忽略檔案
2. 在檔案中打上 `*.html`：忽略全部 HTML 檔案
3. 在檔案中打上 `folder/`：忽略該 folder。
   > 例如：`css/` 即忽略名稱為 css 的資料夾

## 還原指令

- 還原工作目錄與索引，會跟最後一次 commit 保持一樣：`git reset --hard`
  > 常用：還原整個工作目錄
- 全部檔案取消索引：`git reset HEAD`
- 單一檔案取消索引：`git reset HEAD 檔案名稱`
- 恢復單一檔案到最新 commit 狀態：`git checkout 檔案名稱`
  > 常用：還原單一檔案
  > 當你寫錯卻又不知道錯在哪裡的時候，直接幫你還原到還沒寫之前！
- 刪除最近一次 commit：`git reset --hard HEAD^`
- 上面語法如果刪除錯了可以再用此語法還原：`git reset --hard ORIG_HEAD`
- 刪除最近一次 commit，但保留異動內容：`git reset --soft HEAD^`
- commit 後發現有幾個檔案忘了加入進去，想要補內容進去時：`git commit --amend`

## 分支

- 顯示所有本地分支：`git branch`
- 新增分支：`git branch 分支名稱`
- 切換分支：`git checkout 分支名稱`
  > 例如：git checkout master 即為切換回 master 分支
- 合併指定分支到目前的分支：`git merge 分支名稱`
- 刪除分支：`git branch -d 分支名稱`

## 遠端數據庫操作

- 複製遠端數據庫：`git clone 遠端數據庫網址`
- 查詢遠端數據庫：`git remote`
- 將本地分支推送到遠端分支：`git push 遠端數據庫名稱 遠端分支名稱`
- 將遠端分支拉下來與本地分支進行合併：`git pull`

## 標籤

- 查詢標籤：`git tag`
- 查詢詳細標籤：`git tag -n`
- 刪除標籤：`git tag -d 標籤名稱`
- 新增輕量標籤：`git tag 標籤名稱`
  > 單純標籤
- 新增標示標籤：`git tag -am "備註內容" 標籤名稱`
  > 可加備註的詳細標籤

## 暫存

- 暫時儲存當前目錄：`git stash`
- 瀏覽 stash 列表：`git stash list`
- 還原暫存：`git stash pop`
- 清除最新暫存：`git stash drop`
- 清除全部暫存：`git stash clear`

> 以上資源是我自己整理過後的筆記，若有錯誤歡迎隨時和我聯繫
