---
title: 用simple-git-hooks + lint-staged来整理代码
date: 2025-01-16
categories:
  - font-end
tags:
  - simple-git-hooks
  - lint-staged
  - Eslint
---


![Owner avatar](https://avatars.githubusercontent.com/u/142687600?s=48&v=4) **[lint-staged](https://github.com/lint-staged/lint-staged)** 

![Owner avatar](https://avatars.githubusercontent.com/u/33755274?s=48&v=4) **[simple-git-hooks](https://github.com/toplenboren/simple-git-hooks)** 

两个项目

```shell
# 安装两个包到项目
pnpm add lint-staged simple-git-hooks
```

package.json 添加如下配置。
这个配置就是设置在commit之前的hook执行内容。
```json

"simple-git-hooks": {  
  "pre-commit": "npx lint-staged"  
},  
"lint-staged": {  
  "*": "eslint . --fix"  
}
```

```shell
# 执行如下命令初始化hooks
npx simple-git-hooks
```

得到信息：

```
[INFO] Successfully set the pre-commit with command: npx lint-staged
[INFO] Successfully set all git hooks
```

后续的 提交的时候都会执行eslint . --fix了

lint-staged: 对当前git 暂存区的内容执行shell

simple-git-hooks: 添加git hooks，这里我们添加的是pre-commit 也就是提交commit之前

[simple-git-hooks](https://github.com/toplenboren/simple-git-hooks/tree/master)

如果这里git-hooks并未生效。
参照readme
执行

```
# [Optional] These 2 steps can be skipped for non-husky users
git config core.hooksPath .git/hooks/
rm -rf .git/hooks

# Update ./git/hooks
npx simple-git-hooks
```
