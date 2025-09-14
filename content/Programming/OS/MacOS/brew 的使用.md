---
title: brew 的使用
date: 2025-01-19
categories:
  - mac
---
查看版本
```
brew --version

brew -v
```

查看当前安装的包

```
brew list
```

更新 brew self

```
brew update
```

查看可以更新的包
```
brew outdated
```

更新全部的包

```
brew upgrade
```

更新单个包

```
brew upgrade wget
```

查询某个包

```
brew search [package_name]
```

锁定单个包的版本

```shell
brew pin [FORMULA]
# 解锁
brew unpin [FORMULA]
```

