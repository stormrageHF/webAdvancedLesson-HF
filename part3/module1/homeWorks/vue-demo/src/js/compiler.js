class Compiler {
  constructor(Vue){
    this.vm = Vue
    this.el = Vue.$el
    this.compile(this.el)
  }
  compile(el){
    Array.from(el.childNodes).forEach(node=>{
      if(this.isElementNode(node)){
        this.compileElement(node)
      }else if(this.isTextNode(node)){
        this.compileText(node)
      }
      if(node.childNodes && node.childNodes.length){
        this.compile(node)
      }
    })

  }
  compileElement(node){
    Array.from(node.attributes).forEach(attr=>{
      let attrName = attr.name
      if(this.isDirective(attrName)){
        attrName = attrName.substr(2)
        const key = attr.value
        // on 
        if(attrName.startsWith('on')){
          this.updateON(node,key,attrName)
          return
        }
        this.update(key,node, attrName)
      }
    })
  }
  update(key,node,attrName){
    const updateFn =  this[attrName+'Updater']
    updateFn && updateFn.call(this, node, this.vm[key], key)
  }
  textUpdater(node,value,key){
    node.textContent = value

    new Watcher(this.vm, key, newValue => {
      node.textContent = newValue
    })
  }
  // v-html
  htmlUpdater (node, value, key) {
    node.innerHTML = value
    new Watcher(this.vm, key, newValue => {
      node.innerHTML = newValue
    })
  }
  modelUpdater (node,value,key){
    node.value = value
    new Watcher(this.vm, key, newValue => {
      node.value = newValue
    })
    node.addEventListener('input',()=>{
      this.vm[key] = node.value
    })
  }
  updateON(node,key,attrName){
    let eventType = null
    if(attrName.includes(':') && attrName.length > 2){
      const arr = attrName.split('.')
      eventType = arr[0].substr(3)
      this.onUpdater(node, key, eventType)
    }else{
      const keys = key.replace(/[\{|\}]/g,'').split(',')
      keys.forEach(key => {
        const arr =  key.split(':')
        this.onUpdater(node,arr[1], arr[0])
      })
    }
    
  }
  // v-on 
  onUpdater(node,key, eventType){
    node.addEventListener(eventType, e => this.vm[key](e))
  }
  compileText(node){
    const reg = /\{\{(.+?)\}\}/
    const value = node.textContent
    if(reg.test(value)){
      const key = RegExp.$1.trim()
      node.textContent = value.replace(reg, this.vm[key])
      new Watcher(this.vm, key, newValue => {
        node.textContent = value.replace(reg, newValue)
      })
    }
  }
  isDirective(attrName){
    return attrName.startsWith('v-')
  }
  isTextNode(node){
    return node.nodeType === 3
  }
  isElementNode(node){
    return node.nodeType === 1
  }
}