---
title: ReturnType的使用
---
```ts
function add(a: number, b: number): number {
  return a + b;
}

type AddReturnType = ReturnType<typeof add>;  // AddReturnType 将会是 number 类型

```