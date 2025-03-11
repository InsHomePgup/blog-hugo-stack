---
title: 探索组件
date: 2025-03-10
categories:
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