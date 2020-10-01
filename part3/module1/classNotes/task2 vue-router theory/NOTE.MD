# 动态路由

1. 在配置路由的地方，开启 props ，会把 url 中的参数传递给组件
2. component 可以用懒加载的形式，只有访问到这个组件的时候，在 import 进来


动态路由传参方式：

1. $route.params.id ；通过路由规则获取；这个方式不好，过分依赖路由；

2. routes 中开启 props ；在路由规则中开启 props 传参

规则中开启 props

<script>
conste routes = [
  {
    path: '/detail/:id',
    name: 'Detail',

    // 组件中通过 props 接受 url 参数
    props: true,

    // lazy-loaded 懒加载
    component: ()=> import('../views/Detail.vue')
  }
]
</script>

组件中接收参数

<script>
export default {
  name: 'Detail',
  props: ['id'] // 这里接收参数 id 
}
</script>


# 嵌套路由

Layout 组件嵌套 Index 和 Detail

<div>
<div>header</div>
<div>
<router-view></router-view>
</div>
<div>footer</div>
</div>

规则

<script>
// 嵌套路由
conste routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'index',
        component: Index
      },
      {
        path: '/detail/:id',
        name: 'Detail',

        // 组件中通过 props 接受 url 参数
        props: true,

        // lazy-loaded 懒加载
        component: ()=> import('../views/Detail.vue')
      }
    ]
  }
]
</script>


# 编程式导航

<script>

this.$router.push('/login')

this.$router.replace('/login')

this.$router.push({name: 'Detail', params: {id: '123123'}})

this.$router.go(-2)

this.$router.back() === this.$router.go(-1)

</script>


# hash 模式和 history 模式区别

hash 模式 url中有 # ？ 等符号

history 模式需要服务器配置

## 原理的区别

- hash 模式基于锚点，以及 onhashchange 事件

通过锚点的值作为路由地址，当地址变化后触发 onhashchange 事件

根据路径决定页面呈现的内容

锚点是网页制作中超级链接的一种，又叫命名锚记。命名锚记像一个迅速定位器一样是一种页面内的超级链接，运用相当普遍。
英文名：anchor
使用命名锚记可以在文档中设置标记，这些标记通常放在文档的特定主题处或顶部。然后可以创建到这些命名锚记的链接，这些链接可快速将访问者带到指定位置。
创建到命名锚记的链接的过程分为两步。首先，创建命名锚记，然后创建到该命名锚记的链接。

- history 模式基于 html5 中的 History API

history.pushState() IE 10 以后才支持

history.replaceState()

**history.push 方法，路径会发生变化，向服务器发送请求**

**history.pushState 方法，只改变路径，不发送请求，并把路径记录到历史记录中**


# history 模式使用

因为单页面应用，服务器只有 index.html 一个web文件；所以不能按照真实访问路径来获取资源；
所以服务器配置的时候，除了静态资源以外都应该返回 index.html


<script>
// 404vue
conste routes = [
  {
    path: '*',
    name: '404',
    component: import('../views/404.vue'),
  }
]
</script>

服务器支持的配置可到官网查看


# nginx 服务器配置

- 官网下载 nginx 的压缩包
- 解压到c盘根目录，c:\nginx 文件夹
- 打开命令行，切换到目录 c:\nginx

启动
start nginx 默认端口 80 被占用就修改 conf
重启
nginx -s reload
停止
nginx -s stop

- 打包的 web 文件要放到 html 目录中

- 启动服务后，浏览器输入 localhost 查看能否正常访问

- 刷新会报错 404，需要修改配置文件

### 打开 nginx.conf 

server {
  listen   80  //  这里修改端口号
  ...

  location / {
    root   html；// 网站根目录
    index  index.html  index.htm; // 在根目录找的 index 文件
    try_files $uri $uri/ /index.html; // history 模式配置，尝试访问路径中文件，找不到就指定一个 index.html 
  }
}

重启 nginx


# VueRouter 基本实现原理

history 模式

- 通过 history.pushState 方法改变地址栏
- 监听 popstate 事件
- 根据当前路由地址找到对应组件重新渲染

**==============================================================2020/09/19==================================================================================**

# VueRouter 模拟分析实现

回顾核心代码

// router/index.js
// 注册插件
Vue.use(VueRouter)
// 创建路由对象
const router = new VueRouter ({
  routes: [
    {name: 'home', path: '/', component: homeComponent}
  ]
})
// main.js
// 创建 Vue 实例， 注册 router 对象
new Vue({
  router,
  render: h=> h(App)
}).$mount('#app)


推导出大概结构，如下：

1. Vue.use(参数) 
参数可以是函数或对象
- 函数，vue 内部直接调用
- 对象，vue 调用对象的 install 方法

2. VueRouter 是一个类
有一个静态方法 install 
构造方法的参数是一个对象，对象里是指定的结构，包含路径，组件

3. 创建 vue 的时候，参数是一个对象，对象中有一个属性就是 router


## 类图

1. 类名 VueRouter

2. 属性：
- options  记录构造函数中传入的对象
- data  响应式对象，当前路由地址发生变化，那对应的组件要自动更新，用 vue.observable() 实现
- routeMap  记录 路由地址和组件的对应关系

3. 方法：
- 静态 
install(Vue): void  用来实现 vue 的插件机制

- 实例
Constructor(Options): VueRouter 构造方法
init():void  用来调用下面三个方法
initEvent():void  用来注册 popState 实现，用来监听浏览器历史的变化
createRouteMap():void  初始化 routeMap 属性，把构造函数中路由规则转化成键值对形式，键是路由地址，值是组件
initComponents(Vue):void  用来创建 router-link 和 router-view 组件


# install 方法

  static install (Vue) {
     分析有哪些事情需要做

     1. 判断当前插件是否安装过了，已经安装则 return

     2. 把 Vue 的构造函数记录到全局变量中，方便以后在其他实例方法中使用，比如创建 router-view 

     3. 把创建 vue 实例时传入的 router 对象，注入到所有 vue 实例上，比如 this.$router 就是在这时注入到实例上的，所有组件也都是 vue 的实例
     这里需要用混入，给所有的 Vue 实例混入对象，所有的组件也会执行这个混入，
     所以需要判断过滤掉组件，只要最开始的 vue 实例
     
     _Vue.mixin({  // 混入 当 Vue 实例初始化的时候，会调用 beforeCreate 钩子函数
      beforeCreate() { // 这个钩子执行时， this 指向 vue 实例
        if (this.$options.router) { // 过滤组件，只有包含 router 的才进来
          _Vue.prototype.$router = this.$options.router // 将传入的 router 对象绑定到 _Vue 的原型对象上，方便使用
        }
      }
    })
  }


# 构造方法

初始三个属性 options data routeMap

  constructor(options){
    this.options = options
    this.routeMap = {}
    this.data = _Vue.observable({
      current: '/'
    })
  }


# createRouteMap

遍历路由规则，解析转换成 routeMap 键值对存储

  createRouteMap () {
    this.options.routes.forEach(route => {
      this.routeMap[route.path] = route.component
    })
  }

# initComponents

创建两个组件
router-link 最终渲染成超链接

  initComponents (Vue) {
    // 创建 router-link
    Vue.component('router-link', {
      props: {
        to: String
      },
      template: '<a :href="to"><slot></slot></a>'
    })
  }

  init () {
    this.createRouteMap()
    this.initComponents(_Vue)
  }

beforeCreate(){
    // 初始化
    this.$options.router.init()
}

从 vuerouter 引入 VueRouter
import VueRouter from '../vuerouter/index.js'

运行

报错 [Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.

Vue 的构建版本
- 运行时版本，不支持 template 模板，需要打包的时候提前编译
- 完整版，包含运行时和编译器，体积比运行时大 10k 左右，程序运行的时候把模板转化的 render 函数

Vue-cli 默认时 runtime-only 版本

# 完整版 Vue

vue.config.js

module.exports = {
  runtimeCompiler: true // 开启完整版
}

重启服务


# render

运行时版本解决上述问题

Compiler 作用把 template 转成 render 函数
现在没有 Compiler，我们需要自己实现 render 函数

      // template: '<a :href="to"><slot></slot></a>'
      render(h){
        return h('a',{
          attrs: {
            href: this.to
          }
        },[this.$slots.default])
      }

render 函数的参数是 h函数；

h 函数的作用是创建 vnode；第一个参数是标签名称，第二个参数是标签相关的属性定义；第三个参数是 child 部分


# router-view 组件

    const self = this
    Vue.component('router-view', {
      render (h) {
        const component = self.routeMap[self.data.current]
        return h(component)
      }
    })
  }

测试，内容没有变，网页刷新了，说明向服务器发送请求了；所以要阻止请求；

在 router-link 里做修改:

- 禁止 a 标签的 href 后续事件响应；也就是自定义点击事件；
- pushState 修改 url；
- 并更新 data.current 路径

    Vue.component('router-link', {
      props: {
        to: String
      },
      // template: '<a :href="to"><slot></slot></a>'
      render (h) {
        return h('a', {
          attrs: {
            href: this.to
          },
          on: {
            click: this.handleClick  // 注册 click 事件
          }
        }, [this.$slots.default])
      },
      methods: {
        handleClick (e) { // 自定义 click 事件
          history.pushState({}, '', this.to) // pushState 修改 url 不发送请求
          this.$router.data.current = this.to  // 更新 data 的 current 路径，触发 router-view 更新 ；this 是 router-link ，也是 vue 实例，所以必然存在属性 $router
          e.preventDefault() // 阻止默认请求
        }
      }
    })


# initEvent 

解决浏览器 前进 后退 事件


  init () {
    this.createRouteMap()
    this.initComponents(_Vue)
    this.initEvent()
  }

  initEvent(){
    window.addEventListener('popstate', ()=>{
      // console.log(location.pathname); // 最后路径部分
      this.data.current = location.pathname // 触发刷新
    })
  }






