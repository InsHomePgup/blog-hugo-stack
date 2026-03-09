---
title: grid布局学习
date: 2026-03-09
draft: true
---

命名grid去实践完成Header、sidebar、content、footer的布局。

首先完成html的骨架

``` html
  <div class="container-wrapper">
    <div class="grid-container">
        <div class="item item-1">Header</div>
        <div class="item item-2">Sidebar</div>
        <div class="item item-3">Main Content</div>
        <div class="item item-4">Footer</div>
    </div>
  </div>
```

用container-wrapper代表页面的class

grid-container，这是我们的grid容器。

下面是各个item，内容就是他们所代表的区域。

``` css
.container-wrapper{
    width: 100vw;
    height: 100vh;
}

.grid-container{
    display: grid;
    grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
}

.item{
  background-color: #3b82f6;
  color: white;
}

.item-1 {
  grid-area: header;
  background-color: #ef4444;
}

.item-2 {
  grid-area: sidebar;
  background-color: #10b981;
}

.item-3 {
  grid-area: main;
  background-color: #3b82f6;
}

.item-4 {
  grid-area: footer;
  background-color: #f59e0b;
}
```

grid 容器 + 给每个子项配置grid-area，这里的子项目配置了名称，用来指定网格区域的名称。

grid容器内用grid-template-areas去配置布局。







``` css
    grid-template-areas:
    "header header"  // 这一行都是header
    "sidebar main"  // 这一行的左边是sidebar，右侧是main，内容区
    "footer footer";  // 这一行的底部都是footer
```

这里用display:grid;指定这是一个grid容器,再用grid-template-areas来设置每个网格的名称.

在子项里用grid-area去对应容器里的名称.

![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20260309134204099.png)


这时候已经划分好了格子。

按上面的代码，已经形成了一个基础的布局，第一行是header，第二行是sidebar和content，第三行是footer.

接下去为了实现布局，我们要指定每个格子也就是每行每列的具体参数。



``` css

.grid-container {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 60px 1fr 60px;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  gap: 10px;

  height: 100vh;
  background-color: #f0f0f0;
  padding: 10px;
}

```

grid-template-columns 是配置每一列的宽度

grid-template-rows 是配置每一行的高度


  ```css
  grid-template-columns: 200px 1fr;  // 第一列宽度 200px，1fr自适应占用全部宽度
  grid-template-rows: 60px 1fr 60px;  // 第一行 60px，最后一行60px，中间自适应占用全部宽度
  ```

fr 是 fraction（分数）的缩写，fr是 CSS Grid 布局中专用的弹性单位。也代表分配剩余空间。占用剩余空间。

``` css
gap:10px;  // 所有grid之间 间隔 10px;
```

最终的css

``` css

<template>
  <div class="container-wrapper">
    <div class="grid-container">
        <div class="item item-1">Header</div>
        <div class="item item-2">Sidebar</div>
        <div class="item item-3">Main Content</div>
        <div class="item item-4">Footer</div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>

.container-wrapper{
    width: 100vw;
    height: 100vh;
}

.grid-container{
    display: grid;
    gap:20px;
    height: 100vh;
    padding: 10px;
    grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";

    grid-template-columns: 200px 1fr;
    grid-template-rows: 60px 1fr 60px;
}

.item{
  background-color: #3b82f6;
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-1 {
  grid-area: header;
  background-color: #ef4444;
}

.item-2 {
  grid-area: sidebar;
  background-color: #10b981;
}

.item-3 {
  grid-area: main;
  background-color: #3b82f6;
}

.item-4 {
  grid-area: footer;
  background-color: #f59e0b;
}

</style>


```

![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20260309134855188.png)



那么在这里我们用grid完成了一个常见的后端管理系统的布局

