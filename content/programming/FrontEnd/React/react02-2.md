---
title: "探索组件"
date: 2024-12-01
categories:
  - frontend
  - react
weight: 2
---
从实用性角度出发，暂时不学习class创建组件的方式了。

直接入手function 创建组件。

### prop的一些使用

```tsx
// 一个props对象，从里面拿组件参数
export function ACard(props:{title:string}){
    return (
        <div className="card">
            {props.title}
        </div>
    )
}
// 解构
export function ACard({title}:{title:string}){
    return (
        <div className="card">
            {title}
        </div>
    )
}

// 默认值

export function ACard({title='title'}:{title:string}){
    return (
        <div className="card">
            {title}
        </div>
    )
}

// 父组件传递给子组件

export function Test({title}:{title:string}){
    return (
        <>
            <div>{title}</div>
        </>
    )
}

export function BCard({props}:{props:{title:string}}){
    return (
        <>
            <Test {...props}></Test>
        </>
    )
}

// 传递jsx片段

export function Test({content}:{content:React.ReactNode}){
    return (
        <>
            <div>{content}</div>
        </>
    )
}

export function CCard(){
    const content = <div>123</div>
    return (
        <>
            <Test content={content} />
        </>
    )
}
```

### 条件渲染

```tsx
export function ListItem({ title, isPacked }: { title: string, isPacked: boolean }) {
  if (isPacked) {
    return <li>packed</li>
  }
  else {
    return <li>{title}</li>
  }
}

export function conditionRender() {
  return (
    <>
      <ul>
        <ListItem isPacked={true} title="hello"></ListItem>
        <ListItem isPacked={false} title="hello"></ListItem>
      </ul>
    </>
  )
}

```

返回null = 不渲染

```tsx
if (isPacked) {  
  return null  
}
```

三元表达式条件渲染

```tsx
export function ListItem({ title, isPacked }: { title: string, isPacked: boolean }) {
  return <li>{isPacked ? title : ''}</li>
}
```

与(&&) 运算符

```tsx
export function ListItem({ title, isPacked }: { title: string, isPacked: boolean }) {
  return <li>{isPacked && title}</li>
}
```

### 列表渲染

```tsx
const people = [
  'Creola Katherine Johnson: mathematician',
  'Mario José Molina-Pasquel Henríquez: chemist',
  'Mohammad Abdus Salam: physicist',
  'Percy Lavon Julian: chemist',
  'Subrahmanyan Chandrasekhar: astrophysicist',
]

export function ListRender() {
  const listItems = people.map(person =>
    <li>{person}</li>,
  )
  return <ul>{listItems}</ul>
}
```