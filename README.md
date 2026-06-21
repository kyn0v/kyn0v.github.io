# kyn0v.github.io

[Astro](https://astro.build/) 搭建的博客 · [kyn0v.github.io](https://kyn0v.github.io)

Inspired by [cactus](https://github.com/probberechts/hexo-theme-cactus) 与 [flexy](https://github.com/sjaakvandenberg/flexy)。

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

## 评论

文章页评论基于 [Giscus](https://giscus.app/zh-CN)（GitHub Discussions），零后端、零维护，审核用 GitHub 原生功能（隐藏 / 删除 / 锁定）。

**首次启用需一次性操作**（已配置好代码，只差授权）：

1. 访问 <https://github.com/apps/giscus> 点击 **Install**，仅授权 `kyn0v.github.io` 仓库。
2. 完成后，每篇文章底部的评论区即可使用。

> 评论者需用 GitHub 账户登录——这也是最简单可靠的反垃圾手段。
> 评论内容存储在仓库的 Discussions（按页面路径 `pathname` 自动映射），主题跟随站点日夜模式。
