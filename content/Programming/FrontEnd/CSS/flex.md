---
title: flex 布局的全部属性
date: 2025-03-27
categories:
  - css
---
### Base
分 容器 和 子项
container & item

### 容器

容器，首先容器需要是一个flex盒子。

display: flex | inline-flex;

```css
.container {
    display: flex;
    display: inline-flex;
}
```

#### 主轴概念

主轴方向 (flex-direction)

```css
.container {
    flex-direction: row;           
    flex-direction: row-reverse;    /* 水平排列，起点在右端 */
    flex-direction: column;         /* 垂直排列，起点在上沿 */
    flex-direction: column-reverse; /* 垂直排列，起点在下沿 */
}
```

主轴方向上 子项 的对齐方式
