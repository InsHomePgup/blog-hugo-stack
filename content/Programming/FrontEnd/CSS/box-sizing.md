---
title: box-sizing
date: 2025-02-06
categories:
  - css
---
来看一下一直有点模糊的box-sizing属性。

![|700x399](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250206133829365.png)

这是一个盒模型。
```css 
*{  
    margin: 0;  
    padding: 0;  
}  
  
.box1{  
    box-sizing: content-box;  
    /*box-sizing: border-box;*/  
    width: 100px;  
    height: 100px;  
    background: deepskyblue;  
    border:10px solid pink;  
    padding: 10px;  
}
```

box-sizing无关margin，margin的规则没有改变。

主要修改的是content，padding，border的渲染规则。

content-box下，设置width代表的是：content区域独占这个宽度。

![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250206134844069.png)
当前content自己使用width的100，然后padding的10px和border的10px都在外面。

当前这个元素的实际的整体的宽度（所占用的宽度）就是：100 + 20 + 20；

接下去看一下border-box；


![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250206135055914.png)

![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250206135138398.png)

content 区域的宽度缩短到了60，因为需要content + padding + border 合起来等于100.
元素合计占用的宽度也只有100.

所以我们可以简单的理解box-sizing就是修改这三个盒模型夹层空间和width之间的关系。

contentbox ： width = content width

声明一个盒子是内容盒子的时候，宽度的计算方式 = 它盒子content的宽度

borderbox：width =content width + padding width + border width。

声明一个盒子是边框盒子的时候，宽度 = content + padding + border

