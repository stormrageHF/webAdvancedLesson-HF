class Watcher {
  constructor(vm,key,cb){
    this.vm = vm
    this.key = key
    // 回调函数负责更新视图
    this.cb = cb
    
    // 把 watcher 对象记录到 Dep 静态属性
    Dep.target = this

    // 触发 get 方法在 get 方法中调用 addSub，记录当前值
    this.oldValue = vm[key]

    // 设置空，防止重复
    Dep.target = null
  }
  update(){
    let newValue = this.vm[this.key]
    if(this.oldValue === newValue) {
      return 
    }
    this.cb(newValue)
  }
}