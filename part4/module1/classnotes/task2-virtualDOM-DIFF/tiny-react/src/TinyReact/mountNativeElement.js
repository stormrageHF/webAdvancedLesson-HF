import createDOMElement from './createDOMElement'
import unmountNode from './unmountNode'

export default function mountNativeElement (virtualDOM, container, oldDom) {
  
  // 创建真实dom
  let newElement = createDOMElement(virtualDOM)

  // 将转换后的元素放置在页面中
  if(oldDom) {
    container.insertBefore(newElement, oldDom)
  }else{
    container.appendChild(newElement)
  }

   // 判断旧dom是否存在 存在则删除
   if(oldDom) {
    unmountNode(oldDom)
  }
  
  // 获取类组件实例对象
  const component = virtualDOM.component
  // 如果存在
  if(component) {
    // 将 dom 对象存储在类实例中
    component.setDom(newElement)
  }
}