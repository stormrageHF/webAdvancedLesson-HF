# 模板编译的作用

- Vue 2.x 使用 VNode 描述视图以及各种交互，用户自己编写 vnode 比较复杂
- 用户只需要编写类似于 html 的代码 vuejs 模板，通过编译器将模板转化为返回vnode 的render 函数
- .vue 文件会被 webpack 在构建的过程中转换成 render 函数


# 体验模板编译
项目 12-compile

编译生成的函数位置
_c src/core/instance/render.js

_m/_v/_s  src/core/instance/render-helpers/index.js

编译后的render函数：
ƒ anonymous(
) {
  with (this) { 
    return _c(
      'div', 
    {
      attrs: { "id": "app" } 
    }, 
      [
        _m(0), 
        _v(" "), // 创建空白的文本节点，比如换行的时候
        _c('p', 
        [_v(_s(msg))]), 
        _v(" "), 
        _c('comp', { on: { "myclick": handler } })
      ], 
      1) 
  }
}

_m -- renderStatic 处理静态内容，比如 <h1>vue<span>模板编译过程</span></h1>
_c -- h 函数



# Vue Template Explorer
vue2
https://template-explorer.vuejs.org
 
vue3
https://vue-next-template-explorer.netlify.app



# 编译入口函数


- compileToFunctions(template,{},this)   return {render,staticRenderFns}
- createCompiler(baseOptions)  
  - 定义 compile(template,options)函数
  - 生成 compileToFunctions 
  - 返回 {compile,compileToFunctions}
  - compileToFunctions 函数是模板编译的入口
- createCompilerCreator(function baseCompile(){})
  - 传入 baseCompile(template,finalOptions) 函数
  - baseCompile
    - 解析 parse  ast
    - 优化 optimize   ast
    - 生成 generate   ast
  - 返回 createCompiler 函数


# 模板编译的过程- compileToFunction

src/compiler/create-compiler.js
createCompilerCreator 方法

src/compiler/to-function.js
createCompileToFunctionFn 方法


# 模板编译的过程- compile

src/compiler/create-compiler.js



# 模板编译的过程- baseCompile -- AST

src/compiler/index.js 
createCompiler(baseCompile)


什么是抽象语法树？
- 抽象语法树简称 AST （Abstract Syntax Tree）
- 使用对象的形式描述树形的代码结构
- 此处的抽象语法树是用来描述属性结构的 html 字符串

为什么要使用抽象语法树？
- 模板字符串转化成 ast后，可以通过 ast 对模板进行优化处理
- 标记模板中的静态内容，在 patch 的时候直接跳过静态内容
- 在 patch 的过程中静态内容不需要对比和渲染

工具网站查看 ast
https://astexplorer.net

render 函数就是通过 ast 生成的


# 模板编译过程-baseCompile-parse
生成 ast 的过程
将模板字符串转化一个 ast 对象，属性指令都会记录到对应的 ast 属性上


# 模板编译过程-baseCompile-optimize
标记静态节点，在 patching process 中可以直接跳过静态节点


# 模板编译过程-generate
字符串函数生成函数

# 模板编译过程-调试
项目 13-ast

# 模板编译过程-总结
1. compileToFunctions(template)
  - 先从缓存中加载编译好的render函数
  - 若缓存中没有，则调用 compile 方法
2. compile(template,options)
  - 合并 options
  - 调用 baseCompile
3. baseCompile(template.trim(),finalOptions)
  - parse 
    - tempalte 转化成 ast 语法树
  - optimize
    - 标记 ast 中的静态 sub trees
    - 检测到静态子树设置为静态，不需要在每次渲染的时候，重新生成节点
    - patch 阶段跳过静态子树
  - generate
    - ast tree 生成 js 创建代码（字符串函数）
4. compileToFunctions
  - 将上一步获取的 js 字符串函数转化成函数
  - 转化方法 createFunction
  - render 和 renderStaticFns 初始化完毕，挂载到 Vue 的 options 上



# 组件化
- 一个 Vue 组件就是一个拥有预定义选项的 Vue 实例
- 一个组件可以组成页面上一个功能完备的区域，组件可以包含脚本/样式/模板


# 组件的注册
- 全局组件
const Comp = Vue.component('comp',{
  template: '<div>hello compiler</div>'
})
const vm = new Vue({
  render(h){
    return h(Comp)
  }
})

查看源码
core/global-api/index.js 
initAssetRegisters 方法定义 Vue.component
核心方法 extend

全局组件之所以可以在任意组件中使用，是因为Vue 构造函数的选项被合并到了 VueComponent 的构造函数选项中

- 局部组件



# Vue.extend
开发自定义组件会常用到这个方法
core/global-api/extend.js 中定义
initExtend 方法
组件的构造函数继承自 Vue 的构造函数


# 调试组件注册过程
项目 14-component
const Comp = Vue.component('comp',{
  template: '<div>hello compiler</div>'
})
Comp 其实是 VueComponent 构造函数，已经挂载到 Vue.options.components 里，属性就是 comp，所以 Vue.component 其实只是创建了一个构造函数并挂载到 Vue
这个过程叫组件的注册


# 组件的创建过程
项目 14-component
主要观察 render 方法内部执行过程
主要在 vdom/create-element.js 中的 _createElement 方法中
createComponent 方法 create-component.js 中
createComponent 将组件转化成 vnode
当中安装钩子函数 installComponentHooks ，这里合并了钩子函数，当中有一个 init 钩子函数创建了组件实例
组件实例是在 init 钩子函数中创建的，在 patch 中调用


# 组件的 patch 过程
vdom/patch.js 
createComponent 方法调用 init 钩子，创建组件实例
initLifecycle 方法中 建立父子组件关系

## 总结：
createElement 中的 createComponent 创建的是组件的 vnode，组件的对象是在组件的 init 钩子函数中创建的，然后再 patch -- createElm -- createComponent 中挂载组件

