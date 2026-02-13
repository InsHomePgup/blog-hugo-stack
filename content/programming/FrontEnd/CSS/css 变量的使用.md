---
title: "CSS 变量的使用"
date: 2024-12-01
categories:
  - frontend
  - css
tags:
  - DarkMode
  - css
---

### 基础使用

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Document</title>
    <style>
        :root {
            --main-color: deepskyblue;
        }
        .box1{
            background-color: var(--main-color);
            width: 100px;
            height: 100px;
        }
    </style>
</head>
<body>
    <div class="box1"></div>
</body>
</html>
```

声明一个css变量需要两个减号开头

--abc:xxx;

通常声明变量都在:root的伪类下

变量是大小写敏感的

使用的时候使用var函数包裹使用


### 使用css变量实现 深色/浅色模式


```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Document</title>
    <style>
        /* 默认浅色模式 */
        :root {
            --bg-color: #ffffff;
            --text-color: #000000;
        }

        /* 深色模式 */
        [data-theme="dark"] {
            --bg-color: #000000;
            --text-color: #ffffff;
        }

        /* 应用变量 */
        body {
            background-color: var(--bg-color);
            color: var(--text-color);
            transition: background-color 0.3s, color 0.3s;
        }
    </style>
</head>
<body>
<button id="theme-toggle-btn">切换主题</button>
<script>
    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";

        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme); // 记住用户选择
    };

    // 页面加载时应用上次选择的主题
    document.addEventListener("DOMContentLoaded", () => {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
    });

    document.getElementById("theme-toggle-btn").addEventListener("click", toggleTheme);

    document.addEventListener("DOMContentLoaded", () => {
        const savedTheme = localStorage.getItem("theme");
        const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

        document.documentElement.setAttribute("data-theme", savedTheme || systemPreference);
    });

</script>
</body>
</html>

```