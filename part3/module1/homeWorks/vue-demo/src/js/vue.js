class Vue {
  constructor(options){
    this.$options = options || {}
    this.$data = options.data || {}
    this.$methods = options.methods || {}
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
    this._proxyData(this.$data)
    // 方法注入实例
    this._proxyMethods(this.$methods)
    new Observer(this.$data)
    new Compiler(this)
  }
  _proxyData (data){
    Object.keys(data).forEach(key=>{
      Object.defineProperty(this,key, {
        enumerable: true,
        configurable: true,
        set(newValue){
          if(newValue === data[key]){
            return
          }
          data[key] = newValue
        },
        get(){
          return data[key]
        }
      })
    })
  }
  _proxyMethods(methods){
    Object.keys(methods).forEach(key=>{
      this[key] = methods[key]
    })
  }
}

