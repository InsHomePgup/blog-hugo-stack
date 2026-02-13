---
title: "Pinia Options API 使用方式"
date: 2024-12-01
categories:
  - frontend
  - vue
tags:
  - pinia
  - vue
---

记录一次使用

options使用方式

Store下面创建一个
counter.ts
``` typescript

// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return { count: 0 }
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++
    },
  },
})

```

引入以后可以直接在页面里当成页面的响应变量使用

``` typescript

<script setup>
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()

counter.count++
// 自动补全！ ✨
counter.$patch({ count: counter.count + 1 })
// 或使用 action 代替
counter.increment()
</script>

<template>
  <!-- 直接从 store 中访问 state -->
  <div>Current Count: {{ counter.count }}</div>
</template>

```