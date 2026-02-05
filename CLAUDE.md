# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

本文件为 Claude Code 提供在操作此代码仓库时的指导。

## 项目概述

这是一个名为"云雀顺风车"的静态企业官网，是一个顺风车/拼车平台的展示页面。响应式单页网站，使用原生 HTML5、CSS3 和 JavaScript 构建，无构建工具或框架。

## 开发

### 预览

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve .
```

### 文件结构

```
index.html              # 主 HTML 页面
├── css/style.css       # 所有样式（响应式设计）
├── js/main.js          # 交互功能
└── assets/images/      # 静态资源
    ├── logo.png
    ├── title-logo.png  # Hero 区域标题图
    ├── banner.png      # Hero 区域背景手机图
    ├── quotation.png   # 关于我们引号图标
    ├── icon-*.png      # 功能图标（safe/comfort/fee/convenient）
    ├── platform-*.png  # 平台图标（ios/Android/wx）
    └── code.png        # 下载卡片角标
```

## 关键实现细节

### 响应式断点

- 桌面端: > 1024px
- 平板端: 768px - 1024px
- 移动端: < 768px（汉堡菜单）

### CSS 架构

- CSS 变量定义在 `:root`，搜索 `--primary-green`、`--dark-bg` 等
- 媒体查询位于 style.css 底部（移动优先）
- Hero 区域使用图片资源，非 CSS 实现

### JavaScript 功能

- 平滑滚动导航，带当前活动状态高亮
- 移动端汉堡菜单切换
- 功能卡片/下载卡片的 Intersection Observer 滚动动画
- 按钮点击波纹效果
- 图片懒加载（`data-src` 属性）

### 页面区块

1. 导航栏 - 固定定位，滚动时阴影效果
2. Hero 区域 - 白色背景，标题图 + 手机展示图
3. 关于我们 - 引号图标和公司介绍
4. 功能亮点 - 深色背景，4 个功能卡片
5. 客户端下载 - 3 个平台卡片（iOS/Android/微信小程序）
6. 联系我们 - 地址、电话、邮箱、工作时间
7. 页脚 - 链接和二维码占位符

## 注意事项

- Logo 从 `assets/images/logo.png` 加载
- 图标使用 PNG 图片（非 SVG）
- 使用 Google Fonts（preconnect 已配置）
- 下载卡片二维码使用 hover 显示（桌面端）和点击显示（移动端）
