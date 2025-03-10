---
title: rollup more - ES Module Syntax ES6导入导出方法
tags:
  - ES6
  - rollup
categories:
  - JavaScript
---
ES6 - ECMAScript 2015 的导入导出的一些方法。


### Named Imports

具名的导入导出

这里是针对单个变量，或者函数的导入导出。

```

export const numA = 2;

export function sum(){  

}

import {numA,sum} from "./foo.ts";

```

### Namespace Imports

命名空间导入导出

首先我们有一个foo.ts
```
  
export const numA = 2;  
  
export function sum(){  
  
}  
  
const abc = 5;  
  
export default 'hello world!';
```

There have three exports , two named exports, one default export.

Now , let's show the fooModule.

使用命名空间导入。

```
import * as fooModule from './foo.ts';

console.log(fooModule)
[Module: null prototype] {
  __esModule: true,
  default: 'hello world!',
  numA: 2,
  sum: [Function: sum]
}

```

只能看到被exports的内容。

### Default Import

```ts
// foo.ts
export default 'hello world!';
```

``` ts
import foo from './foo.ts';  
console.log(foo) // hello world!
```


只能拿到default 关键字导出的内容。


### Dynamic Import

需在rollup config内开启一个配置

<img src="https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20241220133147887.png" width="50%">

nodejs 的commonjs 是不支持动态import导入的
去package.json开启type = module

``` ts
// main.ts
// 还是加载之前的foo.ts

async function loadFoo(){  
    try{  
        const fooModule = await import('./foo.ts')  
        console.log(fooModule)  
    }catch (e) {  
        console.error("import module error ")  
    }}  
loadFoo().then()  
export default function Abc() {  
}
```

```text
打印出来的模块
[Module: null prototype] {
  default: 'hello world!',
  numA: 2,
  sum: [Function: sum]
}
```