import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "FabricJS 中文文档",
  description: "FabricJS 中文文档",
  base: "/fabricjs-docs-cn/",
  head: [["link", { rel: "icon", href: "/fabricjs-docs-cn/favicon.ico" }]],
  lang: "zh-CN",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/favicon.ico",
    nav: [
      { text: "首页", link: "/" },
      { text: "新版文档", link: "/doc/Getting started", activeMatch: "/doc/" },
      { text: "旧版文档", link: "/old-doc/Changelog", activeMatch: "/old-doc/" },
    ],

    sidebar: [
      {
        text: "新版文档",
        items: [
          { text: "准备开始", link: "/doc/1. Getting started" },
          { text: "你的第一个app", link: "/doc/2. Your first app" },
        ],
      },
      {
        text: "旧版文档",
        items: [
          { text: "更新记录", link: "/old-doc/1. Changelog" },
          { text: "1. 介绍Fabric.js ", link: "/old-doc/2. Introduction to Fabric.js Part 1.md" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/jiangjiji/fabricjs-docs-cn" }],

    // 多语言配置
    darkModeSwitchLabel: "切换主题",
    lightModeSwitchTitle: "亮色主题",
    darkModeSwitchTitle: "暗色主题",
    sidebarMenuLabel: "目录",
    returnToTopLabel: "返回顶部",
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
  },
});
