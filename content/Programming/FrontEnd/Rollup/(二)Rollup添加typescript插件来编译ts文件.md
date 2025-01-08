在官网的教程里演示的是添加json的plugin。
那么作为举一反三的能力，我选择添加ts的plugin
# @rollup/plugin-typescript
不知道怎么上手，那我先安装这个包试试。
``` bash
pnpm add @rollup/plugin-typescript --save-dev
```

![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/Pasted%20image%2020240830175050.png)

根据npm上的介绍，还需要安装这两个包。
```
pnpm add typescript tslib -S -D
```

然后配置文件添加plugin的配置

``` js

import typescript from '@rollup/plugin-typescript';  
export default {  
    input: 'src/main.js',  // 入口  
    output: {  // 出口  
        file: 'bundle.js',  
        format: 'cjs'  // 打包规范  
    },  
    plugins: [typescript()]  
};

```
npm 的介绍上说使用行内的写tsconfig的方法，我想了一下还是用文件的形式。

根目录创建tsconfig.json 文件
然后简单写入一些基础配置

``` json
// tsconfig.json 之前测试ts的时候的配置，随便加进来的
{  
  "compilerOptions": {  
    "module": "NodeNext",  
    "moduleResolution": "NodeNext",  
    "resolvePackageJsonExports": true,  
    "resolveJsonModule": true,  
    "allowImportingTsExtensions": true  
  }  
}
```

同时去修改rollup的config
``` js
// rollup.config.js
import typescript from '@rollup/plugin-typescript';  
export default {  
    input: 'src/main.js',  // 入口  
    output: {  // 出口  
        file: 'bundle.js',  
        format: 'cjs'  // 打包规范  
    },  
    plugins: [  
        typescript({  
            tsconfig: './tsconfig.json',  
        })  
    ]  
};

```

看上去非常不错，那么现在pnpm run build一下，很好，报错了。。



```
Specified 'include' paths were '["**/*"]' and 'exclude' paths were '[]'.
[!] (plugin typescript) RollupError: [plugin typescript] @rollup/plugin-typescript: Couldn't process compiler options
```

没有ts文件可以编译，因为我们当前目录下都是js文件，改用ts文件。
并且修改入口文件为main.ts
<img src="https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20241220110901717.png" width="50%">

<img src="https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20241220110939721.png" width="50%">

``` shell
pnpm run build
```

打包成功，但是有一条提示

```text
> rollup -c
src/main.ts → bundle.js...
(!) [plugin typescript] @rollup/plugin-typescript TS5096: Option 'allowImportingTsExtensions' can only be used when either 'noEmit' or 'emitDeclarationOnly' is set.
created bundle.js in 553ms
```

关于tsconfig的配置的一条提示。(这B配置提示要开启noEmit，但是后面我加上noEmit以后还是提示了这个错误)
"typescript": "^5.7.2"

在issue的讨论内说是已经在过往版本修复了。

[github issue](https://github.com/cypress-io/cypress/issues/26148)

不过这里也是打包成功了，现在可以在项目内使用ts了。