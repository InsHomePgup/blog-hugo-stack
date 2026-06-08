#!/usr/bin/env python3
import os
from datetime import date
from prompt_toolkit import prompt
from prompt_toolkit.shortcuts import radiolist_dialog

BASE = os.path.dirname(os.path.abspath(__file__))

MODULES = [
    ("read",   "阅读笔记"),
    ("invest", "价值投资"),
    ("post",   "随笔"),
    ("tech",   "技术笔记"),
]

MODULE_CONFIG = {
    "read":   {"dir": "content/reading",     "categories": ["reading"]},
    "invest": {"dir": "content/investing",   "categories": ["investing"]},
    "post":   {"dir": "content/post",        "categories": ["life"]},
    "tech":   {"dir": "content/programming", "categories": ["programming"]},
}

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
        print(f"文件已存在: {path}")
        return
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"已创建: {path}")

def ask(label):
    val = prompt(f"{label}: ").strip()
    while not val:
        print("不能为空")
        val = prompt(f"{label}: ").strip()
    return val

def main():
    module = radiolist_dialog(
        title="新建文章",
        text="选择模块：",
        values=MODULES,
    ).run()

    if module is None:
        return

    cfg = MODULE_CONFIG[module]

    if module == "read":
        book  = ask("书名")
        title = ask("章节/标题")

        book_dir   = os.path.join(BASE, cfg["dir"], book)
        index_path = os.path.join(book_dir, "_index.md")
        if not os.path.exists(index_path):
            create_file(index_path, f'---\ntitle: "{book}"\n---\n')

        filename = title.replace("/", "-").replace(" ", "-") + ".md"
        filepath = os.path.join(book_dir, filename)
        content  = make_frontmatter(title, cfg["categories"], tags=[book])
    else:
        title    = ask("标题")
        filename = title.replace("/", "-").replace(" ", "-") + ".md"
        filepath = os.path.join(BASE, cfg["dir"], filename)
        content  = make_frontmatter(title, cfg["categories"])

    create_file(filepath, content)

if __name__ == "__main__":
    main()
