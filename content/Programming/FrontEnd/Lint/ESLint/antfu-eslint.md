---
title: antfu-eslint-config
date: 2025-01-08
---
![Owner avatar](https://avatars.githubusercontent.com/u/11247099?s=48&v=4) **[eslint-config](https://github.com/antfu/eslint-config)**

antfu 大佬的eslint项目，非常好用。
平常前端最烦恼的一个问题是eslint和prettier都包含有format的功能，难以统一。
比如我碰到过用eslint format以后，prettier又爆红了，因为两个format规则有冲突。
这个项目的特性，最重要的一点是

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


vue eslint 内置规则 所在目录
```
src/configs/vue.ts
```

用的不爽的rule可以用userConfig去覆盖。
内置规则去这里找源码查看就好了。src/config