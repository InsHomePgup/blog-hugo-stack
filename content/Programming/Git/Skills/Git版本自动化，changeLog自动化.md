---
title: Git版本自动化，changeLog自动化
date: 2025-04-25
categories:
  - git
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
git push --follow-tags
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
