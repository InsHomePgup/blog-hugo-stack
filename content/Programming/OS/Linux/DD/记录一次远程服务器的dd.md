---
title: "记录一次远程服务器的dd"
date: 2024-12-01
categories:
  - operating-system
  - linux
---

https://github.com/leitbogioro/Tools

https://gitee.com/mb9e8j2/Tools/raw/master/Linux_reinstall/InstallNET.sh

下载脚本

wget --no-check-certificate -qO InstallNET.sh 'https://gitee.com/mb9e8j2/Tools/raw/master/Linux_reinstall/InstallNET.sh' && chmod a+x InstallNET.sh


```
bash InstallNET.sh -debian 12 -pwd 'mypassword' -port "22" -mirror "https://mirrors.ustc.edu.cn/debian/"
```

硬盘写入测试

```
dd if=/dev/zero of=tempfile bs=1G count=1 oflag=dsync
```

硬盘读取测试
```
dd if=tempfile of=/dev/null bs=1G count=1 iflag=dsync
```