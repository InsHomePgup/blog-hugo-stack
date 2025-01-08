---
title: Vue3 ref的一些使用
---
vue会检测ref的更新并且去更新Dom，但是这个不是同步发生的，可以在数据变更中调用nextTick() 等dom刷新以后再进行其他操作。
ref的更新和dom的更新是异步的。
``` js
import { nextTick } from 'vue'
async function increment() {
  count.value++
  await nextTick()
  // Now the DOM is updated
}
```

ref可以检测到一些深度嵌套的对象以及js的数组和map。


### 怎么把一个ref对象变成普通js对象

```js
const personRef = ref({  
  name: 'foo',  
  age: 20,  
});  
console.log('personRef=======', personRef);  
const personUnRef = unref(personRef);  
console.log('personUnRef==============', personUnRef);  
const personObj = toRaw(personUnRef);  
console.log('personObj==============', personObj);
```

一个ref对象，先unref得到一个proxy对象，再toRaw得到原始js对象。