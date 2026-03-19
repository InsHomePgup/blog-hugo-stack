---
title: 在Win11上安装和使用WSL2与Debian
date: 2026-03-19
last-update: 2026-03-19
draft: true
tags:
  - Windows
  - WSL2
  - Debian
  - Linux
categories:
  - Computer
weight: 400
---

Windows上的WSL2可以直接去创建一个几乎完全就是Linux的环境.去安装自己想要的系统,而且得益于Linux系统的硬盘格式,可以去提升我们开发当中的性能.

### 我为啥要用WSL2

简单讲一下Linux的文件系统和Windows的区别.

Windows用的是 NTFS（新技术文件系统，New Technology File System）

Linux用的是ext4,第四代扩展文件系统.

作为一个前端开发,我最关心的就是那个庞大无比的node_modules的管理,在ext4我可以很轻松的去删除这个庞大的组织,在Windows上通常要很久,而且有一种卡死的感觉,通常还需要使用npm去全局安装一个rimraf的一个工具去删除.

这是因为ext4的底层设计上就是针对大量的碎片化文件做了优化处理的,还有比如文件路径长度无上限,NTFS有上限.

从pnpm install 和rm -rf node_modules的这两个事情上，ext4就友好太多了。准备开一个文章，讲这个事情。

Windows + WSL2 +VS code确实是会有一个很不错的化学反应。

### 安装


```shell
wsl -l -v  #去查看这个当前wsl的一些相关信息，比如当前安装的wsl子系统和当前的wsl的版本
```

如果没有安装wsl，这一步就会自动去安装了，这一步应该是需要网络环境的。嗯。

我这里输出是：
适用于 Linux 的 Windows 子系统没有已安装的分发。
可通过安装包含以下说明的分发来解决此问题：

使用“wsl.exe --list --online' ”列出可用的分发
和 “wsl.exe --install <Distro>” 进行安装。

```shell
 wsl --install -d Debian # 去安装debian
```

接下去我们尝试去安装，就会得到这个提示。

> 请求的操作成功。直到重新启动系统前更改将不会生效。

这个的意思就是虽然wsl的这个Windows功能已经启用了,但是因为还没有重启电脑,所以还没完全成功,我们现在去重启一下电脑以后再来安装.

重启以后去执行上面的安装命令，那么就完成了Debian的作为Windows 子系统的安装。

就很简单，WSL说实话是很清晰的，就是那些很基础的操作。

执行了命令以后根据提示去完成系统的初始化。

输入昵称，密码什么的。


## 配置

我们先去root那边干点事情,做点基础的工作.


```shell
sudo su - # 进入root

passwd # 去改个密码

apt update && apt upgrade -y # 更新软件，很经典的事情不过没有换源之前要确保网络是OK的
```

接下去就是完全当做debian去用就可以了。