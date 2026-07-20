---
title: revert
date: 2025-03-22
weight: 10
series:
  - name: Git 命令
    index: 10
---
使用revert来回退某一次commit的代码

```
git revert commit_id
```

revert 可以创建一个新的commit而不是修改历史，所以更推荐在远程交互的时候使用。
