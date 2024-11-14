import { DefaultTheme, defineConfig, UserConfig } from 'vitepress';
import { withI18n } from 'vitepress-i18n';

// https://vitepress.dev/reference/site-config
const vitePressConfig: UserConfig<DefaultTheme.Config> = {
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
      { text: "新版文档", link: "/doc/0_Introduction_to_FabricJS", activeMatch: "/doc/" },
      { text: "旧版文档", link: "/old-doc/2_Fabric.js_Part_1", activeMatch: "/old-doc/" },
    ],

    sidebar: [
      {
        text: "新版文档",
        items: [
          { text: "FabricJS 简介", link: "/doc/0_Introduction_to_FabricJS" },
          { text: "准备开始", link: "/doc/1_Getting_started" },
          { text: "你的第一个app", link: "/doc/2_Your_first_app" },
          { text: "配置默认属性", link: "/doc/3_Configuring_defaults_properties" },
          { text: "配置控制操作", link: "/doc/4_Configuring_controls" },
          { text: "对象和自定义属性", link: "/doc/5_Objects_and_custom_properties" },
          { text: "核心概念", link: "/doc/6_Core_Concepts" },
          { text: "迁移到6.0", link: "/doc/7_Upgrading_to_FabricJS 6.0" },
          {
            text: "理解 FabricJS", items: [
              { text: "理解 FabricJS", link: "/doc/Understanding_FabricJS/0_Understanding_FabricJS" },
              { text: "变形", link: "/doc/Understanding_FabricJS/1_Transformations" },
            ],
            collapsed: true,
          }
        ],
      },
      {
        text: "旧版文档",
        items: [
          { text: "更新记录", link: "/old-doc/1_Changelog" },
          { text: "1. 介绍Fabric.js ", link: "/old-doc/2_Fabric.js_Part_1" },
        ],
        collapsed: true,
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/jiangjiji/fabricjs-docs-cn" }],
    editLink: {
      pattern: "https://github.com/jiangjiji/fabricjs-docs-cn/edit/main/:path",
    },
    search: {
      provider: "local",
    },

    // 文档配置
    lastUpdated: {
      text: "更新时间",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },
  },
};

const vitePressI18nConfig = {
  // VitePress I18n config
  locales: ["zhHans"],
  searchProvider: "local" as const, // enable search with auto translation
};

export default defineConfig(withI18n(vitePressConfig, vitePressI18nConfig));