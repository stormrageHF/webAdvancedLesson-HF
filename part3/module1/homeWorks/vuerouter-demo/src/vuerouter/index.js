let _Vue = null

export default class VueRouter {
  static install (Vue) {
    if (VueRouter.install.installed === true) {
      return
    }
    VueRouter.install.installed = true
    _Vue = Vue
    _Vue.mixin({
      beforeCreate () {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router
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
    Vue.component('router-link', {
      props: {
        to: String
      },
      render (h) {
        return h('a', {
          attrs: {
            href: '#' + this.to
          },
          on: {
            click: this.eventClick
          }
        }, [this.$slots.default])
      },
      methods: {
        eventClick (e) {
          window.location.hash = '#' + this.to
          this.$router.data.current = this.to
          // history.pushState({}, '', location.href)
          e.preventDefault()
        }
      }
    })

    const that = this
    Vue.component('router-view', {
      render (h) {
        const component = that.routeMap[that.data.current]
        return h(component)
      }
    })
  }

  initEvent () {
    window.addEventListener('load', () => {
      window.location.hash = '#/'
    })
    window.addEventListener('hashchange', () => {
      this.data.current = window.location.hash.substr(1)
    })
    // window.addEventListener('popstate', () => {
    //   this.data.current = location.hash.substr(1)
    // })
  }
}
