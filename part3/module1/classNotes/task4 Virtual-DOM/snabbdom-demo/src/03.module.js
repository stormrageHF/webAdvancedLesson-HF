import { init } from 'snabbdom/build/package/init.js'
import { h } from 'snabbdom/build/package/h.js'
// 1. 导入模块
import { styleModule } from 'snabbdom/build/package/modules/style'
import { eventListenersModule } from 'snabbdom/build/package/modules/eventlisteners'

// 2. 注册模块
let patch = init([
  styleModule,
  eventListenersModule
])
// 3. h 函数第二个参数传入模块相关对象
let vnode = h('div', {
  style: {
    backgroundColor: 'red'
  },
  on: {
    click: eventHandler
  },
  hook: {
    init(vnode){
      console.log(vnode.elm);
    },
    create(emptyNode, vnode){
      console.log(vnode.elm);
    }
  }
},[
  h('h1', 'hello world'),
  h('p','pppppppppppp')
])

let eventHandler = () => {
  console.log('点击~~~~~~~~');
}

let app = document.querySelector('#app')
patch(app, vnode)

