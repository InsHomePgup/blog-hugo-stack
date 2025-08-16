---
title: "useState"
date: 2024-12-01
categories:
  - frontend
  - react
---
[https://react.dev/reference/react/useState](https://react.dev/reference/react/useState)

`useState` is a React Hook that lets you add a [state variable](https://react.dev/learn/state-a-components-memory) to your component.

改变状态使用useState

我理解成改变组件的状态，其实也就是控制组件的变量。

改变组件的变量。

比如我们有个button，然后进入了Loading状态，就可以使用useState来改变。

一下是一个boolean值的修改状态的形式

基础值都可以直接这样去修改state


```tsx
import { useState } from 'react'

export default function btnDemosPage() {
  const [btnLoading, setBtnLoading] = useState(false)
  const handleClick = () => {
    setBtnLoading(true)
    setTimeout(() => {
      setBtnLoading(false)
    }, 2000)
  }
  return (
    <>
      <button onClick={handleClick} loading={btnLoading}>
        click me.
      </button>
    </>
  )
}

```

接下去是常见的Object的修改方式的示例

```tsx
import { useState } from 'react'  
  
export default function stateDemosPage() {  
  const [person, setPerson] = useState({  
    name: 'foo',  
    age: 18,  
    gender: 0,  
  })  
  return (  
    <>  
      <div>stateDemos</div>  
      <div>  
        <div>  
          name:  
          {person.name}  
        </div>  
        <div>  
          age:  
          {person.age}  
        </div>  
        <div>  
          gender:  
          {person.gender}  
        </div>  
      </div>  
      <div>  
        <input  
          type="text"  
          value={person.name}  
          onChange={(e) => {  
            setPerson({  
              ...person,  
              name: e.target.value,  
            })  
          }}  
        />  
      </div>  
    </>  
  )  
}
```

这里我们主要关注setPerson函数，传入了一个新的对象，用扩展运算符展开对象+覆盖新的被修改的值。


### useState是异步的

```tsx
const [count, setCount] = useState(0);

const handleClick = () => {
  setCount(count + 1);
  console.log(count); // 输出的还是旧值
};
```