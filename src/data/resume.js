// 简历数据（单一数据源，中英双语）。
// 隐私原则：公网只放精简安全版；署名用英文名，不放中文全名 / 电话 / 住址 / 生日 / 内部指标。
// 量化数据只引用官方已公开口径（财报 / 公告），不写自己功能的内部指标（NDA / compliance）。
// TODO 标记的字段等用户补充后替换。

export const RESUME = {
  // 工作经验起始（YYYY-MM）；页面按当前日期动态计算年限
  experienceStart: '2021-05',

  // —— 抬头 / 基本信息 ——
  header: {
    name: 'Jian Yang',
    title: { zh: '后端软件开发工程师', en: 'Backend Software Development Engineer' },
    // 只到城市级；隐私考虑，按需填写（可留空则不显示）
    location: { zh: '', en: '' },
    // 邮箱在页面里做防爬混淆，此处仅供参考
    email: { user: 'kynov', domain: 'outlook.com' },
    github: 'https://github.com/kyn0v',
  },

  // —— 一句话概述 ——
  summary: {
    zh: '后端软件开发工程师，{{years}} 年工作经验，作为核心成员参与企业级搜索等平台级功能的研发，服务于 Outlook、Teams、Copilot 等覆盖数亿量级用户的 Microsoft 365 产品生态。能独立解决全栈问题（含 iOS / 前端探索），当前从事 Voice & Vision 服务研发。对 Agent Harness / AI 基础设施方向抱有浓厚兴趣并持续实践。',
    en: 'Backend software development engineer with {{years}} years of professional experience, a core contributor to platform-level capabilities such as enterprise search that power the Microsoft 365 ecosystem (Outlook, Teams, Copilot) reaching hundreds of millions of users. Comfortable solving full-stack problems (including iOS / front-end exploration); currently working on Voice & Vision services. Deeply interested in — and actively exploring — Agent Harness / AI infrastructure.',
  },

  // —— 技能 ——
  skills: [
    { label: { zh: '编程语言', en: 'Languages' }, items: ['C# (primary)', 'Python', 'Rust'] },
    { label: { zh: '框架', en: 'Frameworks' }, items: ['ASP.NET Core / .NET'] },
    { label: { zh: '数据库', en: 'Databases' }, items: ['SQL Server / Azure SQL', 'Azure Cosmos DB'] },
    { label: { zh: '云与 CI/CD', en: 'Cloud & CI/CD' }, items: ['Azure', 'Azure DevOps'] },
    { label: { zh: '客户端', en: 'Client' }, items: ['iOS (Office Mobile SDK)'] },
  ],

  // —— 工作经历（最近在前）——
  experience: [
    {
      org: 'Microsoft',
      role: { zh: 'Voice & Vision · 平台功能研发', en: 'Voice & Vision · Platform Engineering' },
      period: { zh: '2026.07 – 至今', en: '2026.07 – Present' },
      bullets: [
        {
          zh: '参与 Voice & Vision 平台级功能研发，为多个 Microsoft 365 产品提供语音与视觉能力。',
          en: 'Building Voice & Vision platform capabilities that serve multiple Microsoft 365 products.',
        },
      ],
    },
    {
      org: 'Microsoft',
      role: { zh: 'Office Mobile SDK · 前端 / 客户端探索', en: 'Office Mobile SDK · Front-end / Client' },
      period: '2026.04 – 2026.07',
      bullets: [
        {
          zh: '转入前端 / 客户端领域探索，参与 Office Mobile SDK（含 iOS）相关研发。',
          en: 'Explored front-end / client development on the Office Mobile SDK (including iOS).',
        },
      ],
    },
    {
      org: 'Microsoft',
      role: { zh: 'Search · 企业级搜索平台功能', en: 'Search · Enterprise Search Platform' },
      period: '2021 – 2026.04',
      bullets: [
        {
          zh: '负责邮件 / 文件等场景的用户文件搜索服务，作为平台级横向能力，服务于 Outlook、Teams、Copilot 等覆盖数亿量级用户的 Microsoft 365 产品生态。',
          en: 'Owned user file search across scenarios such as email and files — a horizontal platform capability serving the Microsoft 365 ecosystem (Outlook, Teams, Copilot) reaching hundreds of millions of users.',
        },
        {
          zh: '构建并维护支持多种内容类型（邮件 / 文件等）的搜索服务，被多个产品复用。',
          en: 'Built and maintained a search service spanning multiple content types (email, files, …), reused across multiple products.',
        },
        // TODO: 待补充经官方公开的量化成果（规模 / 性能 / 影响面）。
      ],
    },
    {
      org: 'Microsoft',
      role: { zh: '软件工程实习生', en: 'Software Engineering Intern' },
      period: { zh: '2019 冬', en: 'Winter 2019' },
      bullets: [
        {
          zh: '完成 Teams 对话输入框滑词补全（type-ahead / 自动补全）的 POC。',
          en: 'Delivered a proof-of-concept for type-ahead / word completion in the Teams chat input box.',
        },
      ],
    },
  ],

  // —— 教育背景 ——
  education: [
    {
      school: { zh: '南京航空航天大学', en: 'Nanjing University of Aeronautics and Astronautics' },
      degree: { zh: '硕士', en: 'M.Sc.' },
      period: '2018',
      note: {
        zh: '方向：小目标检测 / 计算机视觉；发表论文，配套项目 TIB-Net。',
        en: 'Focus: small-object detection / computer vision; published paper with companion project TIB-Net.',
      },
      links: [{ term: 'TIB-Net', url: 'https://github.com/kyn0v/TIB-Net' }],
    },
    {
      school: { zh: '武汉理工大学', en: 'Wuhan University of Technology' },
      degree: { zh: '本科', en: 'B.Eng.' },
      period: '2014',
      note: { zh: '', en: '' },
    },
  ],

  // —— 精选项目 ——
  projects: [
    {
      name: 'Binwak',
      tag: { zh: '城市漫步 Bingo 小程序', en: 'CityWalk Bingo mini-program' },
      desc: {
        zh: 'vibecoding 实践的 CityWalk Bingo 小程序',
        en: 'A vibecoding CityWalk Bingo mini-program',
      },
      link: 'https://github.com/kyn0v/Binwak',
    },
    {
      name: { zh: 'Harness Plugin（进行中）', en: 'Harness Plugin (WIP)' },
      tag: { zh: '面向长程任务的 Harness 插件', en: 'Harness plugin for long-horizon tasks' },
      desc: {
        zh: '正在开发的 Harness 插件，探索 long-horizon task（长程任务）场景。',
        en: 'An in-progress Harness plugin exploring long-horizon task scenarios.',
      },
      link: '',
    },
    {
      name: 'TIB-Net',
      tag: { zh: '微型无人机检测网络', en: 'Tiny-drone detection network' },
      desc: {
        zh: '硕士期间论文配套代码，迭代式骨干网络用于微型无人机检测。',
        en: 'Companion code for an M.Sc. paper — an iterative backbone for tiny-drone detection.',
      },
      link: 'https://github.com/kyn0v/TIB-Net',
    },
  ],

  // —— 写作 / 开源 ——
  writing: [
    {
      name: { zh: '知乎专栏《Harness Exploration》', en: 'Zhihu column: Harness Exploration' },
      desc: { zh: '记录 Agent Harness 的学习与思考。', en: 'Notes on learning and exploring Agent Harness.' },
      link: 'https://www.zhihu.com/column/c_2054657432937402668',
    },
    {
      name: { zh: 'GitHub · kyn0v', en: 'GitHub · kyn0v' },
      desc: { zh: '代码、深度学习、自制 OS 等开源实践。', en: 'Open-source code, deep learning, hobby OS, and more.' },
      link: 'https://github.com/kyn0v',
    },
  ],
};

// 便捷取值：根据当前语言返回字符串（字段可能是字符串或 {zh,en}）
export function pick(field, lang) {
  if (field == null) return '';
  if (typeof field === 'string') return field;
  return field[lang] ?? field.zh ?? field.en ?? '';
}
