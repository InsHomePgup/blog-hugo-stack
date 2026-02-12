#!/bin/bash

# 博客文章创建脚本
# 使用方法: ./new-post.sh

set -e

echo "=== 创建新博客文章 ==="
echo ""

# 1. 选择内容区域
echo "选择内容区域:"
echo "  1) Post        - 博客文章 (显示在首页)"
echo "  2) Programming - 技术文档 (独立知识库)"
read -p "请选择 (1/2, 默认: 1): " section_choice

case $section_choice in
    2)
        root_section="Programming"
        section_desc="技术文档"
        ;;
    *)
        root_section="Post"
        section_desc="博客文章"
        ;;
esac

echo "✓ 已选择: $section_desc ($root_section)"
echo ""

# 2. 输入文章标题
read -p "文章标题: " title
if [ -z "$title" ]; then
    echo "错误: 标题不能为空"
    exit 1
fi

# 3. 输入分类（目录）
if [ "$root_section" = "Post" ]; then
    read -p "分类 (例如: Life/work, README): " category
    if [ -z "$category" ]; then
        category="README"
    fi
else
    read -p "分类 (例如: Git/Commands, FrontEnd/Vue, OS/Linux): " category
    if [ -z "$category" ]; then
        category="Other"
    fi
fi

# 4. 输入文件名（slug）
read -p "文件名 (留空则使用标题的拼音/英文): " slug
if [ -z "$slug" ]; then
    # 使用标题作为文件名，移除空格
    slug=$(echo "$title" | tr ' ' '-')
fi

# 5. 输入标签（逗号分隔）
read -p "标签 (逗号分隔，例如: 生活,工作): " tags_input
if [ -n "$tags_input" ]; then
    IFS=',' read -ra tags_array <<< "$tags_input"
    tags="["
    for tag in "${tags_array[@]}"; do
        tag=$(echo "$tag" | xargs)  # 去除空格
        tags+="\"$tag\", "
    done
    tags="${tags%, }"  # 移除最后的逗号和空格
    tags+="]"
else
    tags="[]"
fi

# 6. 输入分类标签（逗号分隔）
read -p "分类标签 (逗号分隔，例如: 生活,职场): " categories_input
if [ -n "$categories_input" ]; then
    IFS=',' read -ra categories_array <<< "$categories_input"
    categories="["
    for cat in "${categories_array[@]}"; do
        cat=$(echo "$cat" | xargs)
        categories+="\"$cat\", "
    done
    categories="${categories%, }"
    categories+="]"
else
    categories="[]"
fi

# 7. 是否为草稿
read -p "是否为草稿? (y/n, 默认: y): " is_draft
if [ "$is_draft" = "n" ] || [ "$is_draft" = "N" ]; then
    draft="false"
else
    draft="true"
fi

# 8. 获取当前日期
current_date=$(date +%Y-%m-%d)

# 9. 创建文件路径
file_path="content/${root_section}/${category}/${slug}.md"
file_dir=$(dirname "$file_path")

# 10. 创建目录（如果不存在）
mkdir -p "$file_dir"

# 11. 检查文件是否已存在
if [ -f "$file_path" ]; then
    read -p "文件已存在，是否覆盖? (y/n): " overwrite
    if [ "$overwrite" != "y" ] && [ "$overwrite" != "Y" ]; then
        echo "取消创建"
        exit 0
    fi
fi

# 12. 创建文件内容
cat > "$file_path" << EOF
---
title: $title
date: $current_date
draft: $draft
tags: $tags
categories: $categories
---

<!-- 在这里开始写您的正文 -->

EOF

# 13. 完成提示
echo ""
echo "✓ 文章创建成功！"
echo ""
echo "内容区域: $section_desc ($root_section)"
echo "文件位置: $file_path"
echo "标题: $title"
echo "日期: $current_date"
echo "草稿: $draft"
echo "标签: $tags"
echo "分类: $categories"
echo ""
if [ "$root_section" = "Post" ]; then
    echo "📍 此文章将显示在博客首页"
else
    echo "📚 此文章为技术文档，不会显示在首页"
    echo "   访问路径: /programming/..."
fi
echo ""
echo "下一步:"
echo "  1. 编辑文章: vim $file_path"
echo "  2. 预览文章: hugo server -D"
echo "  3. 发布文章: 将 draft 改为 false"
