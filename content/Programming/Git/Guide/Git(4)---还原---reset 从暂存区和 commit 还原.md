---
title: Git(4)---还原---reset 从暂存区和 commit 还原
date: 2025-02-23
categories:
  - git
tags:
  - git
---
之前我们一直都在将代码添加到我们的仓库

丝滑小连招 add - commit - push

那么程序的 CURD 来说，光有 create 也是不合理的

Git - 还原

还原的场景

从暂存区还原

从本地 commit 还原

还原远程仓库到指定 commit

编辑 abc.txt


```
git rm abc.txt --cached
```

```

git reset HEAD^ --soft

git reset HEAD^ --hard

```