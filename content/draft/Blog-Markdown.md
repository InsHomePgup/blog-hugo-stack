---
title: "Markdown 编写规范手册"
date: 2025-11-12
draft: true
tags:
  - Markdown
  - 写作规范
  - 文档
categories:
  - 工具
description: "统一规范的 Markdown 编写指南，让文档更美观、更易读"
---

本文档提供了一套完整的 Markdown 编写规范，帮助保持文档格式的统一性和可读性。

## 标题层级规范（H1-H6）

### 基本原则

标题的正确使用方式：

```markdown
# H1 - 文档标题（每个文档只用一次）
## H2 - 主要章节
### H3 - 二级小节
#### H4 - 三级小节
##### H5 - 四级小节（少用）
###### H6 - 五级小节（少用）
```

### 核心规则

1. **H1 唯一性**：每个文档只使用一个 H1，作为文档标题
2. **连续性**：不要跳级使用标题（❌ H2 → H4，✅ H2 → H3）
3. **层级限制**：尽量不超过 H4，保持文档扁平化
4. **空行分隔**：标题前后各留一空行

### 正确示例

```markdown
# 文档标题

## 第一章节

这里是内容...

### 第一小节

更多内容...

## 第二章节
```

## 列表规范

### 无序列表

使用 `-` 作为统一的列表标记符号：

```markdown
- 项目一
- 项目二
  - 子项目（缩进 2 空格）
  - 子项目
- 项目三
```

### 有序列表

```markdown
1. 第一项
2. 第二项
   1. 子项（缩进 3 空格）
   2. 子项
3. 第三项
```

### 列表注意事项

- 列表前后保留空行
- 列表标记后必须有一个空格
- 嵌套列表：无序列表缩进 2 空格，有序列表缩进 3 空格
- 列表项之间通常不需要空行，除非包含多个段落

## 代码规范

### 内联代码

使用反引号标记变量、命令、函数名等：

```markdown
使用 `变量名` 来表示代码
执行 `npm install` 安装依赖
调用 `fetchData()` 函数
```

### 代码块

代码块必须指定语言，以便正确的语法高亮：

````markdown
```javascript
const hello = 'world';
console.log(hello);
```

```python
def hello():
    print("Hello, World!")
```

```bash
npm install
hugo server -D
```
````

### 代码块注意事项

- 始终指定语言（javascript、python、bash、json 等）
- 代码块前后保留空行
- 避免在代码块中使用过长的行（建议不超过 80-100 字符）

## 链接和图片

### 链接格式

```markdown
<!-- 行内链接 -->
[链接文本](https://example.com)

<!-- 带标题的链接 -->
[链接文本](https://example.com "鼠标悬停提示")

<!-- 引用式链接（推荐用于多次引用） -->
[链接文本][ref]

[ref]: https://example.com
```

### 图片格式

```markdown
<!-- 基本图片 -->
![替代文本](图片URL)

<!-- 带标题的图片 -->
![替代文本](图片URL "图片标题")

<!-- 引用式图片 -->
![替代文本][img-ref]

[img-ref]: 图片URL
```

### 注意事项

- 链接和图片的替代文本不要留空
- 替代文本应该简洁描述链接/图片内容
- 外部链接建议完整 URL，内部链接使用相对路径

## 文本强调

### 基本用法

```markdown
*斜体* 或 _斜体_
**加粗** 或 __加粗__
***加粗斜体*** 或 ___加粗斜体___
~~删除线~~
```

### 推荐做法

- **优先使用星号**：`*斜体*` 和 `**加粗**`
- **适度使用**：避免过度强调，保持文档清晰
- **语义化**：用加粗表示重要概念，用斜体表示术语或引用

## 引用块

### 基本格式

```markdown
> 这是一级引用
>
> 可以包含多个段落

> > 这是二级引用
```

### 引用块中的其他元素

```markdown
> ## 引用中的标题
>
> - 引用中的列表
> - 列表项
>
> ```javascript
> // 引用中的代码
> const code = true;
> ```
```

## 表格

### 基本格式

```markdown
| 列1 | 列2 | 列3 |
| --- | --- | --- |
| 数据1 | 数据2 | 数据3 |
| 数据4 | 数据5 | 数据6 |
```

### 对齐方式

```markdown
| 左对齐 | 居中 | 右对齐 |
| :--- | :---: | ---: |
| 左 | 中 | 右 |
```

### 表格注意事项

- 表格前后保留空行
- 使用管道符（`|`）对齐可以提高可读性（但不是必须的）
- 避免过宽的表格，考虑可读性

## 分隔线

使用三个或更多的连字符、星号或下划线：

```markdown
---
（或）
***
（或）
___
```

**推荐使用**：`---`（三个连字符）

**注意**：分隔线前后保留空行

## 中英文混排规范

### 空格使用

在中英文之间、中文与数字之间添加空格：

```markdown
✅ 使用 Hugo 构建博客
✅ 需要安装 Node.js 18 或更高版本
✅ 支持 Markdown 语法

❌ 使用Hugo构建博客
❌ 需要安装Node.js18或更高版本
```

### 标点符号

- **中文内容**：使用全角标点符号 `，。！？：；`
- **英文内容**：使用半角标点符号 `,. !?:;`
- **代码、链接、数字**：周围使用半角标点

```markdown
✅ 你好，世界。
✅ Hello, world.
✅ 使用 `npm install` 命令，然后等待安装完成。

❌ 你好,世界.
❌ 使用 `npm install` 命令,然后等待安装完成｡
```

## 文档结构最佳实践

### 完整的文档模板

```markdown
# 文档标题

简短的文档介绍，说明本文档的目的和内容概要。

## 目录（可选）

对于长文档，可以手动添加目录链接。

## 主要章节一

### 小节 1.1

内容...

### 小节 1.2

内容...

## 主要章节二

### 小节 2.1

内容...

## 参考资料

- [资料1](链接)
- [资料2](链接)
```

### 结构化原则

1. **开头**：文档标题 + 简短介绍
2. **主体**：使用二级标题划分主要章节
3. **详细内容**：使用三级、四级标题细化内容
4. **结尾**：总结、参考资料、相关链接

## Hugo 博客特定规范

### Frontmatter 格式

```markdown
---
title: "文章标题"
date: 2025-11-12
draft: false
tags:
  - 标签1
  - 标签2
categories:
  - 分类
description: "文章简短描述（建议 50-160 字符）"
image: "封面图片URL（可选）"
---
```

### 正文注意事项

1. **不要重复 H1 标题**：Hugo 会自动从 frontmatter 的 `title` 生成标题
2. **从 H2 开始**：正文直接从二级标题（`##`）开始
3. **使用相对路径**：引用同一博客内的文章或图片

### 图片处理

```markdown
<!-- 使用 Hugo 的静态资源 -->
![图片描述](/images/my-image.jpg)

<!-- 使用外部图片 -->
![图片描述](https://example.com/image.jpg)
```

## 工具和自动化

### markdownlint 配置

创建 `.markdownlint.json` 文件：

```json
{
  "default": true,
  "MD001": true,
  "MD003": { "style": "atx" },
  "MD004": { "style": "dash" },
  "MD007": { "indent": 2 },
  "MD013": { "line_length": 120 },
  "MD024": { "siblings_only": true },
  "MD033": false,
  "MD041": true
}
```

### EditorConfig 配置

创建 `.editorconfig` 文件：

```ini
[*.md]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = 2
max_line_length = 120
```

### 使用 markdownlint

```bash
# 安装
npm install -g markdownlint-cli

# 检查文件
markdownlint content/**/*.md

# 自动修复
markdownlint --fix content/**/*.md
```

## 常见错误和修正

### ❌ 错误示例

```markdown
# 文档标题
## 第一章节
没有空行会导致格式混乱

###跳过二级标题直接到三级
没有空格的标题标记

-列表标记后没有空格
```

### ✅ 正确示例

```markdown
# 文档标题

## 第一章节

有适当的空行分隔

### 三级标题

标题标记后有空格

- 列表标记后有空格
```

## 快速检查清单

写完文档后，使用此清单进行自查：

- [ ] 只使用了一个 H1 标题
- [ ] 标题层级连续，没有跳级
- [ ] 标题前后都有空行
- [ ] 列表标记后有空格
- [ ] 代码块指定了语言
- [ ] 中英文之间有空格
- [ ] 使用了正确的标点符号（中文全角，英文半角）
- [ ] 链接和图片有替代文本
- [ ] 段落之间有空行分隔
- [ ] 文件末尾有空行

## 参考资料

- [CommonMark Spec](https://commonmark.org/)
- [GitHub Flavored Markdown Spec](https://github.github.com/gfm/)
- [markdownlint Rules](https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md)
- [中文文案排版指北](https://github.com/sparanoid/chinese-copywriting-guidelines)

---

遵循这些规范，可以让你的 Markdown 文档更加专业、统一和易读。记住：**一致性**和**可读性**是最重要的原则。
