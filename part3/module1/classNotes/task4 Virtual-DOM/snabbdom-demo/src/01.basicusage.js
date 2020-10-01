import { init } from '../node_modules/snabbdom/build/package/init.js'
import { h } from '../node_modules/snabbdom/build/package/h.js'

// 获取 patch 函数，作用对比两个 vnode 的差异更新真实 dom
let patch = init([])

// 第一个参数：标签+选择器
// 第二个参数： 如果是字符串的话就是标签中的内容
let vnode = h('div#container.cls', 'Hello World')

let app = document.querySelector('#app')

// 第一个参数：可以是 dom 元素，内部会把 dom 元素转成 vnode
// 第二个参数： vnode
// 返回值： vnode
let oldVnode = patch(app, vnode)

// 假设时刻 假设 数据是从服务器获取的
vnode = h('div','Hello Snabbdom')

// 比较差异更新 dom
patch(oldVnode, vnode)
















