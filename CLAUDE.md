# CLAUDE.md


## Git
- **🚫 NEVER EVER auto-commit code**
  - User MUST review code before commit
  - ONLY commit when user explicitly says "提交代码" or "commit"
  - NEVER commit automatically after completing tasks
- No AI traces in commit messages (no emojis, no "Generated with Claude Code", no "Co-Authored-By")
- Simple commit format: `<type>: <brief description>` (single line, no bullet points or detailed explanation)

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hugo static blog site using the Hugo Stack Theme (v3.31.0). The blog is owned by "Abraham" and is currently deployed at https://inshomepgup.github.io/blog-hugo-stack/.

**Key Configuration:**
- Default language: Chinese (zh-cn)
- Hugo version: v0.140.2 extended
- Theme: github.com/CaiJimmy/hugo-theme-stack/v3
- Build configuration allows future-dated posts (`buildFuture = true`)

## Hugo Commands

### Development Server
```bash
hugo server -D
# Starts development server with drafts enabled
# Usually available at http://localhost:1313/blog-hugo-stack/
```

### Building the Site
```bash
hugo
# Builds the static site to ./public directory
```

### Creating New Content
```bash
hugo new content/Post/<category>/<post-name>.md
# Creates a new post using the archetype template
# Archetype includes: title, date, draft status, tags, categories
```

### Environment Info
```bash
hugo env
# Shows Hugo environment and configuration details
```

### Check Version
```bash
hugo version
```

## Architecture

### Directory Structure

**Content Organization:**
- `content/Post/` - Main blog posts directory
  - Posts are organized in subdirectories by category (e.g., Life/work, Life/减肥)
- `content/Page/` - Static pages
- `content/Programming/` - Programming-related content
- `content/draft/` - Draft content (not published)
- `content/about.md` - About page
- `content/archives.md` - Archives listing page

**Configuration:**
- `config/_default/` - All Hugo configuration files
  - `config.toml` - Main site config (baseURL, title, author, buildFuture)
  - `params.toml` - Theme parameters (sidebar, widgets, comments, etc.)
  - `menu.toml` - Navigation and social menu definitions
  - `module.toml` - Hugo module imports (Stack theme)
  - `permalinks.toml` - URL structure for posts and pages
  - `markup.toml` - Markdown rendering configuration
  - `related.toml` - Related content configuration
  - `_languages.toml` - Language-specific settings

**Theme Customization:**
- `layouts/` - Custom layout overrides for the Stack theme
  - `layouts/_default/rss.xml` - Custom RSS feed template
  - `layouts/partials/` - Custom partial templates (article, sidebar, footer, etc.)
- `assets/` - Custom assets (CSS, JS, fonts, images)
  - `assets/scss/` - Custom SCSS styling
  - `assets/js/` - Custom JavaScript
  - `assets/jsconfig.json` - JavaScript configuration

**Static Content:**
- `static/` - Static files served as-is (favicons, fonts)
- `public/` - Generated site output (git-ignored, build artifact)

**Internationalization:**
- `i18n/zh-cn.yaml` - Chinese language translations

**Templates:**
- `archetypes/default.md` - Template for new content with frontmatter structure

### Theme Configuration

The site uses Hugo Stack Theme v3 as a Hugo module. Key theme features configured:

**Sidebar:**
- Avatar: External image from GitHub (https://raw.githubusercontent.com/InsHomePgup/pic_go_img/main/blog/CyberpunkAvatar.jpg)
- Subtitle: "艰苦卓绝 力争上游"

**Homepage Widgets (in order):**
1. Search
2. Archives (limit 5)
3. Categories (limit 10)
4. Tag cloud (limit 10)

**Page Widgets:**
- Table of Contents (TOC)

**Features:**
- Image processing enabled for covers and content
- Color scheme toggle enabled (default: auto)
- Reading time display enabled
- Comments system available but disabled by default
- RSS feed limited to 5 items
- Article license: CC BY-NC-SA 4.0

### Permalink Structure

- Posts: `/p/:slug/`
- Pages: `/:slug/`

### Navigation Menu

Main menu items (in weight order):
1. Home (/)
2. Search (/search/)
3. Archives (/archives/)
4. Links (/links/)
5. About (/about/)

Social links:
- GitHub: https://github.com/InsHomePgup/blog-hugo-stack
- RSS: /index.xml

## Content Creation Workflow

1. Create new post using Hugo archetype: `hugo new content/Post/<category>/<title>.md`
2. Edit frontmatter: set title, date, tags, categories, and draft status
3. Write content in markdown below frontmatter
4. Test locally with `hugo server -D`
5. Set `draft: false` when ready to publish
6. Build with `hugo` command
7. Deploy the `public/` directory to GitHub Pages

## Important Notes

- **Base URL**: Remember to update `baseurl` in `config.toml` before deployment
- **Future Posts**: The site allows publishing posts with future dates (`buildFuture = true`)
- **Theme Updates**: Theme is managed as a Hugo module via `go.mod`, update with `hugo mod get -u`
- **Chinese Language**: Default language is zh-cn, but `hasCJKLanguage` is set to false
- **Deployment Target**: GitHub Pages at /blog-hugo-stack/ subdirectory
