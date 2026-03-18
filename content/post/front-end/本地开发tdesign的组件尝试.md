---
title: "本地开发tdesign的组件尝试-pnpm功能实践"
date: 2026-03-18T05:30:56Z
last-update: 2026-03-18T05:30:56Z
draft: true
tags:
  -
categories:
  -
weight: 1
---

pnpm有一个global的link功能，实现效果大致就是我去注册一个link，本地的其他项目都可以通过这个link去读取到这个依赖来进行使用。

[pnpm link](https://pnpm.io/cli/link)

这里我做一个简单的尝试。

目标实现效果就是：

A仓库：tdesign-vue-next

B仓库：vue-vite-ts

A仓库是我们的组件仓库，B仓库是我们的项目仓库。

在B仓库里安装A仓库，实现可以对A仓库的开源组件进行修改，达到一个自定义效果的目的。

仓库是git的概念，repo。这里也可以是项目的意思。

## 在vue项目里安装本地的tdesign

首先这两个仓库都已经在本地，我先试试一次性的构建的去确保这个组件库能在项目里使用。

B仓库去切一个分支feat/local-tdesign 用来做这次测试。

A仓库安装完依赖以后去执行

```
pnpm run build:vue

```
这里是用了Roolup作为打包工具，和一些插件，来完成整个组件库的打包工作。

需要一段时间才能完成。

打包以后的产物会在tdesign-vue-next 目录的dist目录下，接下去我们进入到这个目录，来完成一个link的注册。

pnpm link --global 注册一个link到全局，这里用的是package.json 这里的name去创建的。

我修改了项目里的name，改成了tdesign-vue-next-ins，代表这是我本地的项目。所以下面我安装注册这个link的时候，这个link的name是tdesign-vue-next-ins；

```
pnpm link --global  // 注册到全局的link

// C:\Users\user\AppData\Local\pnpm\global\5:
// + tdesign-vue-next-ins 1.18.5 <- ..\..\..\..\..\WebstormProjects\tdesign-vue-next-ins\packages\tdesign-vue-next



```

我这里是注册的link的name是tdesign-vue-next-ins
!!! 这是重点。

现在去B项目

```
pnpm link  tdesign-vue-next-ins  // 把刚刚的link链接到当前的项目
```

执行完这个以后;

可以在package.json 看到

```
 "dependencies": {
    "tdesign-vue-next-ins": "link:../../AppData/Local/pnpm/global/5/node_modules/tdesign-vue-next-ins",
    "vue": "^3.5.30"
  },
```

那么到这里就完成了本地安装。

接下去我要实现对组件库里的源代码进行修改，来实现自己一些客制化的需求。
