class Observer {
  constructor(data){
    this.walk(data)
  }
  walk(data){
    if(!data || typeof data !== 'object'){
      return
    }
    Object.keys(data).forEach(key=>{
      this.defineReactive(data,key,data[key])
    })
  }
  defineReactive(data, key, value){
    let dep = new Dep()
    const that = this
    this.walk(value)
    Object.defineProperty(data, key, {
      enumerable:true,
      configurable:true,
      set(newValue){
        if(newValue === value){
          return
        }
        value = newValue
        that.walk(newValue)
        dep.notify()
      },
      get(){
        Dep.target && dep.addSub(Dep.target)
        return value
      }
    })
  }
}