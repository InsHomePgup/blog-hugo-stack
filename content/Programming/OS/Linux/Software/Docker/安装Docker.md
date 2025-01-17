---
title: 安装Docker
date: 2025-01-17
---
跟随官网的docker安装
[Debian Install Docker](https://docs.docker.com/engine/install/debian/)

或者是脚本：
curl https://get.docker.com/ | bash

docker run --name mariadbtest -e MYSQL_ROOT_PASSWORD=123456 -p 3306:3306 -d docker.io/library/mariadb

