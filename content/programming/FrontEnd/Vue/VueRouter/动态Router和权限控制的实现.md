---
title: 动态Router和权限控制的实现
date: 2025-01-17
categories:
  - Vue
tags:
  - Vue
  - Vue-Router
---
在常见的管理系统中，对于页面路由的权限控制通常是在后端配置当前角色当前用户的可访问路由表。

### 计划的实现效果

用户A - 登录 - 获取路由表 - 动态插入路由表 - 首页。
### 引用资料

[TDesign-Vue](https://tdesign.tencent.com/starter/docs/vue/get-started)

[项目Preview](https://tdesign.tencent.com/starter/vue/dashboard/base)

说明：启动一个空白的项目然后一步步实现。

### 启动项目

使用快速开始启动一个普通的模板用来实践整个过程。

![|700x311](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250117164524893.png)



##### 脚手架创建项目

在脚手架创建项目那里，使用vue3 + vite + lite版本启动。
升级一下依赖,安装vue-router

```
pnpm add vue-router
```

###### 初始化一些基础文件

添加一些简单的用来测试路由的目录,layout部分使用基础的侧边栏，导航栏，内容区来创建。
在page下面home + about两个页面。
在layout下面添加一个default.vue
使用嵌套路由来切换页面。



### 主要的API

##### 动态路由
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

##### 查看路由表

```
import { useRouter } from 'vue-router';
const router = useRouter();  
console.log('routes', router.options.routes);
```


