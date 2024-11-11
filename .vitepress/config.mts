import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "FabricJS 中文文档",
  description: "FabricJS 中文文档",
  base: "/fabricjs-docs-cn/",
  head: [["link", { rel: "icon", href: "/fabricjs-docs-cn/favicon.ico" }]],
  lang: "zh-CN",
  sitemap: {
    hostname: "https://jiangjiji.github.io/fabricjs-docs-cn/",
  },
  themeConfig: {
    // 首页设置
    logo: "/favicon.ico",
    nav: [
      { text: "首页", link: "/" },
      { text: "新版文档", link: "/doc/1_Getting started", activeMatch: "/doc/" },
      { text: "旧版文档", link: "/old-doc/2_Introduction to Fabric.js Part 1.md", activeMatch: "/old-doc/" },
    ],

    sidebar: [
      {
        text: "新版文档",
        items: [
          { text: "准备开始", link: "/doc/1_Getting started" },
          { text: "你的第一个app", link: "/doc/2_Your first app" },
        ],
      },
      {
        text: "旧版文档",
        items: [
          { text: "更新记录", link: "/old-doc/1_Changelog" },
          { text: "1. 介绍Fabric.js ", link: "/old-doc/2_Introduction to Fabric.js Part 1.md" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/jiangjiji/fabricjs-docs-cn" }],

    // 文档配置
    lastUpdated: {
      text: "更新时间",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },

    // 多语言配置
    darkModeSwitchLabel: "切换主题",
    lightModeSwitchTitle: "亮色主题",
    darkModeSwitchTitle: "暗色主题",
    sidebarMenuLabel: "目录",
    returnToTopLabel: "返回顶部",
    outlineTitle: "页面导航",
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
  },
});
