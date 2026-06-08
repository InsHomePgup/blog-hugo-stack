---
title: ReturnType的使用
date: 2025-04-07
---
```ts
function add(a: number, b: number): number {
  return a + b;
}

type AddReturnType = ReturnType<typeof add>;  // AddReturnType 将会是 number 类型

```