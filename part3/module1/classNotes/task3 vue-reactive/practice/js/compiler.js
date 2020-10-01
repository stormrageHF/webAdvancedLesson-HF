class Compiler {
  constructor(vm) {
    this.el = vm.$el
    this.vm = vm
    this.compile(this.el)
  }
  compile(el) {
    const nodes = el.childNodes
    Array.from(nodes).forEach(node => {
      if (this.isTextNode(node)) {
        this.compileText(node)
      } else if (this.isElementNode(node)) {
        this.compileElement(node)
      }
      // deep recursion compile
      if (node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }
  compileElement(node) {
    Array.from(node.attributes).forEach(attr => {
      let attrName = attr.name
      if (this.isDirective(attrName)) {
        attrName = attrName.substr(2)
        const key = attr.value
        this.update(node, key, attrName)
      }
    })
  }
  update(node, key, attrName) {
    const updateFn = this[attrName + 'Updater']
    updateFn && updateFn.call(this, node, this.vm[key], key)
  }
  // v-text
  textUpdater(node, value, key) {
    node.textContent = value
    //
    new Watcher(this.vm, key, newValue => {
      node.textContent = newValue
    })
  }
  // v-model
  modelUpdater(node, value, key) {
    node.value = value
    //
    new Watcher(this.vm, key, newValue => {
      node.value = newValue
    })
    // 
    node.addEventListener('input', ()=>{
      this.vm[key] = node.value
    })
  }

  compileText(node) {
    const reg = /\{\{(.+?)\}\}/
    const value = node.textContent
    if (reg.test(value)) {
      const key = RegExp.$1.trim()
      node.textContent = value.replace(reg, this.vm[key])
      //
      new Watcher(this.vm, key, (newValue) => {
        node.textContent = value.replace(reg, newValue)
      })
    }
  }

  isDirective(attrName) {
    return attrName.startsWith('v-')
  }

  isTextNode(node) {
    return node.nodeType === 3 // text
  }

  isElementNode(node) {
    return node.nodeType === 1 // element
  }
}