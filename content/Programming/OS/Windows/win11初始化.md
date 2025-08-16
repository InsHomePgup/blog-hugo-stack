---
title: "Win11初始化"
date: 2024-12-01
categories:
  - operating-system
  - windows
---

### windows 11 初始化设置

### 恢复到win10 右键菜单

```
# 修改注册表

reg add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve

reg add HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32 /f /ve

# 重启Explorer

taskkill /f /im explorer.exe & start explorer.exe
```