class Watcher {
  constructor(vm, key, cb){
    this.vm = vm
    this.key = key
    this.cb = cb
    Dep.target = this
    // trigger getter , dep add watcher for current key
    this.oldValue = this.vm[this.key]
    // prevent repeat add 
    Dep.target = null
  }
  update(){
    const newValue = this.vm[this.key]
    if(newValue === this.oldValue){
      return
    }
    this.cb(newValue)
  }
}