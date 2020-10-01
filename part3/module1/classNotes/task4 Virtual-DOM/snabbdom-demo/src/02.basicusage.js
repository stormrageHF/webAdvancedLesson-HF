import { init } from '../node_modules/snabbdom/build/package/init.js'
import { h } from '../node_modules/snabbdom/build/package/h.js'

let patch = init([])

let app = document.querySelector('#app')

let vnode = h('div#container.cls',[
  h('h1','hello h1'),
  h('p', 'pppppppppp')
])

let oldVnode = patch(app,vnode)

// 2s 后更新
setTimeout(() => {
  let vnode = h('div#test',[
    h('h1','hello wolrd'),
    h('p', 'hello 2s')
  ])
  let vnode2 = patch(oldVnode, vnode)
  // 清空
  patch(vnode2, h('!'))
}, 2000);


















