#!/bin/bash

# 博客文章创建脚本
# 使用方法: ./new-post.sh [相对路径]
# 示例: ./new-post.sh content/Post/Life/my-article.md

set -e

echo "=== 创建新博客文章 ==="
echo ""

# 检查是否提供了路径参数
if [ -n "$1" ]; then
    # 快速模式：直接使用提供的路径
    input_path="$1"

    # 移除可能的 content/ 前缀
    input_path="${input_path#content/}"

    # 移除可能的 .md 后缀
    input_path="${input_path%.md}"

    # 解析路径：post/Life/work/my-article 或 programming/Git/Commands/git-rebase
    # 统一转为小写进行匹配
    input_path_lower=$(echo "$input_path" | tr '[:upper:]' '[:lower:]')

    if [[ "$input_path_lower" == post/* ]]; then
        root_section="post"
        section_desc="博客文章"
        # 移除 post/ 前缀（忽略大小写）
        rest="${input_path_lower#post/}"
    elif [[ "$input_path_lower" == programming/* ]]; then
        root_section="programming"
        section_desc="技术文档"
        # 移除 programming/ 前缀（忽略大小写）
        rest="${input_path_lower#programming/}"
    else
        echo "错误: 路径必须以 post/ 或 programming/ 开头"
        echo "示例: ./new-post.sh post/Life/my-article.md"
        echo "     ./new-post.sh content/programming/Git/git-rebase.md"
        exit 1
    fi

    # 提取文件名（最后一部分）
    slug="${rest##*/}"

    # 提取分类（中间部分）
    category="${rest%/*}"
    if [ "$category" = "$slug" ]; then
        # 没有分类，使用默认值
        if [ "$root_section" = "post" ]; then
            category="README"
        else
            category="Other"
        fi
    fi

    echo "✓ 快速模式"
    echo "  区域: $section_desc ($root_section)"
    echo "  分类: $category"
    echo "  文件名: $slug"
    echo ""

else
    # 交互模式
    echo "选择创建模式:"
    echo "  1) 交互模式 - 逐步输入信息"
    echo "  2) 快速模式 - 直接输入完整路径"
    read -p "请选择 (1/2, 默认: 1): " mode_choice
    echo ""

    if [ "$mode_choice" = "2" ]; then
        # 快速模式：输入完整路径
        echo "请输入完整路径（可从 IDE 复制）："
        echo "  示例: post/Life/work/my-article.md"
        echo "       content/programming/Git/Commands/git-rebase.md"
        read -p "路径: " input_path

        if [ -z "$input_path" ]; then
            echo "错误: 路径不能为空"
            exit 1
        fi

        # 递归调用自己，使用快速模式
        exec "$0" "$input_path"
    fi

    # 交互模式：选择内容区域
    echo "选择内容区域:"
    echo "  1) post        - 博客文章 (显示在首页)"
    echo "  2) programming - 技术文档 (独立知识库)"
    read -p "请选择 (1/2, 默认: 1): " section_choice

    case $section_choice in
        2)
            root_section="programming"
            section_desc="技术文档"
            ;;
        *)
            root_section="post"
            section_desc="博客文章"
            ;;
    esac

    echo "✓ 已选择: $section_desc ($root_section)"
    echo ""

    # 输入分类（目录）
    if [ "$root_section" = "post" ]; then
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

    # 输入文件名（slug）
    read -p "文件名 (不含 .md): " slug
    if [ -z "$slug" ]; then
        echo "错误: 文件名不能为空"
        exit 1
    fi
fi

# 输入文章标题
read -p "文章标题: " title
if [ -z "$title" ]; then
    # 使用文件名作为标题
    title="$slug"
fi

# 输入标签（逗号分隔）
read -p "标签 (逗号分隔，例如: 生活,工作，留空跳过): " tags_input
if [ -n "$tags_input" ]; then
    IFS=',' read -ra tags_array <<< "$tags_input"
    tags="tags:\n"
    for tag in "${tags_array[@]}"; do
        tag=$(echo "$tag" | xargs)  # 去除空格
        tags+="  - $tag\n"
    done
else
    tags=""
fi

# 输入分类标签（逗号分隔）
read -p "分类标签 (逗号分隔，例如: 生活,职场，留空跳过): " categories_input
if [ -n "$categories_input" ]; then
    IFS=',' read -ra categories_array <<< "$categories_input"
    categories="categories:\n"
    for cat in "${categories_array[@]}"; do
        cat=$(echo "$cat" | xargs)
        categories+="  - $cat\n"
    done
else
    categories=""
fi

# 是否为草稿
read -p "是否为草稿? (y/n, 默认: y): " is_draft
if [ "$is_draft" = "n" ] || [ "$is_draft" = "N" ]; then
    draft="false"
else
    draft="true"
fi

# 获取当前日期
current_date=$(date +%Y-%m-%d)

# 创建文件路径
file_path="content/${root_section}/${category}/${slug}.md"
file_dir=$(dirname "$file_path")

# 创建目录（如果不存在）
mkdir -p "$file_dir"

# 检查文件是否已存在
if [ -f "$file_path" ]; then
    read -p "文件已存在，是否覆盖? (y/n): " overwrite
    if [ "$overwrite" != "y" ] && [ "$overwrite" != "Y" ]; then
        echo "取消创建"
        exit 0
    fi
fi

# 创建文件内容
{
    echo "---"
    echo "title: $title"
    echo "date: $current_date"
    echo "draft: $draft"
    if [ -n "$tags" ]; then
        echo -e "$tags" | sed '/^$/d'
    fi
    if [ -n "$categories" ]; then
        echo -e "$categories" | sed '/^$/d'
    fi
    echo "---"
    echo ""
    echo "<!-- 在这里开始写您的正文 -->"
    echo ""
} > "$file_path"

# 完成提示
echo ""
echo "✓ 文章创建成功！"
echo ""
echo "内容区域: $section_desc ($root_section)"
echo "文件位置: $file_path"
echo "标题: $title"
echo "日期: $current_date"
echo "草稿: $draft"
if [ -n "$tags" ]; then
    echo -e "标签:\n$tags" | grep "  -"
fi
if [ -n "$categories" ]; then
    echo -e "分类:\n$categories" | grep "  -"
fi
echo ""
if [ "$root_section" = "post" ]; then
    echo "此文章将显示在博客首页"
else
    echo "此文章为技术文档，不会显示在首页"
    echo "   访问路径: /programming/..."
fi
echo ""
echo "下一步:"
echo "  1. 编辑文章: vim $file_path"
echo "  2. 预览文章: hugo server -D"
echo "  3. 发布文章: 将 draft 改为 false"
