---
title: Git(3)--远程仓库与推送--remote + push
date: 2025-02-23
categories:
  - git
tags:
  - git
weight: 4
---

remote, 远程

之前 add、commit，都是单机操作

如果一个人一个设备，多人协作的话，我们需要一个远程仓库，作为我们的数据交换

远程仓库其实也是一个 git 仓库，它是在服务器上，也和我们本地的仓库有一点儿不一样的地方

这里用 github平台来创建远程仓库

还有很多常见的类似的平台,gitee,gitea,gitlab...

首先参照[这篇](../../config/03)去创建一个 ssh key 连接github

在github创建一个空的仓库

复制 ssh的仓库地址

```
git status

git remote add origin [仓库地址]

git remote -v

git push -u origin main

git status

```

这又是一套丝滑小连招，连接远程仓库并且推送代码
 
add 远程仓库的名称  远程仓库的地址

remote -v 去查看当前项目的远程仓库地址

push -u 目标仓库 目标分支

-u = upsteam

意思是设置上流分支

一个本地分支对应一个远程仓库的远程分支

push 与 pull 都是操作当前本地仓库的上流分支

所以我们也可以把自己本地的 main 分支的上流分支 设置成 master 或者其他之类的

但是名称一般都是一致的，不然也容易搞错


### 任务

重复 add - commit - push

流程

修改或者创建文件，模拟代码修改

使用 add + commit 生成本地 commit

使用 push 将commit 推送到远程仓库

尝试创建多个 commit 一起推送
