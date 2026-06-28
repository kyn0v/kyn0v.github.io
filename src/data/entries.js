// 非博客条目（代码 / 视频 / 音乐 / 播客的外部链接）
// 博客（type: "blog"）由 src/content/posts/*.md 自动加入时间线，不在此列。
export const ENTRIES = [
  // —— 代码项目（来自 github.com/kyn0v 真实仓库，日期为仓库创建时间）——
  { date: "2026-06-19", type: "code", title: "ghost-among-us · 跨端多人游戏", desc: "基于 uni-app 的跨端多人游戏，client / server 全栈 TypeScript 实现。", link: "https://github.com/kyn0v/ghost-among-us" },
  { date: "2026-05-31", type: "code", pinned: true, title: "Binwak · 城市漫步 Bingo 打卡", desc: "CityWalk Bingo！", link: "https://github.com/kyn0v/Binwak" },
  { date: "2020-08-18", type: "code", pinned: true, title: "TIB-Net · 微型无人机检测网络", desc: "论文配套代码，迭代式骨干网络。", link: "https://github.com/kyn0v/TIB-Net" },
  { date: "2020-10-03", type: "code", title: "json-parser · 手写 JSON 解析器", desc: "参照 miloyip 的教程，用 C++ 从零实现一个 JSON 解析器，理解递归下降。", link: "https://github.com/kyn0v/json-parser" },
  { date: "2019-01-20", type: "code", title: "HandsOnDeepLearning · 动手学深度学习", desc: "跟着《动手学深度学习》做的 Jupyter Notebook 实践笔记。", link: "https://github.com/kyn0v/HandsOnDeepLearning" },
  { date: "2017-06-28", type: "code", title: "OSDIY · 自制操作系统", desc: "读《30 天自制操作系统》，用 C 一步步实现一个简单 OS。", link: "https://github.com/kyn0v/OSDIY" },
  { date: "2017-01-12", type: "code", title: "course_experiments · 课程实验", desc: "本科期间一些课程的 C++ 实验代码合集。", link: "https://github.com/kyn0v/course_experiments" },

  // —— 视频：B 站投稿（space.bilibili.com/12334638，多为吉他/音乐 cover）——
  { date: "2026-01-07", type: "video", title: "《Sins Of The Father》尾奏cover", desc: "B 站投稿 · 时长 02:10 · 155 次播放。", link: "https://www.bilibili.com/video/BV1pvimBhEbH" },
  { date: "2025-04-20", type: "video", title: "《好不容易》-cover", desc: "B 站投稿 · 时长 01:35 · 54 次播放。", link: "https://www.bilibili.com/video/BV1jP58zAE3w" },
  { date: "2024-07-29", type: "video", pinned: true, title: "快乐の夏天", desc: "石台夏日", link: "https://www.bilibili.com/video/BV1HYvPe8EjD" },
  { date: "2024-07-07", type: "video", title: "《搬家》cover-补票", desc: "B 站投稿 · 时长 04:31 · 118 次播放。", link: "https://www.bilibili.com/video/BV1AFhQe9EDN" },
  { date: "2024-02-10", type: "video", pinned: true, title: "我们的冷耍黄金转场", desc: "酷玩曼谷演出", link: "https://www.bilibili.com/video/BV1hB421z72Z" },
  { date: "2022-12-24", type: "video", title: "Bubble Gum (Cover)", desc: "B 站投稿 · 时长 01:30 · 34 次播放。", link: "https://www.bilibili.com/video/BV14M41117Cd" },
  { date: "2022-10-16", type: "video", title: "采石-万青 (Cover)", desc: "B 站投稿 · 时长 03:18 · 39 次播放。", link: "https://www.bilibili.com/video/BV1Ht4y1F7mJ" },
  { date: "2022-10-07", type: "video", title: "Autumn Leaves - Eric Clapton (尾奏Cover)", desc: "B 站投稿 · 时长 02:03 · 33 次播放。", link: "https://www.bilibili.com/video/BV1z8411x7DG" },
  { date: "2022-09-18", type: "video", title: "狂人皮埃罗插曲 (Cover)", desc: "B 站投稿 · 时长 03:53 · 156 次播放。", link: "https://www.bilibili.com/video/BV1Sd4y1u75r" },
  { date: "2022-08-27", type: "video", title: "No Surprises - Radiohead（Cover/On-Call Song）", desc: "B 站投稿 · 时长 03:43 · 49 次播放。", link: "https://www.bilibili.com/video/BV1aT411F7ji" },

  // —— 播客：小宇宙《家庭自制》——
  { date: "2025-11-24", type: "podcast", pinned: true, title: "播客《家庭自制》", desc: "感受绝对真实，欢迎来到家庭自制", link: "https://www.xiaoyuzhoufm.com/podcast/67dff6130ff066afdbb00285" },

  // —— 音乐：网易云 youngjjj 自建歌单（简介取自歌单本身）——
  { date: "2025-05-05", type: "music", title: "快乐小分队 — 未知欢愉", desc: "Joy Division Unknown Pleasures · 一份阅读札记", link: "https://music.163.com/playlist?id=13671191614" },
  { date: "2025-03-02", type: "music", title: "Philosophy of Aging", desc: "时间的魔法", link: "https://music.163.com/playlist?id=13389930275" },
  { date: "2024-08-02", type: "music", title: "老歌新唱", desc: "", link: "https://music.163.com/playlist?id=12390506204" },
  { date: "2024-07-13", type: "music", title: "陆上行舟 — 赫尔佐格谈音乐", desc: "", link: "https://music.163.com/playlist?id=12301684051" },
  { date: "2023-10-09", type: "music", title: "中文嘿怕", desc: "", link: "https://music.163.com/playlist?id=8791173824" },
  { date: "2023-09-17", type: "music", title: "然而，很美 (But Beautiful)", desc: "「莱斯特的音乐柔软而慵懒，但其中总隐含着某种尖锐……」", link: "https://music.163.com/playlist?id=8737611645" },
  { date: "2023-01-15", type: "music", title: "那些夏天", desc: "乐夏记忆点", link: "https://music.163.com/playlist?id=8060476453" },
  { date: "2022-12-29", type: "music", title: "时代的噪音 (The Sound of Resistance)", desc: "从迪伦到 U2 的抵抗之声", link: "https://music.163.com/playlist?id=7998818478" },
  { date: "2022-11-17", type: "music", title: "爱的一种", desc: "", link: "https://music.163.com/playlist?id=7752222463" },
  { date: "2022-01-04", type: "music", title: "Real.Guitar", desc: "", link: "https://music.163.com/playlist?id=7221856852" },
  { date: "2021-04-08", type: "music", title: "毕业时", desc: "小小少年，又毕业了。", link: "https://music.163.com/playlist?id=6701421943" },
  { date: "2016-01-17", type: "music", title: "电影配乐", desc: "配乐承载着电影的气息", link: "https://music.163.com/playlist?id=155449195" },
  { date: "2015-03-09", type: "music", title: "youngjjj 喜欢的音乐", desc: "", link: "https://music.163.com/playlist?id=57196439" },
  // —— 知乎专栏（zhihu.com/people/youngjjj/columns，日期为专栏创建时间）——
  { date: "2026-06-28", type: "column", title: "知乎专栏《Harness Exploration》", desc: "记录 Harness 的学习与思考。", link: "https://www.zhihu.com/column/c_2054657432937402668" },
  { date: "2020-08-12", type: "column", title: "知乎专栏《乐理入门》", desc: "从音程开始，记录乐理学习。", link: "https://www.zhihu.com/column/c_1293685947536637952" },
  { date: "2018-07-26", type: "column", title: "知乎专栏《CV学习之目标检测》", desc: "目标检测方向的论文阅读笔记。", link: "https://www.zhihu.com/column/c_1022508397446475776" },
];

export const TYPE_META = {
  code:    { emoji: "⌨️", label: "代码", color: "var(--c-code)" },
  video:   { emoji: "🎬", label: "视频", color: "var(--c-video)" },
  blog:    { emoji: "📖", label: "文字", color: "var(--c-blog)" },
  photo:   { emoji: "📷", label: "摄影", color: "var(--c-photo)" },
  music:   { emoji: "🎵", label: "音乐", color: "var(--c-music)" },
  podcast: { emoji: "🎙️", label: "播客", color: "var(--c-podcast)" },
  column:  { emoji: "📰", label: "专栏", color: "var(--c-column)" },
};
