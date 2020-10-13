# 准备工作-调试

## 打包

## 打包工具：Rollup
- vuejs的源码打包工具是 rollup 比 webpack 更加轻量
- webpack 把所有文件当模块，rollup 只处理 js 更适合 vuejs 这种库
- Rollup 打包不会生成冗余代码

### 安装依赖
- npm i

### 设置 sourcemap
- package.json 文件中的 dev 脚本中的添加参数 --sourcemap

"dev": "rollup -w -c scripts/config.js --sourcemap --environment TARGET:web-full-dev",

-w 是 watcher 监视文件变化，重新打包
-c 设置配置文件
--environment 配置环境变量，根据 TARGET 的值生成不同版本的 vue
--sourcemap 生成代码地图


### 执行 dev
- npm run dev 执行打包，用的是 rollup， -w 参数是监听文件变化，文件变化自动重新打包
- 结果: 查看 dist 目录

### 操作
1. 可以把 dist 目录删除，运行打包命令，dist 中只有 vue.js 和 vue.js.map 
2. 如果想生成其他版本的文件，可以运行 npm run build
3. 调试案例，在 examples 中找到一个案例，比如 grid ，index.html 中修改引入的vue路径，使用源码版本<script src="../../dist/vue.js"></script>
4. 运行 index.html 案例，因为有 sourcemap 所有会有一个src 目录，如果不开启 sourcemap ，调试会进入 dist 中的 vue.js 一万多行代码，很不清晰



# 准备工作-vue 不同构建版本

- npm run build 重新打包所有文件
- 官方文档-对不同构建版本的解释
- dist\README.md
                                UMD                              CommonJS                                     ES Module
Full                            vue.js                           vue.common.js                                vue.esm.js
Runtime-only                    vue.runtime.js                   vue.runtim.common.js                         vue.runtime.esm.js
Full(production)                vue.min.js
Runtime-only(production)        vue.runtime.min.js

## 术语

- 完整版：同时包含编译器和运行时版本
- 编译器：用来将模板字符串编译成 js 渲染函数代码，体积大，效率低，多了 3000 行代码
- 运行时：用来创建vue 实例，渲染并处理虚拟 dom 等代码，体积小，效率高，出去编译器的版本
- UMD： 通用的模块版本，支持多种模块方式；vue.js 默认就是运行时 + 编译器的UMD版本，可以直接引入到浏览器使用
- CommonJS: 用来配合老的打包工具比如 Browserify 或 webpack1
- ES Module：从 2.6 开始 vue 会提供两个（ESM）构建文件，为现代打包工具提供的版本；
  - ESM 格式被设计为可以被静态分析，所以打包工具可以利用这一点来进行 tree-shaking 并将用不到的代码排除出最终的包
  - ES6 模块和 CommonJS 模块的差异（阮一峰）

## 操作
examples 下项目 01-runtime+compiler 中引入不同版本的 vue， 观察完整版和运行时的区别

### 查看 vue-cli 创建的项目使用什么版本
- 命令 vue inspect > output.js 将webapck 配置输出到 output js文件
- 查看 output 中 resolve 的 alias 的 vue$ 使用的 vue.runtime.esm.js ($是webpack语法，是精确匹配的意思，比如 import Vue from 'vue' 直接 from vue 不需要绝对路径)
- 单文件组件 App.vue ，在打包的时候会转化成 js 对象，里面的模板也会转化成 render 函数，所以不需要编译器，因为最终在浏览器里运行的是不带模板字符串的最终版本

最后推荐使用运行时版本


# 寻找入口文件
- 查看 dist/vue.js 的构建过程

## 执行构建
- npm run dev
"dev": "rollup -w -c scripts/config.js --sourcemap --environment TARGET:web-full-dev",

-- environment TARGET:web-full-dev 设置环境变量 TARGET

- script/config.js 的执行过程
  - 作用：生成 rollup 构建的配置文件
  - 使用环境变量 TARGET = web-full-dev （web平台-完整版本-不压缩）

### 操作
查看 scripts/config.js 文件
1. 文件末尾一般会导出对象，根据环境变量生成配置对象，genConfig(target) 比如 target 是 web-full-dev；
2. 进入 genConfig 实现查看 builds ，环境变量对象，存储一些打包配置信息，比如找到 web-full-dev 对应的内容；
3. 打包配置信息，包括入口，出口，环境，格式，banner（文件头）
4. 查看 entry 的 resolve 实现，生成绝对路径，查看 alias
5. alias 文件引入各种文件，查看 web，返回 web 的绝对路径
6. 回到 resolve 方法，继续往下走，会发现它将入口文件的绝对路径拼接并返回给 builds 里的 entry；
7. 回到 genConfig 方法，拿到入口文件对象，生成 config 对象，返回配置对象 config
8. 构建命令最终执行的就是 7 里的 config 对象

通过上述操作，你可以找到打包构建命令中的真实入口文件



# 从入口开始
- src/platform/web/entry-runtiime-with-compiler.js

## 通过查看源代码解决下列问题
- 观察以下代码，通过阅读源码，回答在页面上输出的结果

```
const vm = new Vue ({
  el:'#app',
  template: '<h3>hello template</h3>',
  render(h){
    return h('h4','hello render')
  }
})
```
$mount 方法中有判断是否存在 render，进行对应的处理，有 render 只执行 render

### 如何快速找到 $mount 方法调用位置
- npm run build 不会生成 sourcemap
1. 02-debug 项目，用浏览器打开 index 
2. 浏览器中找到文件 entry-runtime-with-compiler.js
3. 在 $mount 中添加断点
4. 观察 callstack ，在 init 中调用

### 阅读源码记录
- el 不能是 body 或者 html 标签
- 如果没有 render，把 template 转换成 render 函数
- 如果有 render 方法，直接调用 mount 挂载 DOM


#  Vue 的初始化过程

1. platforms/web/ 下有很多入口文件，其中 entry-runtime-with-compiler.js 是完整版入口文件，entry-runtime.js 是运行时版入口文件

2. entry-runtime-with-compiler.js 主要是实现了，将 html 字符串转成 render 函数的功能

3. 这个文件中导入了一个 Vue 构造函数，runtime/index，进入这个模块
4. 在 index.js 中，注册了很多方法，注册了指令和组件，根据 inBrowser 方法 注册了 __patch__ 方法，inBrowser 是通过 core/util/index 模块导入的
5. 注册了实例方法 $mount 
6. Vue 构造函数，从 core/index 模块，进入模块
7. 在这个 index.js 中，initGlobalAPI 方法，查看这个方法，在 global-api/index 下
8. 回到 core/index 找到 Vue 构造函数，导入模块是 instance/index，进入模块看到构造函数


## 四个导出Vue的模块

- src/platforms/web/entry-runtime-with-compiler.js
  - web 平台相关的入口
  - 重写了平台相关的$mount方法
  - 注册了 Vue.compile（）方法，传递了一个 html 字符串返回一个 render 函数

- src/platforms/web/runtime/index.js
  - web 平台相关
  - 注册和平台相关的全局指令：v-model v-show
  - 注册和平台相关的全局组件：v-transition v-transition-group
  - 全局方法：
    - __patch__:把虚拟 DOM 转换成真实 DOM
    - $mount: 挂载方法

- src/core/index.js
  - 与平台无关
  - 设置了 Vue 的静态方法，initGlobalAPI（Vue）

- src/core/instance/index.js
  - 与平台无关
  - 定义了构造函数，调用了 this._init(options)方法
  - 给 Vue 中混入了常用的实例成员



# 初始化的两个问题
vscode 默认不识别 flow，所以会有很多错误；
文件-首选项-设置-右上角open-setting（json）
设置检查 js 语法，关闭
安装插件 Babel JavaScript


# Vue初始化-静态成员

查看 initGlobalAPI（）实现，这里有注释



# Vue初始化-实例成员

instance/index.js 里的各种方法
给vue 实例混入一些对象或者方法



# Vue初始化-实例成员-init
initMixin 中 _init 的实现



# Vue初始化-实例成员-initState
initMixin 中 _init 中的 initState 的实现



# 调试初始化过程
03-initVue 调试
1. 在四个初始化相关的文件中 加好断点
2. 在调试右侧 watch 中，添加 Vue，观察没调用一个方法给 Vue 实例增加了什么样的成员



# Vue 首次渲染的过程
调试构造函数中的 init 方法，这里面将会调用 vue 初始化的时候准备的一系列静态方法和实例方法，以及一些对象


# 首次渲染过程总结
1. vue 初始化，实例成员，静态成员
2. new Vue()
3. 初始化结束之后，开始调用构造函数，在构造函数中调用this._init()
4. vm.$mount()  src/platforms/web/entry-runtime-with-compiler.js 
  - 把模板编译成 render 函数
  - compileToFunctions() 生成 render（）函数
  - options.render = render 
5. vm.$mount()  src/platforms/web/runtime/index.js   mountComponent()
6. mountComponent(this,el)  src/core/instance/lifecycle.js   
  - 判断是否有 render 选项，如果没有但传入了模板，并且当前是开发环境话会弹出警告
  - 触发 beforeMount
  - 定义 updateComponent, vm._render 生成 vnode，vm._update 将 vnode 转化成真实 dom
  - 创建 Watcher 实例, updateComponent 传递，调用 get () 方法
  - 触发 mounted
  - return vm
7. Watcher.get()
  - 创建完 watcher 会调用一次 get
  - 调用 updateComponent 方法
  - 调用 _vm.render() 创建 vnode
    - 调用render.call(vm._renderProxy, vm.$createElement)
    - 调用实例化的 Vue 传入的 render()
    - 或者编译 template 生成的 render()
    - return VNode
  - 调用 _vm.update() 
    - 调用 vm.__patch__(vm.$el,vnode) 挂载真实 dom
    - 记录 vm.$el



# 数据响应式原理 - 响应式处理入口
通过查看源码解决下面问题
vm.msg = {count: 0} 重新给属性赋值是否是响应式的
vm.arr.legnth = 0 视图是否会更新
vm.arr[4] = 0 给元素赋值，视图是否会更新
vm.arr.push(4)  视图是否会更新

## 响应式处理的入口
整个响应式的处理过程是比较复杂的
- src/core/instance/init.js
  - initState  vm状态初始化
  - 初始化了 _data, _props, _methods

- src/core/instance/state.js


# 数据响应式原理-Observer
src/core/observer/index.js
观察类 Observer

# 数据响应式原理-defineReactive
src/core/observer/index.js
观察 defineReactive

# 数据响应式原理-依赖收集
src/core/observer/index.js
src/core/observer/dep.js
src/core/observer/watcher.js


# 数据响应式原理-依赖收集-调试
04-observe


# 数据响应式原理-数组
入口在 Observer 类的构造函数
src/core/observer/array.js

# 数据响应式原理-数组练习
05-observe-arr
push 是响应式的，push 修改数组会更新视图
arr[0] = 4 不是响应式的，不会更新视图
arr.length = 0 不是响应式的
vue 只对数组的元素做了处理，并未对属性做处理
可以使用 splice 修改数组，也可以达到响应式的目的


# 数据响应式原理-Watcher 上
Watcher 类
- 分为三种，Computed Watcher，用户 Watcher （侦听器），渲染 Watcher
- 渲染 Watcher 的创建时机
  - /src/core/instance/lifecycle.js

export function mountComponent ()


# 数据响应式原理-Watcher 下
数据更新的时候 watcher 如何工作
从 dep 的 notify 入口


# 数据响应式原理-调试 上 
调试响应式数据执行过程：
- 数组响应式处理的核心过程和数组收集依赖的过程
- 当数组的数据改变的时候 watcher 的执行过程
05-observe-arr


# 数据响应式原理-调试 下 
数组数据发生改变，watcher 过程
notify 方法


# 数据响应式原理-总结
- initState() --> initData() --> observe()
- observe(value)
  - src/core/observer/index.js
  - 功能：
    - 判断 value 是否是对象，不是对象直接返回
    - 判断 value 对象是否有__ob__， 有直接返回
    - 如果没有，创建 observer 对象
    - 返回 observer 对象
- Observer 类
  - src/core/observer/index.js
  - 功能：
    - 给 value 对象定义不可枚举的 __ob__ 属性，记录当前的 observer 对象
    - 数组响应式处理
    - 对象响应式处理，调用 walk 方法
- defineReactive 方法
  - src/core/observer/index.js
  - 功能：
    - 为每一个属性创建 dep 对象
    - 如果当前属性值是对象，调用 observe
    - 定义 getter
      - 收集依赖
      - 返回属性的值
    - 定义 setter
      - 保存新值
      - 如果新值是对象，调用 observe
      - 派发更新，调用 dep.notify()
- 收集依赖
  - 在 watcher 对象的 get 方法中调用 pushTarget 记录 Dep.target 属性
  - 访问 data 中的成员时收集依赖，defineReactive 的 getter 中收集依赖
  - 把属性对应的 watcher 对象添加到 dep 的 subs 数组中
  - 给 childOb 收集依赖，目的是子对象添加和删除成员时发送通知
- Watcher
  - dep.notify()调用 watcher 对象的 update 方法
  - queueWatcher() 判断 watcher 是否被处理，如果没有的话添加到 queue 队列中，并调用 flushSchedulerQueue()
  - flushSchedulerQueue()
    - 触发 beforeUpdate 勾子函数
    - 调用 watcher.run() --> get() --> getter() --> updateCompoent()
    - 清空上一次依赖？应该是清空无效的依赖
    - 触发 actived 钩子函数
    - 触发 updated 钩子函数



# 动态添加一个响应式属性
06-set

Vue.set() vm.$set()
三个参数： obj, propertyName/index, value
例子：
给一个对象添加响应式属性
vm.$set(obj,'name','hanhan')
修改一个数组的某个成员
vm.$set(arr, 0, 100)
###  注意：这个方法不可以给 Vue 实例或者 $data 添加响应式属性 


# set-源码
定义位置：
静态方法 set
global-api/index.js

Vue.set = set

实例方法 $set
instance/index.js
instance/state.js

Vue.prototype.$set = set

set 实现位置在 observer/index.js
# set-调试
06-set



# delete
vm.$delete
- 功能：
删除对象的属性，如果对象是响应式的，确保删除能触发更新视图，这个方法主要用于
避开 Vue 不能检测到属性被删除的限制，但是你应该会很少使用它
#### 注意：目标对象不能是 vue 实例或vue 实例的根数据对象
- 示例：
vm.$delete(vm.obj,'msg')

定义位置：
- Vue.delete（）
  - global-api/index.js
- vm.$delete()
  - instance/index.js

delete 实现位置在 observer/index.js  del

调试
06-set


# watch - 回顾
vm.$watch(expOrFn, callback, [options])

- 功能：
  观察 Vue 示例变化的一个表达式或计算属性函数。回调函数得到的参数为新值旧值；表达式只接收监督的键路径；对于更复杂的表达式，用一个函数取代

- 参数：
  - expOrFn：要监视的 $data 中的属性，可以是表达式或函数
  - callback: 数据变化后执行的函数
    - 函数：回调函数
    - 对象：具有 handler 属性（字符串或者函数），如果该属性为字符串则 methods 中相应的定义
  - options：可选的选项
    - deep：布尔类型，深度监听
    - immediate：布尔类型，是否立即执行一次回调函数

- 示例：
07-watch


# 三种类型的 watcher

- 没有静态方法，因为 $watch 方法中使用 vue 的实例
- watcher 分三种：计算属性 watcher，用户 watcher （侦听器），渲染 watcher
  - 创建顺序：计算属性 watcher，用户 watcher （侦听器），渲染 watcher
- vm.$watch()
  - src/core/instance/state.js

08-watch



# watcher 源码
08-watch 


# nextTick 回顾
异步更新队列
- vue 更新 dom 是异步执行的，批量的
  - 在下次 dom 更新循环结束之后执行延迟回调，在修改数据之后立即使用这个方法，获取更新后的 dom
- vm.$nextTick(function (){/*操作dom*/ }) / Vue.nextTick(function(){})
09-nextTick

# nextTick 源码
位置 
- src/core/instance/render.js

Vue.prototype.$nextTick = function (fn:function){
  return nextTick(fn, this)
}

源码
- 手动调用 vm.$nextTick()
- 在 Watcher 的 queueWatcher 中执行 nextTick()
- src/core/util/next-tick.js

nextTick 内部会优先使用微任务执行异步回调函数，当浏览器不支持微任务时，降级成宏任务
如果浏览器不支持 promise 则降级成 mutationObserver












