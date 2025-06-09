---
title: 发布一个NPM包
date: 2025-01-20
tags:
  - npm
  - publish
  - release
categories:
  - npm
---
### 前沿

一个前端项目clone以后的标准流程是：

```
pnpm install
pnpm run [dev]
```

一个项目想安装一个工具的时候

```
pnpm install [utils]

pnpm add [utils]
```
平时一直在使用，但是不知道npm的包是怎么在工作的。

所以。

我想发布一个npm包，然后引入到自己的项目里！
### 准备项目

首先，准备项目代码。

发布一个简单的npm包，只需包含一个函数。

引入以后可以调用就算成功。
#### package.json 配置发布的包信息

那么不管是什么包，首先要了解的就是package.json 文件。

因为发包的配置都是从这里读取的。

```json
{
	"name": "a-text-npm-package", //  包的名称
	"version": "1.0.0",  // 包的版本
}
```

对于发布npm包来说，这个文件最重要的两个属性，name+version，这是必须的。
- version: 在npm包发布的作用当中是，指定当前的版本。
- name: 你发布到npm包的唯一名称。

剩下几个比较重要的属性
- files: ts build以后到dist，这里files填

```
"files": [  
  "dist"  
],
```

意思是npm publish 只上传dist目录的内容。
默认不添加这个属性的话会上传整个目录。
所以这项设置还是很重要的，毕竟依赖包里安装没编译的源码也没必要。

- main
```
"main": "./dist/index.js",
```
- types

指定dts文件

```
"types": "./dist/index.d.ts",
```
导出我们的`说明文档`

指定入口文件。

这个就很好理解了。我们需要要导入的内容，都要在这里导出。

src/index.ts 从这里导出。

编译以后的dist/index.js 就包含了我们导出的内容。

用户从npm安装好我们的包以后就可以直接导入我们导出的函数之类的了。


我们在安装一个包的时候通常是 npm install lodash-es

这里的lodash-es就是这个包的包名，也就是这里的name，这个值相当于一个包的id，所以是唯一的。

在我们指定一个包的名称的时候，需要到npm那里查询，是否有这个包的存在，不可能npm install 一个包名能安装两个的。

所以包名是禁止重复的。

怎么查重？

查询办法：
``` shell
# 查看包信息
npm view a-text-npm-package
# 模糊查询包名
npm search a-text-npm-package
```



### 发布包

[发布包文档](https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages)

![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250120130501168.png)
注册一个npm 账户

在终端执行

```
npm login
```

登录以后去项目的目录发布

```
npm publish
```

如果你设置了两步验证，这里还要进行验证。

发布完成以后可以直接去自己账户下查看这个包。

直接在npmjs.com去搜索的话可能搜不到。

点击登录的头像点击packages

### 本地调试

项目在发布前我们肯定是要做好本地测试的，用线上的包来做测试也不方便。

本地测试的方法：创建一个项目去安装我们自己的包,然后在项目里编写相关的内容进行测试。


![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250120135916228.png)

直接打开项目目录，根目录那一层，package.json 所在的那一层

到地址栏复制地址

然后用自己的前端项目

npm install [这个地址]

安装进来，然后引入进来做测试。

#### README.md怎么写？

使用AI的帮助。