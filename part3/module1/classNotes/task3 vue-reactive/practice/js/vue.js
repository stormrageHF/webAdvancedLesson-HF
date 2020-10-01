class Vue {
  constructor(options) {
    this.$options = options || {}
    this.$data = options.data || {}
    const el = options.el
    this.$el = typeof el === 'string' ? document.querySelector(el) : el
    // data inject instance
    this._proxyData(this.$data)
    // observer
    new Observer(this.$data)
    // compiler
    new Compiler(this)
  }
  _proxyData(data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return data[key]
        },
        set(newValue) {
          if (newValue === data[key]) {
            return
          }
          data[key] = newValue
        }
      })
    })
  }
}