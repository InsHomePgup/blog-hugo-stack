---
title: "CSS Transition 过渡动画的学习"
date: 2026-02-09
categories:
  - frontend
  - css
tags:
  - css
  - transition
---



## transition
css 哲学上来说，这个是一个复合元素也就是快捷方式。

### transition-behavior [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transition-behavior)

过渡 - 行为；

behavior: The way in which something functions or operates；

某事物运作或运行的方式；

```
transition-behavior: allow-discrete;

transition-behavior: normal;

```

这个属性控制的是针对display这个属性值的transition效果的控制。

#### allow-discrete

display的none的变化也会有过渡效果

#### normal

display的none的变化没有过渡效果。


### transition-delay

delay:The time during which something is delayed

延迟的时间;

在过渡效果开始作用之前需要等待的时间。

比如有三个元素需要过渡。

希望这三个元素的过渡是依次出现的。

一秒钟出现一个。

那么就可以设置 1s 2s 3s作为元素的出场时间。



### transition-duration

duration: The time during which something exists or lasts

某事物存在或持续的时间;

过渡效果持续的时间。

动画持续的时间。

### transition-property

property: An attribute common to all members of a class

属性。

这里指css属性，要过渡的属性，比如长宽高 颜色 边距等。

所有的可以被动画的css属性。

通常配合transform的动画效果会比较好。

### transition-timing-function

定义过渡动画的展现形式，这里有一些函数可以去设计动画效果。


