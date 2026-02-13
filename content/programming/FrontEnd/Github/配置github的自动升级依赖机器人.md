---
title: 配置github的自动升级依赖机器人
---
在项目的根目录创建文件

```
.github\workflows\update-dependencies.yml
```

文件内容：

```
name: Auto Update Dependencies

on:
  schedule:
    - cron: '0 3 * * 1' # 每周一凌晨 3 点执行（UTC 时间）
  workflow_dispatch: # 允许手动触发

permissions:
  contents: write

jobs:
  update-dependencies:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        name: Install pnpm
        with:
          version: 10
          run_install: false

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm

      - name: Install dependencies
        run: pnpm install

      - name: Update dependencies
        run: pnpm up --latest

      - name: Check for changes
        id: git-check
        run: |
          git add package.json pnpm-lock.yaml
          if git diff --cached --quiet; then
            echo "No changes to commit"
            echo "has_changes=false" >> $GITHUB_ENV
          else
            echo "Changes detected"
            echo "has_changes=true" >> $GITHUB_ENV
          fi

      - name: Commit and push changes
        if: env.has_changes == 'true'
        run: |
          git config --global user.name "github-actions[bot]"
          git config --global user.email "github-actions[bot]@users.noreply.github.com"
          git remote set-url origin https://x-access-token:${{ secrets.GITHUB_TOKEN }}@github.com/用户名/仓库名.git
          git commit -m "chore: auto update dependencies"
          git push origin main


```

片段讲解:

```yml
# 安装pnpm
- uses: pnpm/action-setup@v4  
  name: Install pnpm  
  with:  
    version: 10  
    run_install: false

#安装nodejs
- name: Setup Node.js  
  uses: actions/setup-node@v4  
  with:  
    node-version: 22  
    cache: pnpm

# 安装依赖
- name: Install dependencies  
  run: pnpm install

# 更新依赖
- name: Update dependencies  
  run: pnpm up --latest

# 检查依赖是否更新

- name: Check for changes  
  id: git-check  
 ...具体代码

# 配置提交参数

- name: Commit and push changes  
  if: env.has_changes == 'true'  
  run: |  
    git config --global user.name "github-actions[bot]"    git config --global user.email "github-actions[bot]@users.noreply.github.com"    git remote set-url origin https://x-access-token:${{ secrets.GITHUB_TOKEN }}@github.com/用户名/仓库名.git  
    git commit -m "chore: auto update dependencies"    git push origin main

```

最后一个是让git的自动更新依赖机器人把更新提交推送到库

这里需要注意的配置就是

推送需要一个token所以用到了一个变量

后面跟的就是仓库的地址其实

替换用户名 + 仓库名然后就能让机器人自己推送了。

``
