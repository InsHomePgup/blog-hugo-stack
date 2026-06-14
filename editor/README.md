# vue3-ts-tdesign

Vue 3 + TypeScript + TDesign 项目模板，开箱即用。

## 技术栈

| 分类         | 技术                                        |
| ------------ | ------------------------------------------- |
| 框架         | Vue 3 + TypeScript                          |
| 构建         | Vite 8                                      |
| UI 组件      | TDesign Vue Next（按需自动导入）            |
| CSS          | UnoCSS                                      |
| 路由         | Vue Router 5（文件路由，基于 `src/pages/`） |
| 状态管理     | Pinia                                       |
| 工具函数     | VueUse                                      |
| HTTP         | ofetch                                      |
| API 代码生成 | Orval（OpenAPI → TypeScript）               |
| 代码规范     | ESLint（@antfu/eslint-config）              |
| 版本发布     | release-it + conventional-changelog         |

## 自动导入

- `vue`、`vue-router`、`@vueuse/core`、`pinia` 的 API 全部自动导入，无需手动 import
- TDesign 组件按需自动导入，无需注册
- 路径别名 `@` 指向 `src/`

## 快速开始

**使用此模板创建新项目后：**

```bash
pnpm install
pnpm dev
```

**其他命令：**

```bash
pnpm build          # 类型检查 + 构建
pnpm lint           # ESLint 检查
pnpm lint:fix       # ESLint 自动修复
pnpm gen:api        # 根据 OpenAPI spec 生成 API 代码（需配置 orval.config.ts）
pnpm release        # 交互式发版
```

## 目录结构

```
src/
├── api/            # Orval 生成的 API 代码（generated/）和 OpenAPI specs（specs/）
├── assets/         # 静态资源
├── components/     # 公共组件
├── Layout/         # 布局组件
├── pages/          # 页面（文件路由自动生成路由表）
├── router/         # 路由配置
├── utils/          # 工具函数（request.ts 封装 ofetch）
└── main.ts
```

## 文件路由

路由由 `src/pages/` 下的文件结构自动生成，无需手动维护路由表：

```
src/pages/
├── index.vue       → /
├── about.vue       → /about
├── demo.vue        → /demo
└── user/
    └── index.vue   → /user
```

## API 代码生成

在 `src/api/specs/` 下放置 OpenAPI JSON/YAML 文件，修改 `orval.config.ts` 配置后运行：

```bash
pnpm gen:api
```

生成的 TypeScript 类型和请求函数输出到 `src/api/generated/`。

## 版本发布

遵循 Conventional Commits 规范提交，发版时自动生成 CHANGELOG：

```bash
pnpm release:patch  # 补丁版本
pnpm release:minor  # 次版本
pnpm release:major  # 主版本
```
