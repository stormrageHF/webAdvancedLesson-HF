class Observer {
  constructor(data) {
    this.walk(data)
  }
  walk(data) {
    if (!data || typeof data !== 'object') {
      return
    }
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }
  defineReactive(data, key, val) {
    const that = this
    const dep = new Dep()
    // deep define
    that.walk(val)
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get() {
        // collect dep
        Dep.target && dep.addSub(Dep.target)
        return val
      },
      set(newValue) {
        if (val === newValue) {
          return
        }
        // 在赋值为新对象的时候，给新对象定义响应式属性
        that.walk(newValue) 
        val = newValue
        // notify update 
        dep.notify()
      }
    })
  }
}