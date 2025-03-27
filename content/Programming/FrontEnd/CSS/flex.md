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

flex = display:block + display:flex

inline-flex = display:inline + display flex

这个值控制这是一个flex容器，其次就是默认呈现block元素的特性，如果设置inline-flex那么就是行内 + flex。

#### 主轴概念

主轴方向 (flex-direction)

```css
.container {
    flex-direction: row;
    flex-direction: row-reverse;
    flex-direction: column;
    flex-direction: column-reverse;
}
```

主轴方向上 子项 的对齐方式

```css
.container {
    justify-content: flex-start;    /* 起点对齐（默认） */
    justify-content: flex-end;      /* 终点对齐 */
    justify-content: center;        /* 居中对齐 */
    justify-content: space-between; /* 两端对齐，项目间隔相等 */
    justify-content: space-around;  /* 项目两侧间隔相等 */
    justify-content: space-evenly;  /* 项目间隔完全相等 */
}
```

主轴内容超出换行设置

```css
.container {
    flex-wrap: nowrap; /* 默认值，不换行 */
    flex-wrap: wrap;  /* 正常换行，第一行在上方 */
    flex-wrap: wrap-reverse; /* 反向换行，第一行在下方 */
}
```