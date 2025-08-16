---
title: "FIO的磁盘测试"
date: 2024-12-01
categories:
  - operating-system
  - linux
---

```
fio -filename=/dev/sda -direct=1 -iodepth 1 -thread -rw=read -ioengine=psync -bs=16k -size=200G -numjobs=30 -runtime=1000 -group_reporting -name=mytest
```