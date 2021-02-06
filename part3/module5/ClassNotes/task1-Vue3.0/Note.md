# Vue.js 3.0 源码组织方式
- 源码采用 TypeScript 重写
- 使用 Monorepo 管理项目结构

# 构建版本
-package/vue
- cjs
 - vue.cjs.js
 - vue.cjs.prod.js

- global
 - vue.global.js
 - vue.global.prod.js
 - vue.runtime.global.js
 - vue.runtime.global.prod.js

- browser
 - vue.esm-browser.js
 - vue.esm-browser.prod.js
 - vue.runtime.esm-browser.js
 - vue.runtime.esm-browser.prod.js

- bundler
 - vue.esm-bundler.js
 - vue.runtime.esm-bundler.js

#  Composition API 设计动机
- RFC(Request For Comments)
 - https://github.com/vuejs/rfcs
- Composition API RFC
 - https://composition-api.vuejs.org

## 设计动机
- Options API
 - 包含一个描述组件选项（data，methods，props等）的对象
 - Options API 开发复杂组件，同一个功能逻辑的代码被拆分到不同的选项

Options API 导致描述同一部分的功能代码可能在当前文件的不同位置，比较分散，所以查看源码的时候，需要拖动滚动条

- Composition API 
 - Vue.js 3.0 新增的一组 API
 - 一组基于函数的 API
 - 可以更灵活的组织组件的逻辑

Composition API 会将同一功能的代码实现在一个函数里，用的时候调用即可，同一个功能的代码不会被分散到各处，比较集中，有利于对代码的提取和重用

# 性能提升
- 响应式系统升级
- 编译优化
- 源码体积优化

## 响应式系统升级
- Vue 2.x中响应式系统的核心 defineProperty
- Vue 3.0 中使用 Proxy 对象重写响应式系统
  - 可以监听动态新增的属性
  - 可以监听删除的属性
  - 可以监听数组的索引和length属性

## 编译优化
- Vue 2.x 中通过标记静态根节点，优化diff的过程
- Vue 3.0 中标记和提升所有的静态根节点，diff 的时候只需要对比动态节点内容
 - Fragments （升级vetur插件）
 - 静态提升
 - Patch flag
 - 缓存事件处理函数

其实就是静态节点被放在了 render 函数的外部，使这些静态节点在从头到尾只是创建一次，render 不需要再创建一遍这些静态节点

## 优化打包体积
- Vue 3.0 中移除了一些不常用的API
 - 例如：inline-template，filter 等
- Tree-shaking

# Vite
ES Module
- 现代浏览器都支持 ES Module（IE不支持）
- 通过下面的方式加载模块
 - <script type="module" src="..."></script>
- 支持模块的 script 默认延迟加载
 - 类似于script标签设置defer
 - 在文档解析完成后，触发 DOMContentLoaded 事件前执行

Vite as Vue-CLI
- Vite 在开发模式下不需要打包可以直接运行
- Vue-CLI 开发模式下必须对项目打包才可以运行

Vite 特点
- 快速冷启动
- 按需编译
- 模块热更新

- Vite 在生产环境下使用 Rollup 打包
 - 基于 ES Module 的方式打包
- Vue-CLI 使用 Webpack 打包

## Vite 创建项目
- 直接创建
```bash
npm init vite-app <project-name>
cd <project-name>
npm install
npm run dev
```
- 基于模板创建项目
```bash
npm init vite-app --template react
npm init vite-app --template preact
```
