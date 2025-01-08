---
title: How to use git branch
date: 2024/05/09
tags:
  - git
categories:
  - git
sticky: 1
---
Git Branch 
##### 创建与切换分支
git checkout 也有一些分支的操作，更推荐使用switch来切换分支。

``` shell

# 切换分支
git switch [branchName]

git checkout [branchName]

# 创建并切换到一个新分支
git switch -c [branchName]
```

##### 查看本地分支和远程分支

```shell
# 查看本地分支
git branch

#查看远程分支  -r remote
git branch -r

# 查看全部分支
git branch -a

```

##### 删除本地分支和删除远程分支

```shell
# 删除本地分支
git branch -d [branchName]

# 强制删除分支，未合并的分支也会删除
git branch -D [branchName]

# 删除远程分支
git push origin -d [branchName]

git push origin --delete [branchName]

# 删除远程已经删除但是本地还存在的分支
git remote prune origin

```

##### 重命名分支

``` shell
git sw -c feat/A
# Switched to a new branch 'feat/A'
git br -m feat/A feat/B

# move  -m 类似linux下的mv 重命名
```