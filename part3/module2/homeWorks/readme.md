# Vue.js 源码剖析-响应式原理、虚拟 DOM、模板编译和组件化
# 一、简答题
# 1、请简述 Vue 首次渲染的过程。

- Vue 初始化，实例成员，静态成员
- new Vue() 构造函数中调用 _init() 方法
- vm.$mount() 方法
  - 完整版入口 src/platforms/web/entry-runtime-with-compiler.js
  - 把模板编译成 render 函数
    - 有自定义render，直接使用
    - 有 template ，则template 作模板； 没有 template 则 el 作模板；
    - 调用 compileToFunctions() 方法，把模板编译成 render 函数
    - render 函数挂到 options 中，options.render=render
    - 调用 mountComponent 方法
- mountComponent 方法 ，入口 src/core/instance/lifecycle.js  
  - 判断是否有 render 选项，如果没有但是传入了模板，并且当前是开发环境的话会发送警告，警告运行时版本不支持编译器。
  - 触发 beforeMount 钩子
  - 定义 updateComponent 方法
    - 调用 _render 创建 vnode
    - 调用 _update 将 vnode 转成真实 dom 挂载到 dom 树
  - new Watcher 实例，把 updateComponent 方法传入
    - Watcher 内部调用 get 方法
    - get 方法中调用 updateComponent 方法
- 触发 mounted 钩子，return vm


# 2、请简述 Vue 响应式原理。
- 2.x 的核心方法是  Object.defindeProperty，3.0 核心是 proxy
- 初始化的时候，为 data 中的每个属性作了响应式的定义，defineReactive 添加 getter/setter 方法，收集依赖
- 读取 data 属性的时候，会触发 get 方法
- 修改 data 属性的时候，会触发 set 方法
- 数据变化触发 dep 的notify 派发更新，通知 watcher
- watcher 调用 update 方法，重新 render 当前组件，生成新的 vnode
- 新旧 vnode 进行对比，更新差异到真实 dom 


# 3、请简述虚拟 DOM 中 Key 的作用和好处。
- key 对标记的节点作标识
- 提高了组件的复用性，提高效率
- diff 过程中减少对 dom 的操作


# 4、请简述 Vue 中模板编译的过程。
1. compileToFunctions
  - 先从缓存中加载编好的 render 方法
  - 若缓存中没有，则调用 compile 方法
2. compile 方法
  - 合并 options
  - 调用 baseCompile 方法
3. baseCompile 方法
  - parse：将 template模板字符串转成 ast 
  - optimize：标记静态节点和静态根节点，优化渲染，patch 跳过静态子树
  - generate：ast 转成 render 函数代码字符串
4. 回到 compileToFunctions 将 render 函数代码字符串转成函数（createFunction）
  - render 和 renderStaticFns 挂载到 Vue 的 options 上













