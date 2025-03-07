---
title: Git(5)---分支---branch
date: 2025-02-23
categories:
  - git
tags:
  - git
---

git 最无敌屌炸天的功能。  branch 分支。

分支是非常非常重要的，可以说虽然我们的日常丝滑小连招就是 add + commit + push

这些是基础，是一条直线。

但是我想我们的 git 树能开枝散叶，就会用到分支

分支的存在让我们代码操作变得非常的自由，不再拘谨

当我想创建一些实验性的代码的时候

当我当前的工作没完成但是我要去修复另外一个功能的时候

当我想添加一些可能会出意外的依赖的时候

当我想测试合并一些代码而不至于崩溃影响到我的程序

那么分支，git 的核心奥义

说实话一个健康的项目，必然有很多分支来控制版本。

feat/xxx  新特性

fix/xxx 修复

hotfix/xxx 热修复

chore/buildxxx 杂项

merge/20250101  合并测试

与分支相伴的是合并（merge）

``` shell
# 查看当前我所在的分支
git branch

# 查看全部分支
git branch -a

# 合并新特性 new-book
git merge feat/new-book

# 合并 解决345这个issue的代码
git merge hotfix/345

```

```shell
# 创建并切换到新分支
git switch -c branchName

# 修改分支名称
git branch -m old new 

# 删除本地分支
git branch -d branchName

```







