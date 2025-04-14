---
title: react学习路线
date: 2025-04-14
---


---

## 🧭 React 学习路线总览

> ✅ 表示需要掌握  
> 💡 表示进阶可以后学

---

### **一、React 基础语法（必须掌握 ✅）**

- ✅ JSX 语法（类似模板语法）
    
- ✅ 组件创建（函数式组件为主）
    
- ✅ Props、children、默认值
    
- ✅ `useState`、`useEffect`、事件绑定
    
- ✅ 条件渲染、列表渲染（key 的作用）
    
- ✅ 受控组件（表单输入）
    
- ✅ 生命周期对比（Vue vs React）
    

📌 建议动手写几个小组件，比如：TodoList、计数器、表单提交等

---

### **二、Hooks 深入使用（必须掌握 ✅）**

- ✅ `useState`、`useEffect`
    
- ✅ `useRef`、`useMemo`、`useCallback`
    
- ✅ `useReducer`（适合复杂状态管理）
    
- ✅ `useContext`（全局状态传递）
    
- 💡 自定义 Hook 的封装技巧
    

📌 建议结合场景，比如“节流 Hook”、“局部缓存 Hook”

---

### **三、组件进阶 & 状态管理（进阶 💡）**

- ✅ 组件通信：props / context / 自定义事件
    
- ✅ React.memo / useMemo / useCallback 性能优化
    
- 💡 状态管理方案：
    
    - Context + useReducer（轻量）
        
    - Redux Toolkit（推荐）
        
    - Jotai / Zustand / Recoil（现代替代方案）
        

---

### **四、路由与异步处理（必须掌握 ✅）**

- ✅ React Router v6+
    
    - 嵌套路由、动态路由、守卫、懒加载
        
- ✅ 异步请求：
    
    - `fetch` / `axios`
        
    - `useEffect` 中如何安全处理请求
        
- 💡 使用 React Query、SWR 管理异步状态和缓存
    

---

### **五、样式方案（推荐掌握 ✅）**

- ✅ CSS Modules
    
- ✅ Tailwind CSS（流行推荐 ✅）
    
- 💡 styled-components / Emotion（CSS-in-JS）
    

---

### **六、组件设计与复用（工程化 💡）**

- 💡 组件封装：复用性、可组合性
    
- 💡 Slot 模拟、条件渲染、render props
    
- 💡 高阶组件（HOC）和自定义 Hook 的对比
    
- 💡 表单组件设计（参考 Ant Design）
    

---

### **七、React 原理（进阶 💡）**

- 💡 Virtual DOM / Fiber 架构
    
- 💡 Reconciliation 调和过程
    
- 💡 Concurrent Mode / 自动批处理
    
- 💡 Hooks 原理、闭包陷阱
    

---

### **八、构建与部署（工程必备 ✅）**

- ✅ Vite 或 Create React App（CRA）
    
- ✅ 项目结构划分
    
- ✅ ESLint + Prettier + husky
    
- ✅ 环境变量 & 多环境配置
    
- ✅ 部署到 Vercel / Netlify / 自己服务器
    

---

### **九、项目实战（必须！🔥）**

建议搞一个中等规模的项目，比如：

- 博客后台管理系统（CRUD）
    
- 电商购物车（商品 + 收藏 + 订单）
    
- 类似 Notion 的文档编辑器（结合富文本）
    

你可以在项目中用上：

- 路由 + 状态管理 + API 封装
    
- Tailwind CSS + 动画
    
- 自定义 Hooks + 组件封装
    

---

### 🧰 推荐工具 / 框架搭配

|场景|推荐|
|---|---|
|状态管理|Redux Toolkit / Zustand|
|请求库|axios / React Query|
|构建工具|Vite|
|UI 框架|Tailwind CSS / shadcn/ui|
|表单|react-hook-form|
|路由|react-router-dom|
|动画|Framer Motion|

---

