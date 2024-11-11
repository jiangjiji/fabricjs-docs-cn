import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "FabricJS Docs CN",
  description: "FabricJS 中文文档",
  base: "/fabricjs-docs-cn/",
  head: [["link", { rel: "icon", href: "/fabricjs-docs-cn/favicon.ico" }]],
  lang: "zh-CN",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/fabricjs-docs-cn/favicon.ico",
    nav: [
      { text: "首页", link: "/" },
      { text: "新版文档", link: "/doc" },
      { text: "旧版文档", link: "/old-doc" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/jiangjiji/fabricjs-docs-cn" }],
    
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Evan You'
    }
  },
});
