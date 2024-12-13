---
title: 'Git 同步遠端數據庫'
excerpt: '使用 Git 與 Github 進行團隊合作時，會利用遠端數據庫做上傳與下載，同時也會出現 Git 衝突，本篇文講解如何處理這些狀況。'
tags: ['git']
date: 2019-10-08
author: 'Huang, Yung-Hsiang'
image: 'development.jpg'
slug: 2019-10-08-git-remote-repo
---

## git remote - 遠端數據庫

```bash
# 如何推送分支到遠端數據庫

# 查詢遠端數據庫
git remote

# 修改遠端數據庫名稱
git remote rename 原名稱 修改名稱

# 推送分支到遠端數據庫
git push origin master
# [origin = 預設遠端主機名稱] [master = 分支名稱]
```

> P.S. 只有在 master 時才能直接輸入 `git push` 推送到 Github 上

## git pull - 下載遠端數據庫

```bash
# 推送至遠端數據庫
git push origin master

# 下載遠端數據庫
git pull
```

### 無法 push 的案例（海豹腦補小劇場）

公司裡有「Sean」跟「漂亮阿姨」兩位工程師，Sean 下班後高興地看著動漫，看完覺得無聊所以寫了一些 Code 裝認真，完成後 Push 上去哩 :P

隔天，漂亮阿姨比 Sean 先到公司，她寫了一些 Code 之後也想要 Push，但是輸入 push 指令 `git push origin master` 後卻出現無法 push 的提示：

![GITHUB](https://i.imgur.com/qU1BLaO.png)

向 Google 詢問過後，漂亮阿姨才知道原來 GitHub 上面有自己還沒抓下來的檔案，於是輸入 `git pull` 把還沒抓下來的 Code 下載下來。

然而這時候又跳出了一個視窗，原來是提示要幫忙自動合併的 vim 視窗。漂亮阿姨迅速輸入 wq! 離開視窗，並完成了合併 (merge)，並且再用 `git log` 查詢，確認有出現自己 Push 的檔案。

![GITHUB](https://i.imgur.com/6ZET7Hb.png)

在這之後，Sean 也使用 `git pull` 取得漂亮阿姨新 Push 的檔案哩，並且向漂亮阿姨解釋原理：  
「總而言之，妳一定要先拿到我的 Commit 紀錄，才能繼續 Push 東西上去，即使有時間先後順序也沒關係，Git 會自動做合併的動作。因此，當妳出現無法 Push 的時候，就代表遠端有 Code 是妳還沒有 Pull 的」。

從此以後，Sean 與漂亮阿姨利用著 Git 進行各種合作，可喜可賀！全劇終。

## git fetch

劇終不代表結束，而只是以另一種形式延續…  
沒有啦！這邊只是想再提一些小觀念。

剛才的 git pull 就是 **將遠端分支與本地分支進行合併 (merge)**。  
但是有時候我們不希望 pull 下來之後，導致自己的數據庫太亂，或者擔心有衝突時，可以先使用以下這個指令：`git fetch origin(遠端數據庫) branch1(遠端分支)`

這時候就會多出一個 **FETCH_HEAD** 的分支，這是遠端數據庫的分支，此時尚未合併，所以我們可以等到看過分支，覺得沒有問題後，再合併 FETCH_HEAD。

謹慎一點也不錯嘛 :D

> 以上資源是我自己整理過後的筆記，若有錯誤歡迎隨時和我聯繫
