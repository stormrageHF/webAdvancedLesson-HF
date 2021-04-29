import mountElement from './mountElement'
import updateNodeElement from './updateNodeElement'

export default function createDOMElement (virtualDOM) {
  let newElement = null
  // 判断类型创建不同的真实dom
  if(virtualDOM.type === 'text'){
    // 文本结点
    newElement = document.createTextNode(virtualDOM.props.textContent)
  }else{
    // 元素节点
    newElement = document.createElement(virtualDOM.type)
    // 为元素节点添加属性
    updateNodeElement(newElement, virtualDOM)
  }
  // 属性绑定virtualDOM
  newElement._virtualDOM = virtualDOM
  // 递归创建
  virtualDOM.children.forEach(child => {
    mountElement(child, newElement)
  })
  // 处理 ref
  if(virtualDOM.props && virtualDOM.props.ref) {
    virtualDOM.props.ref(newElement)
  }
  return newElement
}