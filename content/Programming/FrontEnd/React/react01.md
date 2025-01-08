---
title: React01 jsx | tsx的使用 动态添加html属性
date: 2024/06/06
tags:
  - react
  - tsx
categories:
  - react
---

### React学习

#### 快速创建一个项目

首先用vite + react启动一个react-ts项目

``` shell
pnpm create vite [项目名称] --template react-ts

pnpm create vite react-starter --template react-ts

```

##### 添加一些依赖

- unocss
- antfu eslint
- lodash-es
![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250106164408392.png)

删除多余的内容，仅保留App.tsx和main.tsx

####  JSX|TSX 动态插入内容、属性



##### 绑定变量属性
title={name}的这种形式去给一个标签添加动态的属性

``` jsx
function App()  {  
	const name = 'foo'
	return(
		 <div title={name}> /** 使用属性*/
			{name}
		</div>
	)
}
// 一个花括号里面输入来使用js表达式和变量

// 导出组件
export default App

```

##### 绑定class

直接添加class和绑定class的变量

```jsx

function App() {  

const myClassName: string = 'w-10 h-10 bg-blue-6'

  return (  
    <>      /** 这里使用了一对空标签当成根标签*/
	    /** 直接绑定class */
     <div className="w-2"></div>  
	    /** 绑定class变量 */
     <div className={myClassName}></div>
    </>  
)}  
  
export default App

```

##### 绑定style

``` tsx
function App() {  
  const styleObj = {  
    backgroundColor: 'red',  
  }  return (  
    <>      <div style={styleObj}></div>  
      <div style={{ color: 'red' }}></div>  
    </>  )}  
  
export default App
```



##### 事件操作，获取事件对象event


``` jsx
// 事件操作
function App() {  
    function test(number1?: number, event?: React.FormEvent<HTMLButtonElement>) {  
        console.log(number1, event)  
    }  
  /** React.FormEvent<HTMLButtonElement> react的一些ts类型 */
    return (  
        <div>  
            {/*调用方式1*/}  
            {/*bind方式拿到event，默认最后一个参数就是event*/}  
            <button onClick={test.bind(null, 123)}>  
            </button>  
            {/*调用方式2*/}  
            <button onClick={() => {  
                test(123)  
            }}></button>  
            {/* 箭头函数拿到click事件对象，箭头函数传参就是event*/}  
            <button onClick={(event) => {  
                test(123, event)  
            }}></button>  
        </div>  
    )  
}  
  
export default App
```

## 实现html循环遍历

使用map来返回jsx片段


``` jsx

// v-for的react实现，遍历html   v
  
const arr = [1, 2, 3]  
  
const persons = [  
    {  
        name: 'foo'  
    },  
    {  
        name: 'egg'  
    }  
]  
  
function App() {  
    return (  
        <div>  
            <div>  
                {  
                    arr.map((item, index) => {  
                        return <div key={index}>  
                            {item}  
                        </div>  
                    })  
                }  
            </div>  
            <div>  
                {  
                    persons.map((item, index) => {  
                        return <div key={index}>  
                            {item.name}  
                        </div>  
                    })  
                }  
            </div>  
        </div>  
    )  
}  
  
export default App

```

## 添加内联样式

``` jsx
// 添加内联样式  
const style1 = {  
    width: '100px',  
    height: '100px',  
    backgroundColor: 'lightskyblue'  
}  
  
const style2 = {  
    width: 200  
}  
  
/**  
 * 媒体查询 + 伪类使用 radium包裹  
 */  
  
function App() {  
    return (  
        <div>  
            <div style={{backgroundColor: 'lightskyblue', width: '100px', height: '50px'}}></div>  
            <div style={style1}></div>  
            <div style={{...style1,...style2}}></div>  
        </div>  
    )  
}  
  
export default App
```

## 添加外部css文件

``` js
import './index.css'
```

```css

/** index.css**/

.box1 {  
    width: 100px;  
    height: 100px;  
    background-color: lightskyblue;  
}

```

```jsx
// 外源css的使用
function App() {  
    return (  
        <div className={ 'box1' }></div>  
    )  
}  
  
export default App

```
