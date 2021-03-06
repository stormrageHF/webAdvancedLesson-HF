class Observer {
  constructor(data) {
    this.walk(data)
  }
  walk(data) {
    // 判断 data 是不是对象
    if (!data || typeof data !== 'object') {
      return
    }
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }
  defineReactive(obj, key, val) {
    const that = this
    // 负责收集依赖并发送通知
    let dep = new Dep()
    that.walk(val) // val 是对象
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        // 收集依赖
        Dep.target && dep.addSub(Dep.target)
        return val
      },
      set(newValue) {
        if (newValue === val) {
          return
        }
        val = newValue
        that.walk(val) // 赋值一个新对象
        // 发送通知
        dep.notify()
      }
    })
  }
}