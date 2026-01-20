---
title: "WSL常用命令"
date: 2026-01-20
categories:
  - operating-system
  - linux
  - WSL
---

## 查看信息

### 查看 WSL 版本

```pwsh
wsl --version
```

![version](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20260120131940011.png)

### 列出已安装的发行版

```pwsh
wsl -l -v
```

显示发行版名称、运行状态、WSL 版本。

### 列出可在线安装的发行版

```pwsh
wsl -l -o
```

## 发行版管理

### 安装发行版

```pwsh
wsl --install -d Ubuntu-22.04
```

### 设置默认发行版

```pwsh
wsl -s <发行版名称>
```

### 卸载发行版

```pwsh
wsl --unregister <发行版名称>
```

注意：会删除所有数据，无法恢复。

## 启动和停止

### 启动默认发行版

```pwsh
wsl
```

### 启动指定发行版

```pwsh
wsl -d Ubuntu-22.04
```

### 以 root 用户登录

```pwsh
wsl -u root
```

### 终止指定发行版

```pwsh
wsl -t <发行版名称>
```

### 关闭所有发行版（释放内存）

```pwsh
wsl --shutdown
```

## 执行命令

### 在 WSL 中执行命令

```pwsh
wsl ls -la
wsl cat /etc/os-release
```

### 在指定发行版中执行

```pwsh
wsl -d Ubuntu-22.04 <命令>
```

## 文件系统访问

### 从 Windows 访问 WSL 文件

在资源管理器地址栏输入：

```
\\wsl$\Ubuntu-22.04
```

或输入 `\\wsl$` 查看所有发行版。

### 从 WSL 访问 Windows 文件

```bash
cd /mnt/c/Users      # C:\Users
cd /mnt/d/Projects   # D:\Projects
```

## 更新

### 更新 WSL

```pwsh
wsl --update
```

## 常用配置

### 限制内存使用

创建文件 `C:\Users\<用户名>\.wslconfig`：

```ini
[wsl2]
memory=4GB
processors=2
```

修改后需要执行 `wsl --shutdown` 重启生效。

## 实用技巧

### 在当前目录打开 WSL

在资源管理器地址栏输入 `wsl` 即可。

### 从 WSL 打开 Windows 应用

```bash
explorer.exe .           # 打开当前目录
notepad.exe file.txt     # 用记事本打开文件
```