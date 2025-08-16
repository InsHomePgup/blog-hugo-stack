---
title: "Rollup 教程 - 构建工具入门"
date: 2024-12-01
categories:
  - frontend
  - build-tools
tags:
  - rollup
  - bundler
---

rollup真的是非常重要的技能了。
![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/Pasted%20image%2020240830171530.png)
光看官网的介绍的意思就是把很多小的js编译成一个大的。
如果我们写代码，那肯定是分成很多模块这样方便管理，但是打包的话，就是要把很多小块合成一个大块。

把rollup命令全局添加进来

我喜欢用pnpm

```
pnpm add -g rollup
```

创建一个项目 rollup-start
进入项目
在src目录下创建两个文件
main.js foo.js

<img src="https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20241220104549209.png" width="50%">

``` javascript
// src/main.js 
import foo from './foo.js'; 
export default function () { console.log(foo); }
```

```javascript
// src/foo.js
export default 'hello world!';
```



接下去使用rollup来进行打包

```bash
#  cli执行 输出到控制台  -f format cjs(CommonJS)
rollup src/main.js -f cjs


# 输出到文件 用cjs的规范 -o output
rollup src/main.js -o bundle.js -f cjs 

# src/main.js → bundle.js...
created bundle.js in 24ms

```

这里，起步指导说是要运行一段nodejs以后去直接执行js才能看到输出hello work
因为之前的代码里面并没有直接console log
所以加一段console log来直接node bundle.js 来看到结果
修改main.js
``` js
import foo from './foo.js';  
export default function main() {  
    console.log(foo);  
}  
main()
```

重新cli build
``` bash
rollup src/main.js -o bundle.js -f cjs

# 运行代码
node ./bundle.js
# 输出hello world

```

前端的工具都光cli然后还有大量配置的话肯定是非常不方便的，
所以需要配置文件
### Using Config Files

使用rollup 配置文件

```js
// rollup.config.mjs
// 根目录下创建的配置文件，不是在src下面
export default {
	input: 'src/main.js',  // 入口
	output: {  // 出口
		file: 'bundle.js',
		format: 'cjs'  // 打包规范
	}
};
```

写了一个配置文件以后
使用新的打包cli

```shell
#  -c 使用config 来打包
rollup -c
# 打包成功，和前面一样，所以打包之前可以删除bundle.js 来观察效果
```

![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/Pasted%20image%2020240830173314.png)
这个时候教程提示我们可以试试多环境的打包方式
其实就是使用rollup --config这个cli参数来指定其他的打包文件。

###  Installing Rollup locally

在项目内配置rollup

假设我们要写一个前端的库，打包很多js到一个js，那么这个库的源代码里肯定是引用了rollup
那么我们在刚刚的那个项目的根目录执行
pnpm init
pnpm add rollup -S -D

安装完成以后是这样，我们加一个script进去,同时删除script自带的test，没啥用。

<img src="https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20241220105745132.png" width="50%">

配置到这里以后可以愉快的使用pnpm run build 这种熟悉的方式来进行打包了！！！快乐来了。

[Rollup Tutorial](https://rollupjs.org/tutorial/)

