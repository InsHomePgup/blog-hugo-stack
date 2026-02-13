---
title: 项目组织-用husky+lint-stage来规范代码提交
date: 2025-04-26
categories:
  - font-end
tags:
  - husky
  - lint-staged
  - Eslint
---
### 规范提交的代码

直接看成品的配置的demo

请查看我的模板 [vue3-ts](git@github.com:InsHomePgup/vue3-ts.git)

我们这里实现一下用husky + lint-staged来管理代码提交

simple-git-hooks可以使用pre-commit的钩子，这里我们用更主流的husky实现一次。

husky相比simple-git-hooks，功能更强，一个钩子可以执行多条命令。

社区支持更好，使用的人更多。

![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250426141719854.png)


### 安装依赖

```
pnpm add -D husky lint-staged
```

### 添加配置

在 **package.json** 添加配置

```json
  "scripts": {
    "prepare": "husky"
  }
```

这是在每次安装依赖以后初始化husky的git hooks

prepare是npm lifecycle script 生命周期脚本，在执行pnpm install的时候触发，常用来初始化一些东西

我们这里用它来初始化husky

#### 添加husky配置

创建文件 .husky/pre-commit   
添加以下内容

``` script
npx lint-staged
```

#### 头次安装需要初始化husky

> husky 9 的版本移除了husky install这里使用init 完成初始化
```bash
npx husky init
```

>在2025年04/26的这个节点，husky的最新版本执行init会重置pre-commit内的脚本。已反馈github issue


#### 添加lint-staged的配置

```json
"lint-staged": {  
  "**/*.{js,ts,vue,json,css,scss,md,less}": [  
    "eslint --fix"  
  ]  
}
```

对stage的什么类型的文件进行什么样的脚本

对 **js,ts,vue,json,css,scss,md,less**这些后缀的文件执行eslint --fix

到这里 husky + lint-staged的在提交前使用eslint规范代码就完成了。

### 扩展

配合使用standard-version 来完成规范commit和自动发版的时候的script注意调用跳过husky的eslint

```json
"commit": "eslint . --fix && cz --no-verify",
```

这里是因为我们调用pnpm run commit

后面使用cz提交的时候还是会触发pre-commit hooks里面的eslint

使用--no-verify来跳过husky

就不会触发两次的eslint，节省了commit提交的时间，也不会影响到我们自己去添加commit信息