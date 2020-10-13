# 什么是虚拟DOM
- 虚拟dom 是使用 js 对象描述真实 dom
- vue中的虚拟 dom 借鉴 snabbdom，并添加了 vue 的特性
  - 例如 指令和组件机制

# 为什么使用虚拟dom
- 避免直接操作 dom， 提高开发效率；开发过程关注业务代码实现，不需要关注 dom 浏览器兼容性问题；
- 作为一个中间层可以跨平台；web ，服务端渲染， weex框架跨移动端 
- 虚拟 dom 不一定能提高性能
  - 首次渲染的时候会增加开销
  - 复杂试图情况下提升渲染性能；会对比新旧dom差异，按需更新；通过 key 属性重用dom，避免不必要的重绘；

# h 函数
- vm.$createElement(tag,data,children,normalizeChildren)
  - tag
    - 标签名称或者组件名称
  - data
    - 描述tag，可以设置 dom 的属性或者标签的属性
  - children
    - tag 中的文本内容或者子节点

# VNode
工程 10-vdom
- 核心属性
  - tag
  - data
  - children 文本结点或者元素节点
  - text 
  - elm 真实 dom
  - key 重用

# vdom 创建的整体过程分析
1. vm._init()
2. vm.$mount()
3. mountComponent()
4. 创建 watcher 对象
5. updateComponent()
6. vm._render()
7. vm._update()
8. vm.__patche__()
9. patchVnode
10. updateChildren


# createElement
src/instance/render.js


## 上
1. renderMixin 中定义了 __render__ 方法
2. 其中又调用了用户传过来的或者模板编译的 render 方法
3. render.call() 传了一个 $createElement 方法进去
4. _c 和 $createElement 方法都是调用 createElement 方法
5. 这个方法的位置是 src/core/dom/create-element.js

## 下
1. createElement 方法内部返回 _createElement 方法
2. vNode 类所在位置是 src/core/vdom/vnode.js 
3. 详解 _createElement 看代码注释

总结：vnode 的创建过程


# update
src/instance/lifecycle.js

1. lifecycleMixin 方法中定义


总结：vnode 渲染成真实 dom



# patch 函数初始化

初始化位置 src/platforms/web/runtime/index.js
根据环境设置

patch 位置 src/platforms/web/runtime/patch.js

createPatchFunction
nodeOps 操作 dom 的api
platformModules 平台相关的模块，比如属性，事件等，对应生命周期 create update
baseModules 处理指令和 ref

createPatchFunction 位置 core/vdom/patch
这个方法主要是完成 patch 函数的初始化，最终返回 patch 函数


# patch 执行过程
查看 patch 实现的源码
两个核心方法 createElm 和 patchVnode



# createElm
vnode 转化成真实 dom 挂载到 dom 树
core/vdom/patch.js/createPatchFunction 


# patchVnode
对比新旧 vnode 找到他们的差异，更新真实 dom


# updateChildren
新老节点都有子节点，对子节点进行 diff 算法，对比新老子节点


# 没有设置 key 的情况
调试项目 11-key
重点关注 updateChildren 中如何处理的
在没有设置 key 的时候，更新了三次 dom， 插入了一次 dom，四次dom 操作

# 设置了 key 的情况
调试项目 11-key
重点关注 updateChildren 中如何处理的
设置 key 以后，dom 的操作只有一次


# 总结
1. vm._render()
  - vnode = render.call(vm._renderProxy,vm.$createElement)
  - $createElement h函数 用户设置的 render 函数，内部 createElement
  - _c()  h函数 模板编译的render 函数，内部 createElement
  - createElement 函数内部创建了 vnode ，vm._render 结束，最终返回 vnode
2. vm._update()
  - 负责把虚拟 dom 渲染成真实 dom
  - 首次执行 __patch__(vm.$el,vnode,hydrating,false)
  - 更新数据 __patch__(preVnode,vnode)
3. vm.__patch__()
  - runtime/index.js 中挂载 Vue.prototype.__patch__
  - runtime/patch.js 中的 patch 函数
  - 设置 modules 和 nodeOps
  - 调用 createPatchFunction 函数返回 patch 函数
4. patch()
  - vdom/patch.js 中的 createPatchFunction 返回的 patch 函数
  - 挂载 cbs 节点的属性/样式/事件操作等钩子函数
  - 判断第一个参数是真实dom还是虚拟dom，首次加载是真实dom，将真实dom转化为vnode，调用 createElm
  - 如果是数据更新的时候，新旧节点是 sameVnode 执行 patchVnode 也就是 diff
  - 删除旧节点
5. createElm()
  - 把虚拟节点转化为真实dom，并插入 dom 树
  - 把虚拟节点的children转化为真实 dom，并插入 dom 树
6. patchVnode()
  - 对比新旧 vnode 以及子节点，更新差异
  - 如果都有子节点且子节点不同，则调用updateChildren对比子节点差异
7. updateChildren ()
  - 从头和尾依次找到相同的子节点依次比较 patchVnode，总共有四种比较方式
  - 在老节点的子节点中查找 newStartVnode 并进行处理
  - 如果新节点比老节点多，把新增的子节点插入 dom 树
  - 如果老节点比新节点多，则把老节点清除