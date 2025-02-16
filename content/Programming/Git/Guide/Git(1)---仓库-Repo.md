---
title: 仓库-Repo
date: 2025-02-14
tags:
  - git
categories:
  - git
---
本次Git旅程将在windows 下实践。不过其实旅途中也不需要太多有关操作系统的操作。

### Git Bash

我们所有的操作都在这里完成。

### Explorer
Windows资源管理器。

### Git Repository

Git Repo
git 仓库，所有的 git 命令都在这里面完成。
git 仓库一般就是一个文件夹，进行 git init 初始化以后。
项目目录下会生成一个 .git 文件夹。
那么这个文件夹便是一个 git 仓库。

### 创建一个仓库

到你喜欢的目录下面新建文件夹。

![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250216213139449.png)

进入文件夹
打开右键菜单后点击 Open Git Bash here

![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250216221044191.png)

或者就是右键 + 键盘 s

这个就是 windows 下 git bash 的主界面了，所有的 cli 都在这里完成。

![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250216221118051.png)


查看一下当前的 git 状态。

``` shell
git status
```

这个命令可以看到当前git 仓库的状态。
可以随意使用，没有任何需要注意的。
随着旅程的深入，status 会有很多我们值得关注的信息。

初始化一个 git 仓库，git 仓库目前就是一个文件夹。
初始化完成以后，我们继续执行 status，可以看到我们当前所在的分支（branch）是 ==main==。

``` shell
git init
git status
```


![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250216221517074.png)

```
On branch main
No commits yet
nothing to commit (create/copy files and use "git add" to track)
```

当前分支：main
没有历史 commit
没有东西可以 commit

OK，我们需要 git 帮我们做到管理我们的代码,但是现在我们仓库还是空空的。
其实在完成 init 命令以后，我们的仓库里多了一个隐藏文件夹 .git



![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250216223221041.png)





创建一个 git 仓库的方式就是一个文件夹 + git init 就可以。

本节的两个 Git 命令是

``` shell
# 查看当前 git 状态
git status

# 初始化一个 git 仓库
git init
```

### 总结

本节主要就是初始化一个 git 仓库，后续的操作都会在仓库内完成。
创建仓库会在目录下创建生成一个.git 的文件夹。目前我们不需要关注这个文件夹。
使用 git status 随时查看仓库的状态，仔细阅读提示的信息。