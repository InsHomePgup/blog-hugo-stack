---
title: reset,适合本地的soft & hard回退
date: 2025-03-22
---


## 本地回退commit的最佳实践

### 软回退

把最近的一次commit的代码回退到工作区。可以修改后重新提交

```
git reset --soft HEAD^
```

比较常用的方法，在一次

### 硬回退

回退到上一次commit，但是丢弃代码

```
get reset --hard HEAD^
```

