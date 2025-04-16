---
title: router特性学习
date: 2025-04-16
---


### 前沿

准备启动一个项目用来认真学习vue-router的特性。

使用vite的vue-ts模板创建一个项目。

[https://vite.dev/guide/](https://vite.dev/guide/)

```shell
pnpm create vite vue-ts-router-app --template vue-ts
```

[https://router.vuejs.org/guide/](https://router.vuejs.org/guide/)

根据Starter我们来看router的第一个特性

两个html标签

router-link和router-view

一个是用来跳转

一个是用来嵌套视图的显示

 
#### router-link

渲染成a标签，作用就是用来跳转路由页面，会自动处理url和浏览器历史记录，可以不刷新页面。

```vue
<router-link to="/about">关于我们</router-link>
<!-- 渲染以后 -->
<a href="/about">关于我们</a>
```

##### 常用属性：to

如上所示，后面就是跟一个path

##### replace

默认是调用router.push()

如果加上这个replace属性则是调用 router.replace()

replace可以简单理解为跳转到目标页面但是不添加历史记录

```vue
<router-link to="/login" replace>登录</router-link>
```

#### router-view

嵌套视图的标签

