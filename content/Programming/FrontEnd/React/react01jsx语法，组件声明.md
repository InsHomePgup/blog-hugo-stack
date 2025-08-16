---
title: "组件声明和jsx"
date: 2024-12-01
tags:
  - react
  - tsx
categories:
  - frontend
  - react
weight: 1
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
![|325x332](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250106164408392.png)

删除多余的内容，仅保留App.tsx和main.tsx

### 组件

#### 组件声明

JSX必须有一个根节点

可以是 <></>  // 这是一个 _[Fragment](https://react.dev/reference/react/Fragment)_

所有html标签必须结束

不管是单标签还是双标签都必须结束

>JSX requires tags to be explicitly closed: self-closing tags like `<img>` must become `<img />`, and wrapping tags like `<li>oranges` must be written as `<li>oranges</li>`.

大部分react 的东西都使用 驼峰。

比如绑定事件 onClick

比如添加class  = className

``` tsx
export default function Page() {
    return (
        <>
            <h1>Home</h1>
        </>
    )
}
```

导出，用ES6语法，导出一个函数返回一个JSX片段。

注意：不要在组件内部再去申明一个组件。

注意：react组件的使用需要开头大写，这样来区分原生的html标签。

```tsx
export default function Gallery() {
  // 🔴 Never define a component inside another component!
  function Profile() {
    // ...
  }
  // ...
}
```

#### 导出和导入组件

可以先看这篇熟悉一下导入导出，是一样的。

[ES导入导出语法](../../Rollup/rollup-module-syntax)

##### 具名导出
```tsx
// 导出
export function MyCard(props: { name: string }) {  // 接收props
  return <div>{props.name}</div>;
}

// 在page里导入和使用
import {MyCard} from '../components/MyCard';
export default function Page() {
    return (
        <>
            <MyCard name="Hello" />
        </>
    )
}

```

##### 默认导出

```tsx
// 默认导出
export default function MyButton(props: { text: string }) {
    return <button>{props.text}</button>
}

// 默认导入
import MyButton from "../components/MyButton.tsx";
export default function Page() {
    return (
        <>
            <MyButton text="click" />
        </>
    )
}

```



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

##### 总结

动态绑定class和style

``` tsx
export default function page() {
  const name = 'foo'
  const classList = 'w-10 h-10'
  const styleObj = {
    backgroundColor: 'red',
  }
  const active = true
  const activeClass = `${active ? 'active' : ''}`

  return (
    <>
      <div className={classList}>{name}</div>
      <div className="bg-blue-5 w-10 h-10"></div>
      <div style={{ background: 'red' }}></div>
      <div style={styleObj}></div>
      <div className={activeClass}></div>
      <div className={`${active}?'active':''`}></div>
      <div className={['test'].join(' ')}></div>
    </>
  )
}

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

#### 实现html循环遍历

使用map来返回jsx片段


``` jsx
export function mapRender() {
  const arr = [1, 2, 3]

  const users: userDto[] = [
    {
      name: 'foo',
      age: 18,
    },
    {
      name: 'bar',
      age: 19,
    },
    {
      name: 'zhang san',
      age: 20,
    },
  ]
  interface userDto { name: string, age: number }
  function UserCard({ user }: { user: userDto }) {
    return (
      <>
        <div>
          <h3>
            name:
            {user.name}
          </h3>
          <h4>
            age:
            {user.age}
          </h4>
        </div>
      </>
    )
  }

  return (
    <>
      <div>
        {arr.map((item) => {
          return <div key={item}>{item}</div>
        })}
      </div>

      <div>
        <ul>
          {users.map(user => (
            <li key={user.name}>{user.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          {users.map(user => (
            <UserCard key={user.name} user={user} />
          ))}
        </ul>
      </div>

    </>
  )
}
```


##### 动态添加item

```tsx
export function mapTest2() {
  const [items, setItems] = useState(['React', 'Vue', 'Angular'])

  const addItem = () => {
    setItems([...items, `New Item ${items.length + 1}`])
  }

  return (
    <div>
      <button onClick={addItem}>添加项</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
```

#### 条件渲染

v-if 渲染

```tsx

export function ifTest() {
  const [show, setShow] = useState(true)

  return (
    <div>
      <button onClick={() => setShow(!show)}>toggle</button>
      {show && <div>show</div>}
    </div>
  )
}


```

#### 添加内联样式

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

#### 添加外部css文件

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


### 总结

单个花括号和两个花括号

{}
{{}}

##### 单个花括号

使用场景：

单个花括号的使用场景有且只有在 tag里面的属性或者是tag包裹的内容

在单个花括号里面开启js的内容。
```tsx
export function test(){
    const testClass = 'input-wrapper'
    const content = <div>123</div>
    return (
        <>
            <input type="text" className={testClass}/>
            <div>{content}</div>
        </>
    )
}

```

##### 两个花括号

绑定内联css

style 绑定一个对象。

所以其实两个花括号 = jsx的js域然后里面放一个对象

等同于我创建一个obj然后用单个花括号绑定进去

```tsx
<div style={{width:"100px", height:"100px",backgroundColor:"red" }}></div>
```