---
title: git gui推荐 - sublime merge
date: 2024-05-09
tags:
  - git
  - software
categories:
  - git
---
最早的时候写前端使用的是sublime text。现在这家的另外一个产品，git gui ，sublime merge也是挺好用的，看了一下许可证要$99，还是白嫖吧哈哈哈。

## add commit push 
可以很方便的add 和commit,右上角push + pull
![](https://raw.githubusercontent.com/InsHomePgup/blog-reco/main/imgs/sublime.png)

## branch remote tags

直接查看分支，其他分支可以控制显示和隐藏。
还可以管理多远程仓库，直接右键管理tag

![](https://raw.githubusercontent.com/InsHomePgup/blog-reco/main/imgs/branch.png)



## commit
快速查看commit和每次的变动的文件等等
这里还能看到commit相关的tag，还能看到合并路径，不过我现在的操作太简单，就是一条直线所以也没有这些。



![](https://raw.githubusercontent.com/InsHomePgup/blog-reco/main/imgs/Snipaste_2024-06-08_17-28-59.png)
## 一个非常好用的功能 - FileHistory

我在Mac端，快捷键 Command + P 打开控制台，输入File直接可以看到FileHistory的选项。

![](https://raw.githubusercontent.com/InsHomePgup/blog-reco/main/imgs/FileHistoryCmd.png)

输入文件名以后就可以直接看到有关这个文件的所有Commit和改动了，这个真的是太香了，用来调试一些奇奇怪怪的bug的时候可以看到是因为什么改动引起的。

## 比较两个commit的改动

直接Ctrl / Command在Commits的面板里点击两个commit就能查看了。这个也是非常香了。

## 查看执行的具体代码 

菜单里 Tools-show console

## 务必认真学习的CLI以及Git运行逻辑

GUI主要也就是在diff code，查看commit，简化一些cli的操作比较有用。是在对git以及git命令有一定深度了解以后才能使用的选项。毕竟如果都不知道这些操作背后是在运行什么，也会出现一些不可预料的代码事故。
另外一个角度来说，git的cli是全端通用的，而GUI客户端也只是在一些有gui的操作系统上使用。
真正学好Git来加强自己的代码调试是非常有用的。


