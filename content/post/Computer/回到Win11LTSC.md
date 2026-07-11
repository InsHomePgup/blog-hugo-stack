---
title: 回到Win11 LTSC,我的win11 LTSC实践。
date: 2026-03-17
last-update: 2026-05-18
weight: 400
draft: true
---
win11 专业版和其他版本还是太臃肿了。对系统资源的占用是高。

刚出win11的时候的各种bug惨不忍睹，在长期更新和AI加持下，现在的win11也不是不能用了。

不过还是希望自己打开一个新的操作系统的时候是一个纯净的状态，最小软件可用状态。

还是回到亲爱的LTSC。

Rufus + Win 11 LTSC的iso文件。

这样可以跳过系统安装过程中很多不必要的内容。

进到系统内先去完成重启和自动的驱动安装（联网后会自己安装驱动）。

LTSC没有store也没有winget，思路是

![microsoft-store](https://github.com/fernvenue/microsoft-store)

先安装store，再从store安装winget。

store 安装完成以后

通过win + R去运行以下命令直达正确的winget的包。

```text
ms-windows-store://pdp/?ProductId=9nblggh4nns1
```

因为直接搜索很有可能没有。

通过scoop去安装编码相关工具。

用winget去安装软件。

接下去配置好uniget，可以用这个来更新应用程序，不过这个也有一些应用无法通过uniget快速更新，常用的应用优先在应用本身内部去更新。
