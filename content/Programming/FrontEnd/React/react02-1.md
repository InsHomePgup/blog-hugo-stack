---
title: "组件的使用"
date: 2024-12-01
tags:
  - react
categories:
  - frontend
  - react
weight: 200
---

## 组件

React 的组件

区分react组件和普通html元素的方式就是

react组件的首字母大写


### 创建组件

> 函数组件

根入口组件 App

```tsx

function App() {  
    return (  
        <div></div>  
    )  
}  
export default App

```



> 类组件

暂时跳过

``` tsx
/** 
	1. 组件名称首字母大写 区分组件和普通元素
	2. 继承Component
	3. 实现render函数
	4. 
**/

import {Component} from "react";  
  
class About extends Component<any, any>{  
    render() {  
        return (  
            <div>About</div>  
        )  
    }  
}  
export default About;

```

``` tsx
/**
	组件取消根元素的一种实现。
**/

import {Component, Fragment} from "react";  
  
class About extends Component<any, any>{  
    render() {  
        return (  
            <Fragment>About</Fragment>  
        )  
    }  
}  
export default About;
```


### 组件接收数据 props的使用


> 简单值传递

```tsx
/** 属性传简单值 **/
/** 父组件 **/

import About from "./components/About.tsx";  
function App() {  
    return (  
        <div>  
            <About name={'foo'}></About>  
        </div>  
    )  
}  
  
export default App
/**
  自组件
  直接this.props.xxx这样调用props
**/
import {Component} from "react";  
class About extends Component<any, any> {  
    render() {  
        return (  
            <div>  
                <div>  
                    About  
                </div>  
                <div>  
            
                    {this.props.name}  
                </div>  
            </div>  
        )  
    }  
}  
export default About;

```

> 对象值传递

```tsx

import About from "./components/About.tsx";  
function App() {  
    const personA = {  
        name:'foo',  
        age:20  
    }  
    return (  
        <div>  
            <About {...personA}></About>  
        </div>  
    )  
}  
  
export default App


import {Component} from "react";  
class About extends Component<any, any> {  
    render() {  
        const {name,age} = this.props;  
        return (  
            <div>  
                <div>  
                    About  
                </div>  
                <div>  
                    {name}  
                    {age}  
                </div>  
            </div>  
        )  
    }  
}  
export default About;

```

``` tsx
/**
	函数组件的props
	这里我们在组件引用的地方使用属性赋值一个title
**/

import About from "./components/About.tsx";  
  
function App(props: { title: string }) {  
    const {title} = props;  
    const personA = {  
        name: 'foo',  
        age: 20  
    }  
    return (  
        <div>  
            <About {...personA}></About>  
            <div>{title}</div>  
        </div>  
    )  
}  
  
export default App

```

### props 设置默认值


> 函数组件默认值以及参数校验

``` tsx
  
// 这里定义类型  
interface props{  
    title: string;  
}  
  
// 这里初始化默认值  
function Home({title = 'foo'}: props) {  
    return (  
        <div>  
            <div>  
                {title}  
            </div>  
        </div>  
    )  
}  
  
export default Home

```


> 类组件默认值以及参数校验

``` tsx
import {Component} from "react";  
// 这里声明Props的类型
interface Props {  
    name: string,  
    age: number  
}  
  
class About extends Component<Props, any> {  
// 这里给Props赋默认值
    static defaultProps = {  
        name: 'foo',  
        age: 100  
    }  
    render() {  
        const {name, age} = this.props;  
        return (  
            <div>  
                <div>  
                    About  
                </div>  
                <div>  
                    {name}  
                    {age}  
                </div>  
            </div>  
        )  
    }  
}  
export default About;

```