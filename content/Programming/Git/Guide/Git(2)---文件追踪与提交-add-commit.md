---
title: Git(2)--文件追踪与提交-add-commit
date: 2025-02-16
categories:
  - git
tags:
  - git
weight: 3
---

## 前沿

status + add + commit 是单机版git 最重要的三个命令。

在前面一节 Repo 当中，我们已经创建了一个 git仓库。

接下去我们让 git 来追踪我们的文件。

## 操作区

 在目录下新建一个 abc.txt 文件模拟我们的代码文件。
 
 ![|597x282](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250216223437670.png)

在 bash 中使用 git status
``` shell
git status
```

![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250216223557755.png)

当前分支：main

没有历史 commit

未追踪的文件
abc.txt

### 文件追踪

没有可以提交的文件但是有未添加到追踪的文件（使用 git add 去添加）

执行 add + commit 的丝滑小连招。

添加文件追踪的方式 git add 

``` shell
# 单文件添加 
git add [文件名]
# 添加当前目录下所有没有被追踪的文件 . = 当前目录 .. = 上级目录
git add .
```

### 提交我的修改 - 也就是项目的时间节点

添加时间节点的方式 : git commit 

创建一个 commit 

-m 后面跟上提交的信息，也就是本次 commit 的具体改动。

信息使用单引号或者双引号包裹

```
git commit -m '信息'

git commit -m "信息"
```

![|526x250](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250216223811212.png)

不知道作者的 id 信息

请告诉我你是谁

执行：
xxxxxx

去设置你的账户的默认 id

去掉 --global 去设置你的 id 信息只属于当前的仓库

fatal:严重故障！！！

没有自动获取到 email信息

### 配置第一次提交前的初始化信息

> 在第一次 commit 之前我们是需要设置 user + email 用户 + 邮箱信息

--global = 添加到 git 设置，作为其他仓库的配置。
不添加--global = 只在当前仓库使用这个配置。
``` shell
 git config --global user.email "hello@example.com"
 git config --global user.name "Abra"
```

![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250216224651766.png)
```
[main (root-commit) hash值] commit 信息
一个文件改变，没有增加代码，没有删除代码
create.... 文件名
```
设置完user + email 以后我们继续执行 commit

得到这样的提示信息代表我们已经成功创建了这次 commit

commit 内需要关注的信息是 hash 值，这是每次 commit 的唯一 id，后续操作 commit 基本都是围绕这个 hash code。

记住这是一个id 就可以。

commit =  时间节点，记录这一刻所有被追踪的代码的完整代码，可以随时回到这个节点来查看这个节点的代码。

当前只需要关注我们提交 commit 就可以了。

### 操作总结

那么，到此为止，git 日常操作的 66.7% 已经完成了。

剩余的一个操作是推送到远程仓库（git push）不过目前我们还是单机版本，等到联机版本时候我们再来使用 git push。

本节的两个 Git 命令是

``` shell
# 添加文件追踪 添加文件到 git 仓库
git add .

git add abc.txt

# 创建一个 commit 
git commit
```

在完成 add + commit 的丝滑小连招以后我们再来 status 查看一下我们当前 git 仓库的状态。

```shell
git status
```

![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250216225332021.png)
当前分支：main

没有东西可以提交，工作树是干净的

好的，非常的爽，这也就是 git 最爽的状态。


### 总结

使用 git add 来追踪文件

使用 git commit 来创建commit

鼓励大量 commit，这会有助于代码调试和代码回溯

鼓励描述清晰的 commit message，不过这个问题不大，我们可以在开源的项目中去学习怎么输入合适的 commit message

在第一次commit 之前需要配置添加 用户名 + 邮箱

配置的内容会写入到 ~/.gitconfig 跨平台或者跨设备的时候可以直接复制这个文件。

后面我们还会有更多的配置加入到这个文件。

随时使用 git status 来查看当前的仓库状态。

流程

未追踪文件 ---add---追踪---commit --- 归档一次代码

commit 相当于快照，节点，等等...随着操作的深入我们会理解 commit

add 添加到暂存区。

git文件有哪些状态？

可以参考这篇  [git文件状态](./Git-文件状态)

### 任务

请创建一个 def.txt 文件，并且使用 add + commit 丝滑小连招把def.txt 收拾了。

同时创建 x.txt y.txt z.txt 用 git add . 把所有的文件加入追踪

编辑任意 txt 文件，使用 git status 查看状态，同时执行丝滑小连招。

重复修改文件，新增，删除，同时进行丝滑小连招。感受文件状态的变化。

### 拓展

#### 为什么需要有add和commit，直接commit不行吗？

有add和暂存区可以更灵活的提交commit，比如修改了10个文件，那么可以选择其中4个文件作为一次commit提交。
