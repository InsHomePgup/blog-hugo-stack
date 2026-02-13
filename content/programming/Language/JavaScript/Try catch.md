---
title: JS-try catch
date: 2025-03-24
---
[MDN Try Catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)


```js
try {
  nonExistentFunction();
} catch (error) {
  console.error(error);
  // Expected output: ReferenceError: nonExistentFunction is not defined
  // (Note: the exact output may be browser-dependent)
}

```

try{}catch(error){}

try + 花括号 + catch + 圆括号 + 花括号

try的花括号内跟进需要监听error的代码

catch 捕获，圆括号内是异常对象(error)，花括号是后续处理

只会在有异常的时候运行

### finally

finally  + 花括号

`finally` 里的代码无论有没有错误，都会执行。

```js
try {
  let result = riskyFunction(); // 可能会抛出错误
  console.log(result);
} catch (error) {
  console.log("发生错误：", error.message);
} finally {
  console.log("无论发生错误与否，这部分代码都会执行。");
}

```