import mountNativeElement from './mountNativeElement'
import isFunction from './isFunction'
import mountComponent from './mountComponent'

export default function mountElement (virtualDOM, container, oldDom) {
  // virtualDOM 判断是组件还是普通的虚拟dom，要做不同的处理
  // 函数组件和类组件类型都是函数
  if(isFunction(virtualDOM)){
    // Component
    mountComponent(virtualDOM, container, oldDom)
  }else{
    // Native Element
    mountNativeElement(virtualDOM, container, oldDom)
  }
}