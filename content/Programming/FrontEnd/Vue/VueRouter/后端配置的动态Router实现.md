---
title: 后端配置的动态Router实现
date: 2025-01-17
categories:
  - Vue
tags:
  - Vue
  - Vue-Router
---
实现思路来自于 TDesign的项目

### 引用资料

[TDesign-Vue](https://tdesign.tencent.com/starter/docs/vue/get-started)

[项目Preview](https://tdesign.tencent.com/starter/vue/dashboard/base)

说明：主要是学习怎么实现的还有思路，所以启动一个空白的项目然后一步步实现。

### 启动项目

使用快速开始启动一个普通的模板用来实践整个过程。

![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250117164524893.png)


在脚手架创建项目那里，使用vue3 + vite + lite版本启动。
升级一下依赖,安装vue-router

```
pnpm add vue-router
```

创建一些简单的用来测试路由的目录,layout下面default.vue
page下面home + about两个页面。
通常我们的后台管理系统使用的是通用的layout+切换内部的content

### 计划的实现效果

用户A - 登录 - 获取路由表 - 动态插入路由表 - 首页。

### 主要的API

[动态路由](https://router.vuejs.org/zh/guide/advanced/dynamic-routing)

```
// 添加路由
router.addRoute({ path: '/about', component: About })

// 删除路由
router.removeRoute('about')
```

```
router.addRoute({ name: 'admin', path: '/admin', component: Admin })
router.addRoute('admin', { path: 'settings', component: AdminSettings })
```

