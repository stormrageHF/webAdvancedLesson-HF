export default function unmountNode(node) {

  const virtualDOM = node._virtualDOM

  // 1. 文本节点直接删除
  if (virtualDOM.type === 'text') {
    node.remove()
    return
  }

  // 2. 节点是否由组件生成
  let component = virtualDOM.component
  if (component) {
    component.componentWillUnmount()
  }

  // 3. 是否有 ref 属性
  if (virtualDOM.props && virtualDOM.props.ref) {
    virtualDOM.props.ref(null)
  }

  // 4. 属性中是否有事件
  Object.keys(virtualDOM.props).forEach(propName => {
    if (propName.slice(0, 2) === 'on') {
      const eventName = propName.toLowerCase().slice(2)
      const eventHandler = virtualDOM.props[propName]
      node.removeEventListener(eventName, eventHandler)
    }
  })

  // 5. 递归删除子节点
  if (node.childNodes.length > 0) {
    for (let i = 0; i < node.childNodes.length; i++) {
      unmountNode(node.childNodes[i])
      i--
    }
  }

  // 删除当前节点
  node.remove()
}