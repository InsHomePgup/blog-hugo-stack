---
title: Git版本自动化，changeLog自动化
date: 2025-04-25
categories:
  - git
weight: 9
series:
  - name: Git 技巧
    index: 9
---

## 发版困难的问题

随着项目的不断迭代和版本更新，版本号和更新日志的问题人工手动有点烦了。

遂采用下面的方案，标准自动化commit + release

使用下面的方案以后，发布版本被分解成 日常的详细commit + 自动语义化控制版本。

### 使用方案后
#### 日常

```
pnpm run commit
```

执行commit script来编写项目commit

#### 发版

```
pnpm run release
```

自动化升级版本 以及完善changelog

### 行动

1. 安装工具

```bash
pnpm install --save-dev commitizen cz-conventional-changelog standard-version
```

2. 配置package.json

```json
"config": {
  "commitizen": {
    "path": "cz-conventional-changelog"
  }
}
```

3. 添加一些scripts 方便使用

```json
"scripts": {
  "commit": "cz",
  "release": "standard-version",
  "release:beta": "standard-version --prerelease beta",
  "release:minor": "standard-version --release-as minor",
  "release:major": "standard-version --release-as major",
  "release:patch": "standard-version --release-as patch"
}

```
> 如果用了eslint的git pre commit检查的话，命令可以修改成先执行eslint再执行commit

请根据自己需要来编辑这行命令

```json
{
	"commit": "git add . && eslint . --fix && git add . && cz --no-verify",
}
```

4. 日常的commit怎么提交？

```bash
pnpm run commit
```

根据提示完成提交。

5. 发布版本

```
pnpm run release
# 或
pnpm run release:minor
# 或
pnpm run release:beta
```

6. 推送

```bash
git push --follow-tags # 同时推送版本的tags
npm publish   # 如果你要发 npm
```


### 番外：完全自动化升级版本

自动 bump 版本 + 自动更新 changelog + 自动 add + 自动 commit，减少人工手动步骤。

在package.json 再添加一块配置

```json
"standard-version": {
  "scripts": {  
    "postbump": "git add package.json CHANGELOG.md",  
    "postchangelog": "git commit -m \"chore(release): update changelog\""  
  }  
},
```

现在只需要

```bash
pnpm run release
```

就可以开始快乐的更新新的版本了。


### 语义化版本

## 🎯 语义化版本（SemVer）

标准的版本号格式是这样的：

MAJOR.MINOR.PATCH
比如：1.4.2

🔹 各部分代表什么？

| 名称      | 举例                | 意义简述                       |
| ------- | ----------------- | -------------------------- |
| `MAJOR` | `1.x.x` → `2.0.0` | 💥 有**破坏性变更**，以前写的代码可能不能用了 |
| `MINOR` | `1.2.x` → `1.3.0` | ✨ 新增功能，但还是**兼容旧代码**        |
| `PATCH` | `1.2.3` → `1.2.4` | 🐞 只修复 bug，不加新功能           |

### 📌 举个例子理解

假设你有一个后端 API：

GET /user/info

🟢 PATCH 更新
修了个 bug：某些 userId 会返回 500。

- 版本从 `1.2.3` → `1.2.4`
    
- 对别人来说，接口功能没变，只是更稳定了
    

#### 🟡 MINOR 更新

加了一个新接口：

POST /user/follow

- 版本从 `1.2.3` → `1.3.0`
    
- 老接口都还在，新功能只是锦上添花，兼容的
    

#### 🔴 MAJOR 更新

你把原来的接口改名了：
GET /user/info → GET /user/profile
- 版本从 `1.2.3` → `2.0.0`
    
- 以前调用 `/user/info` 的代码直接炸了，**破坏性变更**


🔸 预发布版本：Beta / Alpha / RC

语义版本还支持后缀，比如：

```matlab
1.3.0-beta.0
1.3.0-alpha.2
1.3.0-rc.1
```

| 名称      | 意义                       | 典型用法     |
| ------- | ------------------------ | -------- |
| `alpha` | 初步预览，功能未完成               | 内部开发阶段   |
| `beta`  | 功能基本完成，开始测试              | 给测试人员用   |
| `rc`    | 候选发布版（Release Candidate） | 准备上线前的版本 |
这些版本不会覆盖正式版，是用于「提前发布但不影响稳定用户」。

🧠 总结一句话：

>**Patch 是修 bug，Minor 是加功能，Major 是搞大事（破坏兼容性）**  
	Beta、Alpha、RC 是给「预发布」做准备的
 

### 完整语义化发布的Scripts

```json
"scripts": {
  "commit": "cz",
  "release": "standard-version",
  "release:patch": "standard-version --release-as patch",
  "release:minor": "standard-version --release-as minor",
  "release:major": "standard-version --release-as major",
  "release:alpha": "standard-version --prerelease alpha",
  "release:beta": "standard-version --prerelease beta",
  "release:rc": "standard-version --prerelease rc",
  "release:canary": "standard-version --prerelease canary --skip.tag=true --skip.commit=true"
}

```

| 脚本命令         | 作用描述                                                                 | 示例版本变更     |
|------------------|--------------------------------------------------------------------------|------------------|
| release          | 自动根据提交信息生成版本（常规升级）                                     | 1.0.0 → 1.1.0 或 1.0.0 → 2.0.0（依据提交类型） |
| release:patch    | 仅发布一个补丁版本（修复 bug，无破坏性更改）                             | 1.0.0 → 1.0.1     |
| release:minor    | 发布一个次版本（添加功能，兼容旧版本）                                    | 1.0.0 → 1.1.0     |
| release:major    | 发布一个主版本（不兼容的 API 更改）                                       | 1.0.0 → 2.0.0     |
| release:alpha    | 发布 alpha 测试版本（先行版，不稳定，仅供测试）                           | 1.0.0 → 1.0.1-alpha.0 |
| release:beta     | 发布 beta 测试版本（功能相对稳定，但仍在验证）                            | 1.0.0 → 1.0.1-beta.0  |
| release:rc       | 发布候选版本（Release Candidate，接近最终发布）                          | 1.0.0 → 1.0.1-rc.0    |
| release:canary   | 发布 canary 版本（每日构建或预发布，跳过打 tag 和 commit）               | 1.0.0 → 1.0.1-canary.0（不生成 Git 标签与提交） |

## 🎬 实际项目发布场景模拟

下面通过几个真实的开发场景,来演示如何在日常工作中使用这套自动化版本管理方案。

### 场景一:日常功能迭代

**背景**: 你正在开发一个 Vue3 组件库,当前版本是 `1.2.3`

#### 第 1 周:日常开发

```bash
# 周一:修复了一个按钮组件的样式问题
pnpm run commit
# 选择: fix
# 输入: 修复 Button 组件在暗色模式下的边框显示问题

git push

# 周三:新增了一个 Tooltip 组件
pnpm run commit
# 选择: feat
# 输入: 新增 Tooltip 组件,支持四个方向的提示

git push

# 周五:优化了打包配置
pnpm run commit
# 选择: perf
# 输入: 优化 Rollup 打包配置,减少 30% 的包体积

git push
```

#### 第 2 周:准备发版

```bash
# 查看本周的提交记录
git log --oneline

# 发现有新功能(feat),决定发布 minor 版本
pnpm run release:minor
# 自动升级: 1.2.3 → 1.3.0
# 自动生成 CHANGELOG.md

# 推送版本和标签
git push --follow-tags

# 如果是 npm 包,发布到 npm
npm publish
```

**结果**: 版本从 `1.2.3` → `1.3.0`,CHANGELOG 自动包含了这周的所有改动

---

### 场景二:紧急修复生产 Bug

**背景**: 线上版本 `2.1.0` 发现严重 bug,需要紧急修复

```bash
# 1. 基于当前 master 创建修复分支
git checkout -b hotfix/critical-bug

# 2. 修复代码后提交
pnpm run commit
# 选择: fix
# 输入: 修复用户登录时 token 过期未刷新的问题
# 标记 BREAKING CHANGE? No
# 关联 issue: #234

# 3. 合并回 master
git checkout master
git merge hotfix/critical-bug

# 4. 立即发布补丁版本
pnpm run release:patch
# 自动升级: 2.1.0 → 2.1.1

# 5. 推送并发布
git push --follow-tags
npm publish
```

**时间线**:
- 14:00 发现 bug
- 14:30 修复完成并提交
- 14:45 版本 `2.1.1` 发布上线

---

### 场景三:大版本重构

**背景**: 项目从 Vue2 迁移到 Vue3,API 有破坏性变更,当前版本 `1.8.5`

#### 阶段 1: Alpha 内部测试(1-2 周)

```bash
# 每天完成一部分迁移工作
pnpm run commit
# feat: 迁移核心组件到 Vue3 Composition API

pnpm run commit
# refactor: 重写状态管理,使用 Pinia 替代 Vuex

# 发布 alpha 版本供团队内部测试
pnpm run release:alpha
# 1.8.5 → 2.0.0-alpha.0

git push --follow-tags
npm publish --tag alpha  # 使用 alpha 标签,不影响 latest
```

#### 阶段 2: Beta 公开测试(2-3 周)

```bash
# 修复 alpha 阶段发现的问题
pnpm run commit
# fix: 修复 Composition API 下响应式丢失问题

# 发布 beta 版本供更多用户测试
pnpm run release:beta
# 2.0.0-alpha.3 → 2.0.0-beta.0

git push --follow-tags
npm publish --tag beta
```

#### 阶段 3: RC 候选版本(1 周)

```bash
# 最后的打磨
pnpm run commit
# docs: 更新迁移指南文档

# 发布候选版本
pnpm run release:rc
# 2.0.0-beta.2 → 2.0.0-rc.0

git push --follow-tags
npm publish --tag rc
```

#### 阶段 4: 正式发布

```bash
# 一切就绪,发布正式版本
pnpm run release:major
# 2.0.0-rc.0 → 2.0.0

git push --follow-tags
npm publish  # 发布到 latest 标签
```

**完整时间线**:
- 第 1-2 周: `2.0.0-alpha.0` ~ `alpha.3` (内部测试)
- 第 3-5 周: `2.0.0-beta.0` ~ `beta.2` (公开测试)
- 第 6 周: `2.0.0-rc.0` ~ `rc.1` (发布候选)
- 第 7 周: `2.0.0` 正式发布

---

### 场景四:持续集成与自动发布

**背景**: 团队使用 GitHub Actions 实现自动化发布

#### GitHub Actions 配置示例

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    branches:
      - master

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0  # 获取完整历史用于生成 changelog

      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm run build

      - name: Run tests
        run: pnpm run test

      - name: Release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          pnpm run release
          git push --follow-tags
          npm publish
```

#### 日常工作流

```bash
# 开发者只需要:
# 1. 写代码
# 2. 规范提交
pnpm run commit

# 3. 推送到 main 主分支
git push

# 剩下的事情 CI 自动完成:
# ✅ 运行测试
# ✅ 打包构建
# ✅ 自动升级版本
# ✅ 生成 CHANGELOG
# ✅ 创建 Git Tag
# ✅ 发布到 npm(如果是发布npm包)
# ✅ 创建 GitHub Release
```

---

### 场景五:Monorepo 多包管理

**背景**: 使用 pnpm workspace 管理多个包,如 `@myapp/core`、`@myapp/ui`、`@myapp/utils`

#### 独立版本管理

```bash
# 只更新 core 包
cd packages/core
pnpm run commit
# feat: 添加新的数据校验方法

pnpm run release:minor
# @myapp/core: 1.2.0 → 1.3.0

# 只更新 ui 包
cd packages/ui
pnpm run commit
# fix: 修复表格组件的排序问题

pnpm run release:patch
# @myapp/ui: 2.1.3 → 2.1.4
```

#### 统一版本管理

```bash
# 根目录配置 script
"scripts": {
  "release:all": "lerna version --conventional-commits && lerna publish from-git"
}

# 一次性发布所有有变更的包
pnpm run release:all
```

---

### 🎯 开发发布场景总结

#### ✅ 日常开发
1. **每个功能/修复都要单独提交**,不要攒一堆一起提交
2. **使用 `pnpm run commit`** 强制规范化提交信息
3. **及时推送**,避免本地积累太多 commit

#### ✅ 版本发布
1. **小版本(patch)**: 每周或每两周一次,累积的 bug 修复
2. **中版本(minor)**: 每月一次,新功能比较稳定时
3. **大版本(major)**: 每季度或每半年,重大重构或 API 变更
4. **预发布版本**:
   - `alpha`: 内部开发团队使用
   - `beta`: 小范围用户测试
   - `rc`: 准备正式发布前的最后验证

#### ✅ CI/CD 集成
1. 在 CI 中自动运行测试
2. 测试通过后才允许发布
3. 自动推送 tag 和创建 GitHub Release
4. 生产环境只部署正式版本,测试环境可以用 beta/rc

#### ⚠️ 注意事项
1. **发布前检查**: `git log` 确认要包含的改动
2. **不要手动改版本号**: 完全交给 `standard-version`
3. **CHANGELOG 不要手动编辑**: 自动生成的才能保证一致性
4. **预发布不要覆盖 latest**: 使用 `npm publish --tag beta`
5. **重要版本打 tag 后不要删除**: tag 是版本的永久标记
