---
title: "Debian 安装和配置redis"
date: 2024-12-01
categories:
  - operating-system
  - linux
---




## 开启远程访问

```

apt install redis -y


# redis.conf
cd /etc/redis/
vim redis.conf
bind 127.0.0.1 这里换成bind * -::*

```