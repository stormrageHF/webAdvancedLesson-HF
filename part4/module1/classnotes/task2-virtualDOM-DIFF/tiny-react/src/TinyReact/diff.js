import createDOMElement from './createDOMElement'
import mountElement from './mountElement'
import updateNodeElement from './updateNodeElement'
import updateTextNode from './updateTextNode'
import unmountNode from './unmountNode'
import diffComponent from './diffComponent'

export default function diff(virtualDOM, container, oldDom) {
  const oldVirtualDOM = oldDom && oldDom._virtualDOM
  const oldComponent = oldVirtualDOM && oldVirtualDOM.component
  // oldDom 不存在
  if (!oldDom) {
    mountElement(virtualDOM, container)
  } else if (oldVirtualDOM && oldVirtualDOM.type === virtualDOM.type) {
    // 如果旧的和新得类型相同
    if (virtualDOM.type === 'text') {
      // 文本节点更新
      updateTextNode(virtualDOM, oldVirtualDOM, oldDom)
    } else {
      // 元素节点属性更新
      updateNodeElement(oldDom, virtualDOM, oldVirtualDOM)
    }

    // 1. 将拥有key属性的子元素放置在一个单独的对象中
    let keyedElements = {}
    for (let i = 0, len = oldDom.childNodes.length; i < len; i++) {
      let domElement = oldDom.childNodes[i]
      if (domElement.nodeType === 1) {
        // 必须是元素节点
        let key = domElement.getAttribute('key')
        if (key) {
          keyedElements[key] = domElement
        }
      }
    }

    let hasNoKey = Object.keys(keyedElements).length === 0
    if (hasNoKey) {
      // 对比子节点
      virtualDOM.children.forEach((child, i) => {
        diff(child, oldDom, oldDom.childNodes[i])
      })
    } else {
      // 2. 循环遍历 virtualDOM 的子元素，获取子元素的 key
      virtualDOM.children.forEach((child, i) => {
        let key = child.props.key
        if (key) {
          let domElement = keyedElements[key]
          if (domElement) {
            // 3. 看看当前位置的元素是不是我们期望的元素
            if (oldDom.childNodes[i] && oldDom.childNodes[i] !== domElement) {
              oldDom.insertBefore(domElement, oldDom.childNodes[i])
            }
          } else {
            // 新增元素
            mountElement(child, oldDom, oldDom.childNodes[i])
          }
        }
      })
    }


    // 删除节点
    const oldChildNodes = oldDom.childNodes
    // 旧节点数目大于新节点数目 
    if (oldChildNodes.length > virtualDOM.children.length) {
      if (hasNoKey) {
        // 需要删除最后多出来的节点
        for (let i = oldChildNodes.length - 1; i > virtualDOM.children.length - 1; i--) {
          unmountNode(oldChildNodes[i])
        }
      } else {
        // 按照key删除节点
        for (let i = 0; i < oldChildNodes.length; i++) {
          let oldChild = oldChildNodes[i]
          let oldChildKey = oldChild._virtualDOM.props.key
          let found = false
          // 判断新结点中是否存在这个key
          for (let n = 0; n < virtualDOM.children.length; n++) {
            if (oldChildKey === virtualDOM.children[n].props.key) {
              found = true
              break
            }
          }
          if (!found) {
            // 若不存在 则删除
            unmountNode(oldChild)
          }
        }

      }

    }
  } else if (oldVirtualDOM.type !== virtualDOM.type && typeof virtualDOM.type !== 'function') {
    // 两个节点类型不相同 创建新节点代替旧节点
    const newElement = createDOMElement(virtualDOM)
    oldDom.parentNode.replaceChild(newElement, oldDom)
  } else if (typeof virtualDOM.type === 'function') {
    // 是组件
    diffComponent(virtualDOM, oldComponent, oldDom, container)
  }
}