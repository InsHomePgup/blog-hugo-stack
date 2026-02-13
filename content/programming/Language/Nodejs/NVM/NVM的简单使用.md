---
title: "NVM 的简单使用"
date: 2024-12-01
categories:
  - backend
  - nodejs
tags:
  - nvm
  - nodejs
---

配置好了 nvm 以及对应的 node 源以后可以快乐的使用各个版本的 nodejs 了。
nvm 在不同的平台上表现还是不一样的。
Windows use 以后在后续的终端里也是会维持之前的版本。
Mac 这边需要单独配置以后才能设为默认版本，不然都会使用默认版本。


不得不说近几年的 nodejs 版本有点像 java 的版本一样，疯狂的升级，不过我印象里之前最坚挺的还是 node16 的版本。


``` bash

nvm install 22  #安装 nodejs 22 版本
nvm install 20 # 安装 20 的版本

nvm ls-remote # 查看远程的所有版本

nvm alias default 18 # 设置默认的版本，终端的默认版本

nvm use 20 # 使用 20 的版本

```