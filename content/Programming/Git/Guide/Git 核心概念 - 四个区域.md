---
title: Git 核心概念 - 四个区域
date: 2025-03-06
categories:
  - git
tags:
  - git
---
- **工作区（Working Directory）​**
    
    - ​**作用**：你正在编辑的文件夹，直接看到文件内容。
    - ​**对应状态**：`Untracked`、`Modified`。
    - ​**操作**：直接修改文件（如用编辑器保存代码）。
- ​**暂存区（Staging Area / Index）​**
    
    - ​**作用**：临时存放准备提交的变更，类似“打包区”。
    - ​**对应状态**：`Staged`。
    - ​**操作**：通过 `git add` 将工作区的变更加入暂存区。
- ​**本地仓库（Local Repository）​**
    
    - ​**作用**：存储所有提交的版本记录（`.git` 目录）。
    - ​**对应状态**：`Unmodified`。
    - ​**操作**：通过 `git commit` 将暂存区的内容永久保存到仓库。
- ​**远程仓库（Remote Repository）​**
    
    - ​**作用**：托管在服务器上的代码仓库（如 GitHub、GitLab）。
    - ​**操作**：
        - `git push`：将本地提交推送到远程。
        - `git pull`：从远程拉取最新代码。