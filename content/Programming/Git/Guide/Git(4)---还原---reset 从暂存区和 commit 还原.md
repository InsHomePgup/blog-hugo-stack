---
title: Git(4)---还原---reset 从暂存区和 commit 还原
date: 2025-02-23
categories:
  - git
tags:
  - git
weight: 5
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


```shell
# 添加abc.txt到暂存区
git add abc.txt
# 把abc.txt恢复到工作区
git restore --staged abc.txt
# 把abc从以追踪的状态撤回到未追踪的状态
git rm abc.txt --cached
```

```shell
# 软回退，代码还会回到工作区
git reset HEAD^ --soft
# 硬回退，丢弃commit的代码
git reset HEAD^ --hard
```

HEAD^ = 当前的最近的一次commit

HEAD^^ = 当前的最近的第二次commit

HEAD^^^ = 当前的最近的第三次commit

HEAD^^^^ = 当前的最近的第四次commit

HEAD^^^^^ = 当前的最近的第五次commit

这个 ^ 就是英文模式下的数字6上面的那个符号

....

？

git reset hashcode ....

add 

commit

reset

这些都是在几个git的区域之间工作的代码

工作区

暂存区

本地仓库

远程仓库

这是我们能操作的几个区域。

不同的git区域有不同的操作。

工作区就是我们的项目目录，包含追踪了的和未追踪的文件。

暂存区，add添加以后的区域

本地仓库 ，add以后并且commit 以后的区域

远程仓库，add并且commit并且 push以后的区域。

本地仓库的操作还算可以理解，远程操作将会复杂的多，因为你的同事那里也有你的版本。
