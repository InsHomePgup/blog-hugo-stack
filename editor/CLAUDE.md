## 开发规范

### Git

- 分支规范，当前main分支为发布分支，项目内有多个模块是在同时进行开发的，互相有依赖一些公共模块，develop分支负责开发公共内容，feat开发新增功能需求，fix分支用来线上的hotfix。每次开发功能前确定当前是在正确的分支上进行开发。
- 不自动提交代码，只有用户明确说"提交代码"或"commit"时才提交
- commit message 格式：`<type>: <简短描述>`（单行，无项目符号，无详细说明）
- commit message 不含 emoji、"Generated with Claude Code"、"Co-Authored-By" 等 AI 痕迹

### Vue

- Vue 文件不加注释
- 所有页面（page 级组件）模板必须有且仅有一个 `<div>` 根元素
- 模板中出现相同结构和样式的 HTML 块，必须用 v-for 渲染，数据抽成数组放在 script 中。
