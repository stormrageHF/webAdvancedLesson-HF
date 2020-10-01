let _Vue = null

export default class VueRouter {
  // Vue.use() 中调用 install 方法的时候，传入两个参数，一个是 Vue 的构造函数，一个是可选对象
  static install (Vue) {
    // 1. 判断当前插件是否已经被安装
    if (VueRouter.install.installed) {
      return
    }
    VueRouter.install.installed = true

    // 2. 把Vue构造函数记录到全局变量
    _Vue = Vue

    // 3. 把创建Vue 实例时传入的 router 对象注入到所有 Vue 实例
    // _Vue.prototype.$router = this.$options.router
    // 混入
    _Vue.mixin({
      beforeCreate () {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router

          // 初始化
          this.$options.router.init()
        }
      }
    })
  }

  constructor (options) {
    this.options = options
    this.routeMap = {}
    this.data = _Vue.observable({
      current: '/'
    })
  }

  init () {
    this.createRouteMap()
    this.initComponents(_Vue)
    this.initEvent()
  }

  createRouteMap () {
    this.options.routes.forEach(route => {
      this.routeMap[route.path] = route.component
    })
  }

  initComponents (Vue) {
    // 创建 router-link
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
            click: this.handleClick
          }
        }, [this.$slots.default])
      },
      methods: {
        handleClick (e) {
          history.pushState({}, '', this.to)
          this.$router.data.current = this.to // 这里的修改触发了组件的更新
          e.preventDefault()
        }
      }
    })

    const self = this
    Vue.component('router-view', {
      render (h) {
        const component = self.routeMap[self.data.current]
        return h(component)
      }
    })
  }

  initEvent () {
    window.addEventListener('popstate', () => {
      console.log(location.pathname) // 最后路径部分
      this.data.current = location.pathname
    })
  }
}
