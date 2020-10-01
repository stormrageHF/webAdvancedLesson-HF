import { init } from 'snabbdom/build/package/init.js'
import { h } from 'snabbdom/build/package/h.js'

let patch = init([])

let vnode = h('div', 'hello world')
let app = document.querySelector('#app')

// 首次渲染
let old = patch(app, vnode)

// patchVnode
let newvnode = h('div', 'hello snabbdom')
patch(old, newvnode)
















