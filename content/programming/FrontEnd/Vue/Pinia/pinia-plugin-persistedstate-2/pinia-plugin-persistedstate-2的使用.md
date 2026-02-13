---
title: pinia 插件 pinia-plugin-persistedstate-2的使用
date: 2025-02-08
categories:
  - Vue
tags:
  - Pinia
  - Cache
---
pinia-plugin-persistedstate 和 pinia-plugin-persistedstate-2 都是持久化插件。


这里选用 -2的这个包，是因为可以自定义持久化使用的set和get方法。


![](https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/20250208153253271.png)

这里的默认get set还是使用的 json 的序列化
如果能自定义序列化函数，那么可以使用另外一个缓存工具

[localforage](https://www.npmjs.com/package/localforage)

这个缓存的特点是支持promise的异步调用。还有降级使用，优先使用更领先的存储方案，indexedDB。如果当前的浏览器不支持的话，再降级使用localStorage

[indexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

```ts
const pinia = createPinia()

pinia.use(createPersistedStatePlugin({
  storage: {
    getItem: async (key) => {
      return localforage.getItem(key)
    },
    setItem: async (key, value) => {
      return localforage.setItem(key, value)
    },
    removeItem: async (key) => {
      return localforage.removeItem(key)
    },
  },
}))
```