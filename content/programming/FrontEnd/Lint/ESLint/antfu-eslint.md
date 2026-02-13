---
title: antfu-eslint-config
date: 2025-01-08
tags:
  - Eslint
  - Vue
categories:
  - Lint
---
![Owner avatar](https://avatars.githubusercontent.com/u/11247099?s=48&v=4) **[eslint-config](https://github.com/antfu/eslint-config)**

antfu 大佬的eslint项目，非常好用。
平常前端最烦恼的一个问题是eslint和prettier都包含有format的功能，难以统一。
比如我碰到过用eslint format以后，prettier又爆红了，因为两个format规则有冲突。
这个项目的特性，很爽的一个点是:

```
Auto fix for formatting (aimed to be used standalone **without** Prettier)
```

without prettier.
说实话我是非常的不喜欢prettier，配置困难不清晰，官方文档能给的支持非常有限。
各种强制换行还找不到对应的配置条目，很令人崩溃。

##### 安装

```shell
pnpm i -D eslint @antfu/eslint-config
```

##### 导入

```ts
// eslint.config.mjs
import antfu from '@antfu/eslint-config'
export default antfu()
```

##### package.json 去添加script

``` json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

##### ide 配置

eslint & auto fix on save

#### 我的vue3的antfu-eslint配置

```ts
// eslint.config.mjs
import antfu from '@antfu/eslint-config'

const eslintObj = antfu(
  {
    vue: true,
    typescript: true,
    ignores: [
      'src/vite-env.d.ts',
    ],
  },
  {
    rules: {
      'no-console': 'off',
      'vue/html-indent': ['error', 2],
      'indent': ['error', 2],
      'style/indent': ['error', 2],
      'vue/block-order': ['error', {
        order: ['template', 'script', 'style'],
      }],
      'vue/attribute-hyphenation': ['error', 'never'],
      'vue/max-attributes-per-line': ['error', {
        singleline: {
          max: 5,
        },
        multiline: {
          max: 1,
        },
      }],
      'vue/html-self-closing': 'off',
    },
  },
)
export default eslintObj

```


vue eslint 内置规则在源码的目录

在这里可以看到antfu-eslint对vue项目的一些eslint规则

```
src/configs/vue.ts
```

用的不爽的rule可以用userConfig去覆盖。

其他规则去源码查看就好了。目录：src/config


#### 一些尝试和理解
进入源代码来理解一下这个配置应该怎么写。
github 的readme已经有很详细的配置写法了，不过我一开始用这个项目的时候也没太理解这个配置应该怎么写。

``` ts
// src/index.ts
import { antfu } from './factory'  
  
export * from './configs'  
export * from './factory'  
export * from './globs'  
export * from './types'  
export * from './utils'  
  
export default antfu
```

import { antfu } from './factory'  
进到antfu这个函数来

![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250110105450564.png)
有两个参数，一个options一个用展开运算符收集的userConfig
第一个options，后面收集的对象都是userConfig
整个项目讲究一个flat。平整。
第一个options我们去看看都要配置啥。
options的单项默认都是开关也可以额外进行配置。

这里我用ts的enable作为一个入口去看

![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250110110038977.png)

解构赋值 + 别名从options里拿出来的内容。

往下看，enableTypeScript又有什么操作呢。

![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250110110125451.png)

这里去configs里面push了typescript函数，接受一个对象作为参数，一个展开我们在options里面传入的typescript options，剩下三个。
- typescriptOptions
options可以是boolean或者是对应的配置项
![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250110110513869.png)

- componentExts
exts，文件后缀集合

![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250110110838279.png)
- overrides

	getOverrides函数，获取userConfig里面的覆盖的配置

- type

看了一下上下文，type有两个值，app或者是lib

![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250110111814705.png)
![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250110111857676.png)

与type有关的便是如果type = lib就添加这一段规则。

折叠代码以后来看typescript函数的内容

![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250110112406623.png)


files: 匹配文件后缀,要么options里面指定了，要么就是ts或者tsx文件 + 用户指定的额外文件后缀

![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250110112501417.png)

![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250110112714255.png)

```ts
const filesTypeAware = options.filesTypeAware ?? [GLOB_TS, GLOB_TSX]
```