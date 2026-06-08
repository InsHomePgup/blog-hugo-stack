#!/usr/bin/env python3
import os
from datetime import date

BASE = os.path.dirname(os.path.abspath(__file__))

MODULES = [
    ("阅读笔记",   "read"),
    ("价值投资",   "invest"),
    ("随笔",       "post"),
    ("技术笔记",   "tech"),
]

MODULE_CONFIG = {
    "read":   {"dir": "content/reading",    "categories": ["reading"]},
    "invest": {"dir": "content/investing",  "categories": ["investing"]},
    "post":   {"dir": "content/post",       "categories": ["life"]},
    "tech":   {"dir": "content/programming","categories": ["programming"]},
}

def ask(prompt, required=True):
    while True:
        val = input(prompt).strip()
        if val or not required:
            return val
        print("  不能为空，请重新输入")

def make_frontmatter(title, categories, tags=None):
    today = date.today().isoformat()
    lines = ["---", f'title: "{title}"', f"date: {today}"]
    lines += ["categories:"] + [f"  - {c}" for c in categories]
    if tags:
        lines += ["tags:"] + [f"  - {t}" for t in tags]
    lines += ["draft: false", "---", ""]
    return "\n".join(lines)

def create_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    if os.path.exists(path):
        print(f"\n文件已存在: {path}")
        return
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"\n已创建: {path}")

def main():
    print("=== 新建文章 ===\n")

    for i, (label, _) in enumerate(MODULES, 1):
        print(f"  {i}. {label}")

    while True:
        choice = input("\n选择模块 (1-4): ").strip()
        if choice in [str(i) for i in range(1, len(MODULES) + 1)]:
            break
        print("  请输入 1-4 之间的数字")

    _, module = MODULES[int(choice) - 1]
    cfg = MODULE_CONFIG[module]

    if module == "read":
        book = ask("\n书名: ")
        title = ask("章节/标题: ")

        book_dir = os.path.join(BASE, cfg["dir"], book)
        index_path = os.path.join(book_dir, "_index.md")
        if not os.path.exists(index_path):
            create_file(index_path, f'---\ntitle: "{book}"\n---\n')

        filename = title.replace("/", "-").replace(" ", "-") + ".md"
        filepath = os.path.join(book_dir, filename)
        content = make_frontmatter(title, cfg["categories"], tags=[book])
    else:
        title = ask("\n标题: ")
        filename = title.replace("/", "-").replace(" ", "-") + ".md"
        filepath = os.path.join(BASE, cfg["dir"], filename)
        content = make_frontmatter(title, cfg["categories"])

    create_file(filepath, content)

if __name__ == "__main__":
    main()
