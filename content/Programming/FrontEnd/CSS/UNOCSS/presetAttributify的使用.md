---
title: "presetAttributify的使用"
date: 2024-12-01
categories:
  - frontend
  - css
---

unocss预设 - Attributify

 
**[vitesse-lite](https://github.com/antfu-collective/vitesse-lite)**

clone 此项目快速使用特性。

[# Attributify preset](https://unocss.dev/presets/attributify)

场景：

平常在写原子化css的时候，写一个border，特别的麻烦。

因为border的声明比较多。

```
rounded border-2 border-blue-200 border-solid
```

border-radius，border-width，border-color  border-style

```
<button  
  bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"  
  text="sm white"  
  font="mono light"  
  p="y-2 x-4"  
  border="rounded 2 solid  blue-200"  
>  
  Button  
</button>
```

使用预设以后写css

```
border="rounded 2 solid  blue-200"  
```