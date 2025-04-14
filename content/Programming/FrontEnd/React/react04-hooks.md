---
title: react04-hooks
date: 2025-04-12
---
简单说，**Hooks 是一些函数**，可以让函数组件也拥有原本只有类组件才能用的功能。

```tsx
import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `点击了 ${count} 次`;
  }, [count]); // 只有 count 改变时才执行

  return (
    <div>
      <p>你点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>点我</button>
    </div>
  );
}

```

所有的hooks都是用use开头的，常见的比如

useState,useEffect,useContext

useRef.

