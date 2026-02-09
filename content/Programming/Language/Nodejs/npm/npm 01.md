---
title: "npm 01"
date: 2024-12-01
categories:
  - programming
  - nodejs
---

### 方案1：换源

npm的安装不总是那么顺利，用一些国内源可以提升一下体验。

```bash

npm config set registry https://registry.npmmirror.com

npm config set registry https://registry.npm.taobao.org

npm config set registry http://mirrors.cloud.tencent.com/npm/

# 删除源
npm config delete registry

```

### 方案2：我的网络已在外边。
