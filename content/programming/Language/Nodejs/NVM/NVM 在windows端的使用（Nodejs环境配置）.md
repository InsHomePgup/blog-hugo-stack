---
title: "NVM 在 Windows 端的使用（Nodejs 环境配置）"
date: 2024-12-01
categories:
  - backend
  - nodejs
tags:
  - nvm
  - nodejs
  - windows
---

记录一下我的日常
从官网下载nodejs 并安装

[nodejs](https://nodejs.org/en)

下载nvm 并安装

[nvm](https://github.com/coreybutler/nvm-windows)

配置nvm的node源和npm源

``` bash

# 腾讯
nvm npm_mirror http://mirrors.cloud.tencent.com/npm/
nvm node_mirror https://mirrors.cloud.tencent.com/nodejs-release/

# 阿里
nvm npm_mirror https://npmmirror.com/mirrors/npm/
nvm node_mirror https://npmmirror.com/mirrors/node/

```

``` bash

# 顺便设置一下腾讯的npm源

npm config set registry http://mirrors.cloud.tencent.com/npm/

```