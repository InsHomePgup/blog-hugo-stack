---
title: Vue3插槽的使用
tags:
  - Vue
  - Vue3
  - Slot
categories:
  - Vue
date: 2025-06-11
---
## 插槽

组件的灵活性很大一部分都来源于插槽，这大大提升了组件的扩展性。

在React里，可以直接加入一个jsx片段就是一个插槽。

### 默认插槽

``` html
    <div class="default-slot">
      <h3>默认插槽内容:</h3>
      <slot>
        <p>这是默认插槽的后备内容</p>
      </slot>
    </div>
```

```html
<child>
  在这里
</child>
```

### 具名插槽

### 作用域插槽

### 动态插槽

### 列表作用域插槽

### 条件渲染插槽

