---
title: "DOM和它的一些事儿。"
date: 2024-12-01
categories:
  - frontend
---

Document Object Model

GPT：DOM（文档对象模型，Document Object Model）是用于表示和操作HTML和XML文档的一种编程接口。它以树形结构的形式表示文档的内容，使得开发者可以通过编程语言（如JavaScript）来动态地修改、删除或添加文档的内容和结构。

什么是DOM，DOM在MDN里是用Web API来解释的。

Web ，World Wide Web。
Web服务器，Web浏览器，Web网页。
Web也就是万维网，全球局域网。
我们一般说的Web应用就是Web网页,浏览器应用。

DOM是Web API，Web API：给网页应用的一些应用接口。
DOM 不是 JavaScript 语言的一部分，而是用于建立网站的 Web API。

还有一个常见的Web API 比如History API，用来操作浏览器路由的前进后退。

我们通常使用JavaScript调用Web API。

比如 使用js的document对象来调用DOM API
```
document.getElementById
```

DOM 树，浏览器解析HTML构建DOM树，DOM树描述文档的内容。
比如HTML根元素，就是文档树的跟节点，DOM节点的数量越多，构建DOM树的时间就越长。



