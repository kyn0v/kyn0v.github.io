# kyn0v.github.io

[Astro](https://astro.build/) 搭建的个人名片 + 博客 · [kyn0v.github.io](https://kyn0v.github.io)

## 开发

```bash
npm install
npm run dev      # 本地预览
npm run build    # 构建到 dist/
```

推送到 `main` 即自动部署（GitHub Actions）。

## 加内容

**写博客** — 在 `src/content/posts/` 新建 `.md`：

```markdown
---
title: "标题"
date: "2026-06-19"
desc: "时间线卡片上的一句话简介"
pinned: false
---
正文（Markdown）
```

**加作品**（代码 / 视频 / 音乐 / 播客）— 在 `src/data/entries.js` 的 `ENTRIES` 加一项，`type` 可选 `code | video | music | podcast | photo`。

两者都会自动出现在首页时间线，无需改动别处。
