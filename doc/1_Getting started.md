---
layout: doc
---

# 准备开始

## 如何安装

FabricJS 可以通过如下方式安装到你的工程中

## 通过脚本标签从 CDN 加载

在 HTML 页面中包含来自提供此服务的任何 CDN 的脚本标记，例如[cdnjs](https://cdnjs.com/libraries/fabric.js) 、 [jsdelivr](https://www.jsdelivr.com/package/npm/fabric.js) 、 [unpkg](https://unpkg.com/fabric@latest/dist/fabric.js)

```html
<script src="https://cdn.jsdelivr.net/npm/fabric@latest/dist/fabric.js"></script>
```

## 通过 npm 安装

```shell
npm install fabric --save
```

## 浏览器支持情况

列表中列出了浏览器的支持情况。通常你可以使用转义代码来支持较低的浏览器版本，这样的话一些画布功能可能无法转义或者模拟。

| 浏览器            | 支持版本 | 备注          |
| ----------------- | -------- | ------------- |
| Firefox           | ✔️       | >= 58         |
| Safari            | ✔️       | >= 11         |
| Opera             | ✔️       | chromium 内核 |
| Chrome            | ✔️       | >= 64         |
| Edge              | ✔️       | chromium 内核 |
| Edge（旧版）      | ❌       |               |
| Internet Explorer | ❌       |               |
| Node              | ✔️       | >= 18         |
