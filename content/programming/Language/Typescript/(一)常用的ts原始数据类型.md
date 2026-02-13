---
title: ts常用的原始数据类型
date: 2023-01-01
categories:
  - Typescript
tags:
  - ts
---

```ts
const numA: number = 0  
const str: string = ''  
const boo: boolean = false  
const obj: null = null  
const u: undefined = undefined  
function abc(): void {} // void  
console.log(u, numA, str, boo, obj, abc)
```

void常用与函数的返回值。
null,undefined,常用于联合类型。
null，还没声明的object的类型。
undefined，不知道有什么用。

