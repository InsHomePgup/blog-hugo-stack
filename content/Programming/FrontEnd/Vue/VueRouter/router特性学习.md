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

>This allows Vue Router to change the URL without reloading the page




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

### router instance 路由实例

创建路由实例有三个函数，可以来看一下。

###  🔧 三种路由模式对比

| 模式名         | 路由函数                     | URL 形式     | 适用场景                | 优点               | 缺点                                     |
| ----------- | ------------------------ | ---------- | ------------------- | ---------------- | -------------------------------------- |
| **HTML5模式** | `createWebHistory()`     | `/about`   | 正常部署、有服务端支持的 SPA 项目 | 地址美观，支持 SEO（SSR） | 需要服务端配置支持 fallback（如 nginx history 模式） |
| **Hash模式**  | `createWebHashHistory()` | `/#/about` | 静态部署，无后端支持          | 不依赖后端，兼容性最好      | URL 有 `#`，不美观，SEO 差                    |
| **内存模式**    | `createMemoryHistory()`  | 不显示在地址栏    | 测试环境、SSR、非浏览器环境     | 不依赖 URL，易于测试     | 不能使用浏览器导航，无法被书签或 URL 定位                |
主流的我们还是使用前两个，内存路由我的理解是SSR和Electron的时候使用。

三个路由模式的性能之间的插件是微乎其微的。

创建路由对象的example

```ts
import { createRouter, createWebHashHistory} from 'vue-router'  
  
import HomeView from '@/pages/home.vue'  
import AboutView from '@/pages/about.vue'  
import UserView from '@/pages/user.vue'  
  
const routes = [  
    { path: '/', component: HomeView },  
    { path: '/about', component: AboutView },  
    { path: '/user', component: UserView },  
]  
  
const router = createRouter({  
    history: createWebHashHistory(),  
    routes,  
})  
  
export default router;
```

### 在 main.ts的一个配置

```ts
import { createApp } from 'vue'  
import './style.css'  
import App from './App.vue'  
  
import router from '@/router/index.ts'  
  
const app = createApp(App)  
app.use(router)  
app.mount('#app')
```

### 两个hooks

useRoute和useRouter;

简单理解，一个用来获取参数，一个用来完成跳转路由。

useRouter：编程式路由导航


```ts
const router = useRouter();  
function openPath(path:string){  
    router.push({  
        path,  
        query:{  
            a:1,  
            b:2  
        }  
    })  
}
```

useRoute获取路由跳转参数

```ts
const route = useRoute();  
onMounted(() => {  
    console.log(route.query);  
})
```