
class Vue {
  constructor(options) {
    // 1. 通过属性保存选项数据
    this.$options = options || {}
    this.$data = options.data || {}
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
    // 2. 把 data 中的成员转换成getter/setter ，注入到实例
    this._proxyData(this.$data)
    // 3. 调用 Observer 对象，监听数据变化
    new Observer(this.$data)
    // 4. 调用 Compiler 对象，解析指令和差值表达式
    new Compiler(this)
  }
  _proxyData(data) {
    Object.keys(data).forEach(key => {
      // 注入实例 this 中
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        set(newValue) {
          if (newValue === data[key]) {
            return
          }
          data[key] = newValue
        },
        get() {
          return data[key]
        }
      })
    })
  }
}