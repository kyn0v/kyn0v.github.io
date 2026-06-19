# Jian Yang · 个人名片 & 博客

基于 [Astro](https://astro.build/) 的个人名片 / 作品集 + 博客站点。配色致敬 [cactus](https://github.com/probberechts/hexo-theme-cactus) 与 [flexy](https://github.com/sjaakvandenberg/flexy)，背景流星效果复刻自旧站 kyn0v.github.io。

## 结构

```
├── astro.config.mjs            # Astro 配置
├── public/assets/              # 静态资源（原样输出，不经构建）
│   ├── style.css               # 全站共享样式（配色 / 字体 / 流星 / 文章排版）
│   ├── site.js                 # 全站共享脚本（日夜切换 / 流星 / 防爬邮箱）
│   ├── avatar.jpg              # 头像
│   └── xiaoyuzhou.png          # 小宇宙 logo
└── src/
    ├── data/entries.js         # 非博客条目（代码 / 视频 / 音乐 / 播客外链）+ 分类元数据
    ├── content/
    │   ├── config.ts           # 博客内容集合 schema
    │   └── posts/*.md          # 博客文章（Markdown）
    ├── layouts/
    │   ├── Base.astro          # 公共骨架（head + 流星背景 + 主题切换 + footer）
    │   └── Post.astro          # 文章页布局
    └── pages/
        ├── index.astro         # 名片（主页 Pin + 时间线）
        └── posts/[...slug].astro  # 文章页路由
```

名片首页与所有文章页共用 `public/assets/style.css` 与 `site.js`，**风格完全统一**，日夜主题、流星背景在文章页同样生效。

## 本地开发

```bash
npm install        # 首次安装依赖
npm run dev        # 本地开发服务器（带热更新）
npm run build      # 构建到 dist/
npm run preview    # 预览构建产物
```

## 维护

### 写一篇新博客（只需 Markdown）

在 `src/content/posts/` 新建 `my-post.md`：

```markdown
---
title: "文章标题"
date: "2026-06-19"
desc: "一句话简介，会显示在时间线卡片上。"
pinned: false
---

正文用普通 Markdown 写即可，## 标题、代码块、列表、表格都已统一样式。
```

保存后，文章会**自动**生成独立页面，并按日期出现在名片的「时间线 / 📖 文字」分类里 —— 无需改动其他文件。

### 加一条作品（代码 / 视频 / 音乐 / 播客）

编辑 `src/data/entries.js`，在 `ENTRIES` 数组加一行：

```js
{
  date: "2026-06-19",          // 决定时间线排序
  type: "code",                // code | video | music | podcast | photo
  pinned: true,                // 可选：主页精选
  title: "作品标题",
  desc: "一句话描述。",
  link: "https://..."          // 外部链接
},
```

分类对应的 emoji / 颜色在同文件的 `TYPE_META` 里定义。

## 部署（GitHub Pages）

仓库已配置 `.github/workflows/deploy.yml`：**推送到 `main` 分支即自动构建并发布**。

首次启用：仓库 → Settings → Pages → Source 选 **GitHub Actions** 即可。
之后访问 https://kyn0v.github.io 。

## 说明

- 中文正文用思源黑体（Noto Sans SC，Google Fonts）；英文 / 代码 / 日期保留 Menlo 等宽。
- 邮箱用 JS 运行时拼接，源码中无明文，防爬虫。
- 代码块关闭了内置 Shiki 高亮，改用随日夜主题适配的样式。
