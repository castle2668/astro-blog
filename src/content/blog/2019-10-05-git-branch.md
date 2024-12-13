---
title: 'Git 分支、標籤、暫存檔案'
excerpt: '在公司或團隊中，與其他人一起分工工作時，分支 (branch) 是相當重要的觀念喔。'
tags: ['git']
date: 2019-10-05
author: 'Huang, Yung-Hsiang'
image: 'development.jpg'
slug: 2019-10-05-git-branch
---

## 什麼是分支

通常 **master** 是指 release 給客戶，完成度較高的版本。

> 以一個尚未建立分支系統的專案，我們平常 commit 上去的版本紀錄，就是 master。

有時候我們修改 Bug 或是增加新功能後，只是想要上傳看看，此時如果害怕把原本其他的部分改壞，我們就會再開一條新的 Branch。  
這條新的線就是 **develop**，通常會先在 develop 等分支確認好開發完成以後，才會加入、合併到正式上線 (master) 的版本。

這樣就不用擔心公司上傳給客戶的版本檔案之中，有些地方被工程師改壞哩 :P

## HEAD 指標

HEAD 就是目前所在位置的指標，可以幫助我們瞭解目前所在的位置。

## 分支創立

- **git branch**：瀏覽目前分支
- **git checkout 分支名稱**：切換分支（分支名稱輸入前 4 碼即可，要輸入前 5, 6, 7, 8 碼也行）
- **git checkout master**：復原成 master

例如：使用 `git branch feature1` 創立新分支 feature1 後，可以用 `git checkout feature1` 切換至 feature1 的分支。

切換至 feature1 分支後，我們編輯與上傳的檔案就只會在 feature1 之中，如果再切換回 master，我們進行的改變就會復原哩 :D

## 分支合併

- **git merge 分支名稱**：合併指定分支到目前的分支

以下說明如何把 master 跟 feature1 合併在一起。

合併流程：

1. `git checkout master` 把 HEAD 切換到 master
2. `git merge feature1` 把 feature1 合併到 master

這樣 master 就會出現 feature1 修改過後的檔案了。

## 分支衝突

### 自動合併

如果有人直接改了 master，而另一個人在做 feature1，導致之後合併時產生衝突的話，我們該如何解決呢？

這邊先來看一下衝突出現時的畫面。

以下衝突是可以直接合併的 vim 編輯器畫面，如果是出現這樣就不用擔心，直接關掉或輸入 wq! 就可以了，這只是一個提醒的作用 :P

![GITHUB](https://i.imgur.com/LpJyKaD.png)

但是有時候會出現需要進行更改、取捨的合併衝突，這會出現在合併後的檔案有增減的時候，編輯器會問你要保留哪一個分支的內容，這時候就要慎選哩 :P

### 手動合併

剛才有提到第二種情況，就是得決定要保留哪一個分支的內容，這種情況該如何解決呢？

首先，我們先假設小明與漂亮阿姨正在一起寫 Code！這是小明在 master 分支寫的 index.html 檔案。

![GITHUB](https://i.imgur.com/ojjpCv5.png?1)

而下方則是漂亮阿姨在 feature1 分支寫的 index.html，它們是修改同一個檔案，所以比較晚提交的人就會遇到需要合併衝突的問題囉。

![GITHUB](https://i.imgur.com/baEAUF3.png?3)

小明在寫完 Code 之後，由於想要 Push 到遠端，所以開始將其他人完成的分支 Merge 進來，他在 master 輸入 `git merge feature1` 後出現了合併衝突的訊息。

訊息內容大概是在說：本來打算幫你自動合併，但是發現內容有衝突，你需要先修正衝突之後，才能解決這個問題。

![GITHUB](https://i.imgur.com/4i9wkfg.png)

解決衝突時，我們會看到程式碼多出一堆 > = < 的符號，這是在告訴我們上面那行 h1 是 HEAD，也就是 master 分支新增的內容，而下面那行 h1 是 feature 的內容。

![GITHUB](https://i.imgur.com/CUW3QIE.png)

這邊就可以視情況決定，例如我們可以選擇把兩方的 Code 都保留下來。
這種方式就是 **手動合併**，當需要我們手動合併的時候，通常就是 Git 沒辦法幫我們自動合併的時候哩。

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <link rel="stylesheet" href="all.css" />
  </head>
  <body>
    <h1>master</h1>
    <h1>feature</h1>
  </body>
</html>
```

## 標籤

標籤提供查看之前「版本」的功能，同時還能增加備註，例如：v1, v2。

- 查詢標籤：`git tag`
- 查詢詳細標籤：`git tag -n`
  > 沒特別新增備註的標籤，預設會顯示 commit 的內容
- 刪除標籤：`git tag -d 標籤名稱`
  > 刪除標籤不會刪除掉 commit 的內容
- 新增輕量標籤：`git tag 標籤名稱`
  > 單純加標籤
- 新增標示標籤：`git tag -am "標註內容" 標籤名稱`
  > 詳細的標籤，可以加一些備註
- 切換到標籤的 commit：`git commit 標籤名稱`
  > 可以回到該版本，查看該標籤版本的歷史紀錄
  > 可以再用 `git commit master` 回到 master 線

## Git Stash 暫存檔案

某天，小明正在開發 A 專案 (master)，結果 Coding 到一半時，主管跑來交代小明新的 B 專案 (issue)，並告訴小明 B 專案比較緊急，要小明優先處理這個 issue。  
但是小明不想把目前未完成的檔案 Commit 上去，那麼他該如何 **暫時儲存** 手上正在開發的檔案呢？

答案就是使用 `git stash` 來儲存工作目錄與索引。

儲存後，我們可以輸入 `git stash list` 查看原本的檔案。  
當小明處理好 issue 後，可以透過 `git stash pop` 叫回之前的東西。

所以 stash 的好處就是，我們可以把開發中的東西先儲存起來，後續再將它們召喚回來。  
召喚回來之後，可以使用 `git stash drop` 清除最新的一筆暫存，或是用 `git stash clear` 清除全部暫存。

> 以上資源是我自己整理過後的筆記，若有錯誤歡迎隨時和我聯繫
