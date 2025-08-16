---
title: "Debian 安装 NVM"
date: 2024-12-01
categories:
  - operating-system
  - linux
---



``` bash

apt update && apt upgrade -y

apt install build-essential libssl-dev 

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash 
curl -o- https://gitee.com/inshomepgup/linux_-auto_-script/raw/main/installNVM.sh | bash 





source ~/.bashrc

## 最后打开一个新的终端
## 执行

command -v nvm 

## 如果成功安装就会输出 nvm



```

云服务器安装 nodejs 的过程真的是艰苦，用镜像源就好多了

安装完 nvm 以后去设置一下 node 镜像

```
NVM_NODEJS_ORG_MIRROR=http://mirrors.cloud.tencent.com/nodejs-release/
```

配置好镜像以后再去安装 nodejs
```
nvm install 20 
nvm install 16
```

顺便设置一下 npm 的镜像。。。为了后续使用

```

npm config set registry http://mirrors.cloud.tencent.com/npm/

```
