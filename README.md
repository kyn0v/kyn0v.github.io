# Jian Yang · 个人名片

一个零依赖的单文件个人名片 / 作品集网站。配色致敬 [cactus](https://github.com/probberechts/hexo-theme-cactus)，背景流星效果复刻自旧站 kyn0v.github.io。

```
.
├── index.html          # 整个网站（HTML + CSS + JS 全部内嵌）
└── assets/
    ├── avatar.jpg      # 头像
    └── xiaoyuzhou.png  # 小宇宙 logo
```

## 它能不能托管在 GitHub Pages？

**能，而且比原来的 Markdown 博客更简单。**

- 原来的博客是 Hexo/Jekyll：写 `.md` → 工具构建成 HTML → 部署，需要 node_modules、主题、构建步骤。
- 这个站是纯静态 `index.html`：**没有构建步骤**，GitHub Pages 直接把它当首页返回。

## 部署

### 方案 A：作为 `kyn0v.github.io` 首页（推荐，最简单）

> ⚠️ 这会**覆盖**旧博客首页。旧文章链接（如 `/2022/01/02/...`）若仍想保留，请用方案 B。

```bash
git remote add origin git@github.com:kyn0v/kyn0v.github.io.git
git push -u origin main          # 若远端已有内容，先 git pull --rebase 或 --force
```

GitHub 仓库 → Settings → Pages → Source 选 `main` 分支 / 根目录。
几分钟后访问 https://kyn0v.github.io 。

### 方案 B：放子路径，保留旧博客

把文件放进旧仓库的子目录（如 `card/`），访问 `https://kyn0v.github.io/card/`。
因为资源用的是相对路径（`assets/...`），子路径下也能正常运行。

## 维护：怎么加一条作品？

打开 `index.html`，找到 `const ENTRIES = [` 数组，按格式加一行：

```js
{
  date: "2026-06-19",          // 日期，决定时间线排序
  type: "code",                // code | blog | video | music | podcast | photo
  pinned: true,                // 可选：true 则同时显示在主页精选
  title: "作品标题",
  desc: "一句话描述。",
  link: "https://..."          // 点击跳转
},
```

分类对应的 emoji 在上方 `TYPE_META` 里定义，可自行调整。

保存后刷新即可，无需任何构建或安装。

## 本地预览

```bash
python3 -m http.server 8123
# 打开 http://localhost:8123/
```

## 说明

- 中文正文用思源黑体（Noto Sans SC，Google Fonts CDN）；英文/代码/日期保留 Menlo 等宽。
- 唯一的外部依赖是 Google Fonts，断网时会优雅回退到系统字体。
- 邮箱用 JS 运行时拼接，源码里没有明文，防爬虫。
