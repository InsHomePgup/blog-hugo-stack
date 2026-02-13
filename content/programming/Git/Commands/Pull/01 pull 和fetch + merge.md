---
title: "pull 和fetch + merge"
date: 2024-12-01
categories:
  - git
---

pull，拉取，用来同步本地仓库和远程仓库。

pull = fetch + merge?

同一个远程仓库，两个本地仓库。
A仓库提交一个commit到远程，现在我用B仓库进行fetch + merge


![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250102093738817.png)

``` shell
# B 仓库
git fetch
#  dd07c5a..8b661e6  main       -> origin/main
git status
# Your branch is behind 'origin/main' by 1 commit, and can be fast-forwarded.
# 直接merge，直接 ff到最新。
git merge 
# 比对fetch的远程仓库内容和本地仓库直接的差异
git diff origin/main
```

![|325](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250102094357843.png)
比对以后使用merge
```shell
# 直接merge
git merge
# 命名的merge
git merge origin/main
```
![|375](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250102094522887.png)


