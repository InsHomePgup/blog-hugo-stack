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

组件的灵活性很大一部分都来源于插槽（Slot），这大大提升了组件的可复用性和扩展性。它允许父组件在子组件的预留位置中插入任意内容。

在React里，类似的功能是通过 `props.children` 实现的，可以直接将JSX片段作为属性传递。

### 默认插槽

当子组件只定义一个匿名插槽时，父组件传递的所有内容都会被放置在这个插槽中。

**子组件 (`ChildComponent.vue`)**
```html
<div class="default-slot">
  <h3>子组件标题</h3>
  <slot>
    <p>如果父组件没有提供内容，我将作为后备内容显示。</p>
  </slot>
</div>
```

**父组件使用**
```html
<ChildComponent>
  <p>这是从父组件传递过来的内容，它将替换掉子组件的后备内容。</p>
</ChildComponent>
```

### 具名插槽

当我们需要在子组件的不同位置插入不同内容时，就需要使用具名插槽。通过为 `slot` 元素添加 `name` 属性，我们可以定义多个插槽。

**子组件 (`LayoutComponent.vue`)**
```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot> <!-- 这是一个默认插槽 -->
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

**父组件使用**
在父组件中，我们使用 `v-slot` 指令并带上插槽的名字来指定内容的目标插槽。`v-slot` 有一个简写形式 `#`。

```html
<LayoutComponent>
  <!-- 使用 v-slot:header -->
  <template v-slot:header>
    <h1>网站标题</h1>
  </template>

  <!-- 默认插槽可以隐式使用，或用 #default -->
  <template #default>
    <p>这里是主要内容。</p>
  </template>

  <!-- 使用 #footer 简写 -->
  <template #footer>
    <p>版权信息 © 2025</p>
  </template>
</LayoutComponent>
```

### 作用域插槽

有时候，让父组件在渲染插槽内容时能够访问子组件的数据会非常有用。这就是作用域插槽的用途。子组件可以像传递 `props` 一样，将数据绑定到 `slot` 元素上。

**子组件 (`UserProfile.vue`)**
```html
<div>
  <!-- 将 user 对象绑定到插槽上 -->
  <slot :user="userData"></slot>
</div>

<script setup>
import { ref } from 'vue';
const userData = ref({
  name: 'John Doe',
  age: 30
});
</script>
```

**父组件使用**
父组件使用 `v-slot` 来接收子组件传递的 `props`。

```html
<UserProfile>
  <!-- "slotProps" 是一个自定义的名字，包含了所有从子组件传来的 props -->
  <template v-slot="slotProps">
    <p>用户名: {{ slotProps.user.name }}</p>
    <p>年龄: {{ slotProps.user.age }}</p>
  </template>
</UserProfile>

<!-- 也可以使用解构赋值，代码更简洁 -->
<UserProfile>
  <template #default="{ user }">
    <p>用户名: {{ user.name }}</p>
    <p>年龄: {{ user.age }}</p>
  </template>
</UserProfile>
```

### 动态插槽

如果你需要根据一个变量来决定渲染哪个插槽，可以使用动态插槽名。

**父组件使用**
```html
<LayoutComponent>
  <!-- 插槽的名字由 aynamicSlotName 变量决定 -->
  <template v-slot:[dynamicSlotName]>
    <p>这个内容会出现在 header 或 footer 中。</p>
  </template>
</LayoutComponent>

<script setup>
import { ref } from 'vue';
const dynamicSlotName = ref('header'); // 可以是 'header' 或 'footer'
</script>
```

### 列表作用域插槽

作用域插槽最常见的用例之一是渲染列表。子组件负责遍历数据，而父组件通过作用域插槽来定义每一项的显示样式。

**子组件 (`ItemsList.vue`)**
```html
<ul>
  <li v-for="item in items" :key="item.id">
    <!-- 将每一项 item 作为 prop 传给父组件 -->
    <slot name="item" :item="item"></slot>
  </li>
</ul>

<script setup>
defineProps(['items']);
</script>
```

**父组件使用**
```html
<ItemsList :items="myItems">
  <template #item="{ item }">
    <div class="custom-item">
      <span>ID: {{ item.id }}</span>
      <strong>{{ item.text }}</strong>
    </div>
  </template>
</ItemsList>

<script setup>
import { ref } from 'vue';
const myItems = ref([
  { id: 1, text: '学习 Vue' },
  { id: 2, text: '编写文档' }
]);
</script>
```

### 条件渲染插槽

你可以使用 `v-if` 或 `v-show` 指令来根据条件决定是否渲染某个插槽。

**父组件使用**
```html
<LayoutComponent>
  <template v-if="showFooter" #footer>
    <p>这个页脚是根据条件显示的。</p>
  </template>
</LayoutComponent>

<script setup>
import { ref } from 'vue';
const showFooter = ref(true);
</script>
```
这为构建高度灵活和动态的组件布局提供了强大的能力。