---
title: 博客使用markdown的一些语法展示
date: 2024/06/06
tags:
  - markdown
  - blog
categories:
  - blog md
---

## 链接的使用

记忆公式 ： 方圆

一个链接然后添加方圆，方圆的前面是链接的显示名称，方圆的后面是链接的地址。
也就是方括号里面放名字，圆括号里面放链接地址。

这里有一个链接[Home](/)
这是一个google [Google](https://www.google.com/ncr)

### 一些标题
# 1号标题

## 2号标题


## 图片

公式： 感叹号 + 方圆
![|100](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/hero.png)

控制图片大小，使用html img标签
<img src="https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/hero.png" style="width:100px;">
img 标签的 src 指向图片路径，width和height标注图片尺寸。



::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::

::: details
This is a details block, which does not work in IE / Edge
:::


## 表格

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |


|Table|One|
|---|---|
|123|123|

## Emoji

:tada: :100:

## 第二行 + 第三行代码高亮显示

```text
```js{2-3}
let abc = '123'
let edf = '456'
let a123=25123
```


```js{2-3}
let abc = '123'
let edf = '456'
let a123=25123
```
