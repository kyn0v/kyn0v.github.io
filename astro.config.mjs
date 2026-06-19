// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://kyn0v.github.io',
  base: '/',
  trailingSlash: 'ignore',
  markdown: {
    // 关闭内置 Shiki 高亮，改用 style.css 里随日夜主题适配的代码块样式
    syntaxHighlight: false,
  },
});
