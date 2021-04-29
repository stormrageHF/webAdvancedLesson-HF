export default function updateNodeElement(newElement, virtualDOM, oldVirtualDOM = {}) {
  const newProps = virtualDOM.props || {}
  const oldProps = oldVirtualDOM.props || {}
  // 遍历分情况讨论属性
  // 更新属性
  Object.keys(newProps).forEach(propName => {
    // 获取属性值
    const newPropsValue = newProps[propName]
    const oldPropsValue = oldProps[propName]
    if (newPropsValue !== oldPropsValue) {
      // 事件属性
      if (propName.slice(0, 2) === 'on') {
        // 获取事件名称
        const eventName = propName.toLowerCase().slice(2)
        // 添加事件监听
        newElement.addEventListener(eventName, newPropsValue)
        // 删除原有事件
        if (oldPropsValue) {
          newElement.removeEventListener(eventName, oldPropsValue)
        }
      } else if (propName === 'value' || propName === 'checked') {
        // input 的处理
        newElement[propName] = newPropsValue
      } else if (propName !== 'children') {
        // class
        if (propName === 'className') {
          newElement.setAttribute('class', newPropsValue)
        } else {
          // 自定义属性
          newElement.setAttribute(propName, newPropsValue)
        }
      }
    }
  })
  // 删除已经没有的属性
  Object.keys(oldProps).forEach(propName => {
    const newPropsValue = newProps[propName]
    const oldPropsValue = oldProps[propName]
    if(!newPropsValue) {
      // 删除属性
      // 也要判断是什么属性 事件？ 还是正常属性
      if(propName.slice(0,2) === 'on') {
        const eventName = propName.toLowerCase().slice(2)
        newElement.removeEventListener(eventName, oldPropsValue)
      }else if(propName !== 'children'){
        // 非事件属性 还不能是 children
        newElement.removeAttribute(propName)
      }
    }
  })
}