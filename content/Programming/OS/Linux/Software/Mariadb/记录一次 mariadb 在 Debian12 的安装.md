---
title: "记录一次 mariadb 在 Debian12 的安装"
date: 2024-12-01
categories:
  - operating-system
  - linux
---

``` bash
apt update && apt upgrade -y

# 直接安装

apt install mariadb-server

# 安装完成以后查看版本
mysql

Server version: 10.11.6-MariaDB-0+deb12u1 Debian 12


```

### 尝试安装 11.4 的版本

[参考网站](https://mariadb.org/download/?t=repo-config&d=Debian+12+%22Bookworm%22&v=11.4&r_m=xtom_fre)

![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/Pasted%20image%2020240908121934.png)

选自己的系统版本，软件的安装版本，和镜像源
感谢阿里。
下面的那些命令全部照单输入就安装成功了。
mysql 命令进去看版本信息
Server version: 11.4.3-MariaDB-deb12 mariadb.org binary distribution

安装完成以后去初始化...