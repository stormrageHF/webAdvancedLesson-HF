import diff from "./diff"

export default function updateComponent(virtualDOM, oldComponent, oldDom, container) {
  // 生命周期函数 将接受props
  oldComponent.componentWillReceiveProps(virtualDOM.props)
  // 生命周期函数 判断是否应该更新组件属性
  if (oldComponent.shouldComponentUpdate(virtualDOM.props)) {
    // 未更新的props
    let preProps = oldComponent.props
    // 生命周期函数 将更新属性
    oldComponent.componentWillUpdate(virtualDOM.props)
    // 更新属性
    oldComponent.updateProps(virtualDOM.props)
    // 调用render方法获取最新的 virtualDOM
    const nextVirtualDOM = oldComponent.render()
    // 新旧对比
    diff(nextVirtualDOM, container, oldDom)
    // 生命周期函数 已经更新
    oldComponent.componentDidUpdate(preProps)
  }
}