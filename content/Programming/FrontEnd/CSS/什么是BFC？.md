---
title: 什么是BFC？
date: 2026-02-12
draft: true
tags: ["CSS"]
categories: ["CSS"]
---

什么是BFC？

块级格式化上下文（Block Formatting Context）是一个独立的渲染区域，内部块级盒子的排列完全遵循块级排版规则，并且与外部区域互不干扰。

在学习BFC之前我们先来学习display。

### display

display属性用于设定元素的内部显示类型(Inner Display Type)与外部显示类型(Outer Display Type);

一开始学习css的时候接触到的display的三个属性值，block、inline、inline-block。

这三个属性值决定的都是元素的外部显示类型。

```css
display:grid;

display:flex;
```


这两个是决定元素内部的显示类型的。同时这两个属性有个潜在的隐藏属性就是block;
也就是这样设置的话,外部显示规则是block,内部显示规则是flex或者grid;

如果要同时flex + inline呢?

```css
display: inline-flex;
```

display有一个属性值比较少用，flow；

这个值的场景就是默认使用流式布局。也是决定元素的内部的显示类型，显示规则。

display:flow-root;

这个属性值就很有意思了,和我们要搞清楚的BFC的关系就是,如果这样设置,就会创建一个新的BFC.

display 还有很多其他属性值，不过我们常用的也就是block，inline，flex之类的。

html元素的一个理解就是元素在出生的时候就自带了一些css属性。

比如我们亲爱的div和span对应的css属性就是display的block和inline。

好的，回到BFC的讨论。

块级格式化上下文（Block Formatting Context）是一个独立的渲染区域，内部块级盒子的排列完全遵循块级排版规则，并且与外部区域互不干扰。

创建一个独立的渲染区域。

这就是BFC。

很多css属性是可以触发这个BFC特性的。

比如我们的html根元素，它就可以创建一个BFC的区域。

比如常常用到的overflow设置的值不为visible也会创建BFC。

BFC有一些渲染规则

1. 内部块级盒子垂直排列：自上而下依次放置，垂直间距由 margin 决定。

2. 同一 BFC 内相邻块级盒子的垂直外边距会折叠（Margin Collapse）。

3. BFC 的区域不会与浮动盒子重叠（经典两栏布局原理）。

4. BFC 是隔离的容器：内部元素不会影响外部，外部也不会穿透影响内部。

5. 计算 BFC 高度时，浮动子元素也参与计算（即 BFC 能清除内部浮动）。

第二条里面的margin折叠就是我们在布局过程中可能会遇到的问题比如在一个BFC中使用两个垂直的margin就会出现margin合并或者说折叠。解决的方案就是把两个block元素放在两个BFC当中。

现代的这个css可以使用display:flow-root;去创建一个BFC；
