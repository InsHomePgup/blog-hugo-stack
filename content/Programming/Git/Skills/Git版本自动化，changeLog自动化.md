---
title: Git版本自动化，changeLog自动化
---
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


### 番外：完全自动化

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