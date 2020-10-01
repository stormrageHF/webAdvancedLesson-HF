class Watcher {
  constructor(vm,key,cb){
    this.vm = vm
    this.cb = cb
    this.key = key
    Dep.target = this
    this.oldValue = vm[key]
    Dep.target = null
  }
  update(){
    const newValue = this.vm[this.key]
    if(this.oldValue === newValue){
      return
    }
    this.cb(newValue)
  }
}