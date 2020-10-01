import { init } from 'snabbdom/build/package/init.js'
import { h } from 'snabbdom/build/package/h.js'

let patch = init([])

//首次
let vnode = h('ul',[
  h('li','首页'),
  h('li','man'),
  h('li','women')
])
let app = document.querySelector('#app')
let oldvnode = patch(app,vnode)

// updateChildren
vnode = h('ul',[
  h('li','首页'),
  h('li','微博'),
  h('li','women')
])

patch(oldvnode,vnode)




















