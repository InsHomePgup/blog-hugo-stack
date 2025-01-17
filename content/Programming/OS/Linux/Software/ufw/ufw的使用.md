---
title: ufw的使用
date: 2025-01-17
tags:
  - ufw
  - linux
  - debian
  - network
categories:
  - Linux
  - Debian
---
安装ufw
```
apt install ufw
```

查看版本和防火墙策略。

```shell
ufw version

ufw status
```

```shell
# 开启ssh的端口
ufw allow 22/tcp
```