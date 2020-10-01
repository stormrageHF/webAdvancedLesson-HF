class Compiler {
  constructor(vm) {
    this.el = vm.$el
    this.vm = vm
    this.compile(this.el)
  }

  // 编译模板，处理元素结点和文本结点
  compile(el) {
    Array.from(el.childNodes).forEach(node => {
      if (this.isTextNode(node)) {
        this.compileText(node)
      } else if (this.isElementNode(node)) {
        this.compileElement(node)
      }
      // 判断 node 结点是否有子节点，如果有子节点，需要递归
      if (node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }

  // 编译元素结点，处理指令
  compileElement(node) {
    // console.log(node.attributes);
    // 编译所有属性结点
    // 判断属性是否是指令
    Array.from(node.attributes).forEach(attr => {
      // 判断是否是 v- 指令
      let attrName = attr.name;
      if (this.isDirective(attrName)) {
        attrName = attrName.substr(2)
        let key = attr.value
        this.update(node, key, attrName)
      }
    })
  }
  // 这个设计模式方便处理其他指令，不需要 if 语句
  update(node, key, attrName) {
    // 获取函数
    let updateFn = this[attrName + 'Updater']
    // 判断函数存在以后，再执行
    updateFn && updateFn.call(this, node, this.vm[key], key)
  }

  // 处理 v-text
  textUpdater(node, value, key) {
    node.textContent = value
    // 创建watcher
    new Watcher(this.vm, key, newValue => {
      node.textContent = newValue
    })
  }

  // 处理 v-model
  modelUpdater(node, value, key) {
    node.value = value
    // 创建watcher
    new Watcher(this.vm, key, newValue => {
      node.value = newValue
    })
    // 双向绑定
    node.addEventListener('input', ()=>{
      this.vm[key] = node.value
    })
  }

  // 编译文本结点，处理差值表达式
  compileText(node) {
    // console.log(node);
    // console.dir(node);
    // {{ msg }}
    const reg = /\{\{(.+?)\}\}/
    const value = node.textContent
    if (reg.test(value)) {
      let key = RegExp.$1.trim()
      // node.textContent = this.vm[key]  // 这个是不对的应该部分替换
      node.textContent = value.replace(reg, this.vm[key])

      // 创建 watcher 
      new Watcher(this.vm, key, newValue => {
        node.textContent = value.replace(reg, newValue)
      })
    }
  }

  // 判断元素属性是否是指令
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }

  // 判断结点是否是元素结点
  isElementNode(node) {
    return node.nodeType === 1
  }

  // 判断节点是否是文本结点
  isTextNode(node) {
    return node.nodeType === 3
  }
}