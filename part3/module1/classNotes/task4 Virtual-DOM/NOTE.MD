# 课程目标

- 什么是虚拟dom？虚拟dom作用
- Snabbdom 基本使用
- Snabbdom 源码解析

# 什么是虚拟dom？

用普通的js 对象描述 dom 对象，因为不是真实的 dom 对象，所以叫虚拟 dom

虚拟 dom 示例
{
  sel: 'div',
  data: {},
  children: undefined,
  text: 'hello virtual dom',
  elm: undefined,
  key: undefined
}

真实 dom 的属性非常多，虚拟 dom 非常少，所以成本低，开销低

# 为什么使用虚拟 dom ？

- 手动操作 dom 随着项目越来越复杂，操作也越来越复杂
- 为了简化 dom 的复杂操作，于是出现了各种 mvvm 框架， 解决了视图和状态的同步问题
- 为了简化视图的操作我们可以使用模板引擎，但是模板引擎没有解决跟踪状态的问题，于是出现了虚拟dom
- 虚拟 dom 的好处是，当状态改变时，不需要立即更新 dom，只需要创建一个虚拟树来描述 dom，虚拟 dom
内部将弄清楚如何有效的更新dom（diff）
- 参考 github 上 virtual-dom 的描述
 - 虚拟 dom 可以维护程序的状态，更新上一次的状态
 - 通过比较前后两次状态的差异更新真实的 dom


# 虚拟 dom 的作用

- 维护视图和状态的关系
- 复杂视图情况下提升渲染性能
- 除了渲染 dom 以外，还可以实现 SSR（Nuxt.js/Next.js），原生应用（Weex/React Native）,小程序（mpvue/uni-app）等

虚拟dom 库：
- Snabbdom
  - vue 2.0 内部使用的 virtual dom 就是改造的 snabbdom
  - 大约 200 行代码
  - 通过模块可扩展
  - 源码使用 ts 开发
  - 最快的 virtual dom 之一
- virtual-dom


# Snabbdom 基本使用

创建项目：

md snabbdom-demo

cd snabbdom-demo

yarn init -y

yarn add parcel-bundler // 打包工具 parcel

配置 package:

"scripts": {
  "dev": "parcel index.html --open",
  "build": "parcel build index.html"
}

结构目录：

| index.html
| package.json
|_ src 

   01-basicusage.js



# 导入 snabbdom

## snabbdom 文档

- 看文档的意义：
  - 学习任何一个库都要先看文档
  - 通过文档了解库的作用
  - 看文档中提供的示例，自己快速实现一个 demo

- 文档地址：
  - https://github.com/snabbdom/snabbdom
  - 中文翻译

## 安装 snabbdom

yarn add snabbdom

## 导入 snabbdom

- 官网导入的时commenjs模块语法，我们使用 import

import { init,h,thunk } from 'snabbdom'

- 核心功能就这三个函数
  - init() 是一个高阶函数，返回 patch()
  - h() 返回虚拟节点 VNode，这个函数我们在使用vue的时候见过
  - thunk() 是一种优化策略，可以在处理不可变数据时使用

# 代码演示

## 三个方法 (核心库)：
- init 方法获取 patch 函数

- h 方法创建 vnode，参数1，参数2
参数1： 标签
参数2： 字符串：内容
        数组： 子元素

比较两个 vnode 差异，更新 dom
- patch （参数1，参数2）：参数1 可以是 真实dom，内部会将真实dom转成 vnode，与 参数2 比较，返回一个 vnode
// 清空 h('!') 注释标签
patch(vnode2, h('!')) 

# 模块
snabbdom 核心库并不能处理元素的属性/样式/事件等，如果需要的话，可以使用模块
## 常用模块

### 官方提供6个模块
- attributes
  - 设置 dom 元素的属性，setAttributes()
  - 处理布尔类型的属性
- props
  - 和上一个模块相似，处理元素属性 element[attr] = value
  - 不处理布尔类型的属性
- class
  - 切换类样式
  - 注意：给元素设置类样式是通过 sel 选择器
- dataset
  - 设置 data-* 的自定义属性
- eventlisteners
  - 注册和移除事件
- style
  - 设置行内样式，支持动画
  - delayed/remove/destroy

## 模块使用
模块使用步骤：
  - 导入需要的模块
  - init 中注册模块
  - 使用 h 函数创建 vnode 的时候，可以把第二个参数设置为对象，其他参数往后移 


#### 注意： 导入方式与视频教程不同，以官网为准，官网都不是很准，以库所在提示会准

# snabbdom 源码解析

## 如何学习源码
- 先宏观了解
- 带着目标看源码
- 看源码的过程要不求甚解
- 调试
- 参考资料

## snabbdom 核心
- 使用 h 函数创建 js 对象 vnode 描述真实 dom
- init 设置模块，创建 patch
- patch 比较新旧 vnode
- 把变化的内容更新到真实 dom 树上

## snabbdom 源码
- 源码地址
  - https://github.com/snabbdom/snabbdom
- src 目录结构
 │ h.ts h() 函数，用来创建 VNode 
 │ hooks.ts 所有钩子函数的定义 
 │ htmldomapi.ts 对 DOM API 的包装 
 │ is.ts 判断数组和原始值的函数 
 │ jsx-global.d.ts jsx 的类型声明文件 
 │ jsx.ts 处理 jsx 
 │ snabbdom.bundle.ts 入口，已经注册了模块 
 │ snabbdom.ts 初始化，返回 init/h/thunk 
 │ thunk.ts 优化处理，对复杂视图不可变值得优化 
 │ tovnode.ts DOM 转换成 VNode 
 │ vnode.ts 虚拟节点定义 
 │
 ├─helpers 
 │ attachto.ts 定义了 vnode.ts 中 AttachData 的数据结构 
 │
 └─modules 所有模块定义 
          attributes.ts 
          class.ts 
          dataset.ts 
          eventlisteners.ts 
          hero.ts  example 中使用到的自定义钩子 
          module.ts 定义了模块中用到的钩子函数 
          props.ts 
          style.ts



# h 函数

## h() 函数介绍
在使用 Vue 的时候见过 h() 函数

new Vue({ 
  router,
  store, 
  render: h => h(App) 
}).$mount('#app')

h() 函数最早见于 hyperscript，使用 JavaScript 创建超文本
Snabbdom 中的 h() 函数不是用来创建超文本，而是创建 VNode

## 函数重载
概念
参数个数或类型不同的函数
JavaScript 中没有重载的概念
TypeScript 中有重载，不过重载的实现还是通过代码调整参数

重载的示意
function add (a, b) {
  console.log(a + b) 
}
function add (a, b, c) { 
  console.log(a + b + c) 
}
add(1, 2) 
add(1, 2, 3) 

## 源码位置：src/h.ts

h 函数做了重载处理，主要是针对参数的个数情况，分别做处理；
最终还是返回虚拟节点，也就是 vnode 函数的结果



# 必备快捷键

查看某个变量定义为止：光标移动到变量， f12 / ctrl + 鼠标左键
返回刚刚的为止 alt + 左箭头



# vnode 函数

定义了一个接口，规定 VNode 对象必须有几个属性

vnode 函数返回一个对象，包含上面那几个属性



# patch 整个过程

patch （old，new）
打补丁，把新节点中变化的内容渲染到真实 dom，最后返回新节点作为下一次处理的节点

- 对比新旧 VNode 是否相同节点（节点的 key 和 sel 相同）
- 若不是相同节点，删除之前的内容，重新渲染
- 若是相同节点节点，在判断 VNode 是否有 text ，如果有并且和 oldVNode 的text 不同，直接更新 text
- 如果新的 VNode 有 children， 判断子节点是否变化，判断子节点的过程用 diff 算法
- diff 过程只进行同层级比较



# init 函数

遍历 modules 把 每一个模块中的 hook 存入 cbs 中
返回 patch 函数


# patch 函数

1. init 内部返回这个函数，这个函数把 vnode 渲染成真实 dom ，并返回 vnode
2. 判断参数1是不是vnode ，不是转成 vnode
3. 判断两个节点是否相同（判断条件 key && sel）
4. 如果相同，执行 **patchVnode** 方法，做深度比较
5. 如果不同，直接将参数2创建成真实dom（**createElm**方法，并触发 init 和create 勾子）渲染插入到父节点，并清除参数1（**removeVnodes** 方法）；
6. 执行勾子函数
7. 返回 参数2，vnode



# createElm 方法

作用：创建 vnode 对应的 dom 元素，并触发 create 勾子函数

1. 执行 init 勾子函数
2. 把 vnode 转化成真实 dom ，没有渲染到页面
   1. sel 是 ！ 创建注释节点
   2. sel 不为空：
     - 创建对应的 dom 对象
     - 触发模块的勾子函数 create
     - 创建所有子节点对应的 dom 对象
     - 触发用户的勾子函数 create
     - 如果 vnode 有 insert 钩子函数，追加到队列
   3. sel 为空 创建文本节点
3. 返回 dom，vnode.elm



# 批量添加/移除虚拟节点
addVnodes / removeVnodes

removeVnodes:
先判断 sel 是否定义 
  主要是得把 destroy 勾子先触发了
  判断有没有 remove 勾子，有就触发
  没有就直接清除了
否
  直接删除



# patchVnode 函数

1. 触发 prepatch 钩子函数
2. 触发 update 钩子函数
3. 新节点有 text 属性，且不等于旧节点的 text 属性
   1. 如果老节点有 children ，移除 children 和对应的 dom 元素
   2. 设置新节点对应的 dom 元素的 textContent
4. 新老节点都有 children，且不相等
   1. 调用 updateChildren
   2. 对比子节点，并且更新子节点的差异
5. 只有新节点有 children 属性
   1. 如果老节点有text ，清空对应 dom 的 textContent
   2. 添加所有子节点
6. 只有老节点有 children 属性
   1. 移除所有老节点
7. 只有老节点有text
   1. 清空对应 dom 的所有 textContent
8. 触发 postpatch 钩子函数
  


# updateChildren 函数

diff 算法核心，对比新旧节点的children，更新 dom

过程：
- 要对比两颗树的差异，我们可以取第一棵树的每一个节点一次和第二颗树的每一个节点比较，但是这样做的时间复杂度是O(n^3)
- 在 dom 操作的时候，我们很少会把一个父节点移动/更新到某一个子节点
- 因此只需要找到同级别的子节点比较，然后再找下一级的节点比较，这样时间复杂度O(n)
- 在进行同级别节点比较的时候，首先会对新老节点数组的开始和结尾节点设置标记索引，遍历过程中移动索引
- 在对**开始和结束节点**比较的时候，共有四种情况：
  - oldStartVnode / newStartVnode （旧开始节点 / 新开始节点）
  - oldEndVnode / newEndVnode（旧结束节点 / 新结束节点）
  - oldStartVnode / newEndVnode（旧开始节点 / 新结束节点）
  - oldEndVnode / newStartVnode（旧结束节点 / 新开始节点）

详细讲解上述四种比较情况：

- 开始节点和结束节点比较，这两种情况类似
  - oldStartVnode / newStartVnode （旧开始节点 / 新开始节点）
  - oldEndVnode / newEndVnode（旧结束节点 / 新结束节点）
1. 如果 oldStartVnode 和 newStartVnode 是 sameVnode( key 和 sel 相同 )
  - 调用 patchVnode 对比和更新节点
  - 旧开始和新开始索引往后移动，oldStartIdx++ / newStartIdx++
2. 和 1 类似
3. oldStartVnode / newEndVnode（旧开始节点 / 新结束节点） 相同
  - 调用 patchVnode 对比和更新节点
  - 把 oldStartVnode 对应的元素，移动到右边
  - 更新索引 oldStartIdx++ / newEndIdex--
4. oldEndVnode / newStartVnode（旧结束节点 / 新开始节点）相同
  - 调用 patchVnode 对比和更新节点
  - 把 oldEndVnode 对应的元素，移动到左边
  - 更新索引 oldEndIdx-- / newStartIdex++

如果以上四种情况都不满足：

- 遍历新结点，使用 newStartNode 的 key 在老节点数组中找相同节点
- 如果没有找到说明 newStartVnode 是新节点
  - 创建新结点对应的 dom 元素，插入 dom 树
- 如果找到了
  - 判断新节点和找到的老节点的 sel 选择器是否相同
  - 如果不相同，说明节点被修改了
    - 重新创建对应的 dom 元素，插入到 dom 树中
  - 如果相同，把 elmToMove 对应的 dom 元素，移动到左边

循环结束：
- 当老节点的所有子节点先遍历完，oldStartIdx > oldEndIdx ，循环结束
- 新结点所有子节点先遍历完，newStartIdx > newEndIdx ，循环结束
若老节点的数组先遍历完，说明新节点有剩余，那就把剩下的批量插入到右边
若新节点的数组先遍历完，说明老节点有剩余，全删除了


# 调试 patchVnode

# 调试 updateChildren

# 调试 带key的情况


# 模块源码

snabbdom 为了保证核心库的精简，把处理元素的属性/事件/样式等工作，放到模块中
模块的实现基于 hooks

## hooks
- 预定义的钩子函数的名称
- 源码位置： src/hooks.ts

export interface Hooks { 
  // patch 函数开始执行的时候触发 
  pre?: PreHook; 
  
  // createElm 函数开始之前的时候触发 
  // 在把 VNode 转换成真实 DOM 之前触发 
  init?: InitHook; 
  
  // createElm 函数末尾调用 
  // 创建完真实 DOM 后触发 
  create?: CreateHook; 
  
  // patch 函数末尾执行 
  // 真实 DOM 添加到 DOM 树中触发 
  insert?: InsertHook; 
  
  // patchVnode 函数开头调用 
  // 开始对比两个 VNode 的差异之前触发
  prepatch?: PrePatchHook;
  
  // patchVnode 函数开头调用 
  // 两个 VNode 对比过程中触发，比 prepatch 稍晚 
  update?: UpdateHook; 
  
  // patchVnode 的最末尾调用 
  // 两个 VNode 对比结束执行 
  postpatch?: PostPatchHook; 
  
  // removeVnodes -> invokeDestroyHook 中调用 
  // 在删除元素之前触发，子节点的 destroy 也被触发 
  destroy?: DestroyHook;

  // removeVnodes 中调用 
  // 元素被删除的时候触发 
  remove?: RemoveHook; 
  
  // patch 函数的最后调用 
  // patch 全部执行完毕触发 
  post?: PostHook;
}










