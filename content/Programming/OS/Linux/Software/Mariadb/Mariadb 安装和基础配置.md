---
title: "Mariadb 安装和基础配置"
date: 2024-12-01
categories:
  - operating-system
  - linux
---


ARMBian安装

Debian 安装


[参考网站](https://mariadb.org/download/?t=repo-config&d=Debian+12+%22Bookworm%22&v=10.11&r_m=xtom_fre)

``` bash

# 更新一下apt

apt update && apt upgrade -y

# 初始化内容

sudo apt-get install apt-transport-https curl
sudo mkdir -p /etc/apt/keyrings
sudo curl -o /etc/apt/keyrings/mariadb-keyring.pgp 'https://mariadb.org/mariadb_release_signing_key.pgp'

# apt没有自带mariadb需要写入存储库

vim /etc/apt/sources.list.d/mariadb.sources

# 写入以下内容

# MariaDB 10.11 repository list - created 2024-06-15 06:06 UTC
# [https://mariadb.org/download/](https://mariadb.org/download/)
X-Repolib-Name: MariaDB
Types: deb
# deb.mariadb.org is a dynamic mirror if your preferred mirror goes offline. See [https://mariadb.org/mirrorbits/](https://mariadb.org/mirrorbits/) for details.
# URIs: [https://deb.mariadb.org/10.11/debian](https://deb.mariadb.org/10.11/debian)
URIs: [https://mirrors.xtom.com/mariadb/repo/10.11/debian](https://mirrors.xtom.com/mariadb/repo/10.11/debian)
Suites: bookworm
Components: main
Signed-By: /etc/apt/keyrings/mariadb-keyring.pgp

# 开始安装:

sudo apt-get update
sudo apt-get install mariadb-server


# 安装完成以后开始初始化


mysql_secure_installation

Enter current password for root (enter for none): # 当前的root 密码 默认root密码为空直接回车即可
Switch to unix_socket authentication [Y/n] #是否使用unix_socket验证，建议否
Set root password? [Y/n]  #是否设置新的root密码
New password: #输入新密码
Re-enter new password: #确认密码
Remove anonymous users? [Y/n]  #是否移除匿名用户
Disallow root login remotely? [Y/n] #是否启用root用户的远程访问
Remove test database and access to it? [Y/n] #是否删除测试数据库
Reload privilege tables now? [Y/n] #是否立即刷新数据库配置
Thanks for using MariaDB!

```


## 开启远程访问

``` bash
# 登录
mysql 

```

``` bash

grant all privileges on *.* to root@"%" identified by "pwd" with grant option; flush privileges;

```

### 开启配置中的远程连接

vim /etc/mysql/mariadb.conf.d/50-server.cnf

bind-address = 127.0.0.1

修改成

bind-address = 0.0.0.0  

## 创建一个用户来远程访问


``` mysql

create user 'username'@'%' identified by 'password';
grant all on database.* to 'username'@'%'
```

create user 'gitea'@'%' identified by '123';
grant all on database.* to 'gitea'@'%'