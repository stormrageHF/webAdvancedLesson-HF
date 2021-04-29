import isFunction from './isFunction'
import isFunctionComponent from './isFunctionComponent'
import mountNativeElement from './mountNativeElement'

export default function mountComponent (virtualDOM, container, oldDom){
  // 判断是类组件 还是 函数组件 判断type的原型对象是否有 render 函数
  let nextVirtualDOM = null
  let component = null
  if(isFunctionComponent(virtualDOM)){ 
    // 函数组件
    nextVirtualDOM = buildFunctionComponent(virtualDOM)
  }else{
    // 类组件
    nextVirtualDOM = buildClassComponent(virtualDOM)
    component = nextVirtualDOM.component
  }
  if(isFunction(nextVirtualDOM)){ // 如果 nextVirtualDOM 还是个组件
    mountComponent(nextVirtualDOM, container, oldDom)
  }else{
    mountNativeElement(nextVirtualDOM, container, oldDom)
  }
  if(component) {
    component.componentDidMount()
    if(component.props && component.props.ref){
      component.props.ref(component)
    }
  }
}

function buildFunctionComponent(virtualDOM) {
  return virtualDOM.type(virtualDOM.props || {})
}

function buildClassComponent (virtualDOM) {
  // 虚拟dom 的 type 是类组件的构造方法
  const component = new virtualDOM.type(virtualDOM.props || {})
  const nextVirtualDOM = component.render()
  nextVirtualDOM.component = component
  return nextVirtualDOM
}
