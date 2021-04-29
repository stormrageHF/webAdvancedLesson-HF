import mountElement from "./mountElement";
import updateComponent from './updateComponent'

export default function diffComponent(virtualDOM, oldComponent, oldDom, container) {
  // 判断新旧组件是否是同一个组件
  if (isSameComponent(virtualDOM, oldComponent)) {
    // 是 更新
    updateComponent(virtualDOM, oldComponent, oldDom, container)
  } else {
    // 否 直接渲染最新的替换旧的
    mountElement(virtualDOM, container, oldDom)
  }
}

function isSameComponent(virtualDOM, oldComponent) {
  // 判断他们的构造函数是否相同
  return oldComponent && virtualDOM.type === oldComponent.constructor
}