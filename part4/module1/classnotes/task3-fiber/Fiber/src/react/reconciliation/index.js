import { createTaskQueue, arrified, createStateNode, getTag, getRoot } from '../Misc'
import { updateNodeElement } from "../DOM"

const taskQueue = createTaskQueue()
let subTask = null
let pendingCommit = null

const commitAllWork = fiber => {
  /**
  * 循环 effets 数组 构建 DOM 节点树
  */
  fiber.effects.forEach(item => {
    if (item.tag === "class_component") {
      item.stateNode.__fiber = item
    }

    if (item.effectTag === "delete") {
      item.parent.stateNode.removeChild(item.stateNode)
    } else if (item.effectTag === "update") {
      /**
       * 更新
       */
      if (item.type === item.alternate.type) {
        /**
         *  节点类型相同
         */
        updateNodeElement(item.stateNode, item, item.alternate)
      } else {
        /**
         * 节点类型不同
         */
        item.parent.stateNode.replaceChild(
          item.stateNode,
          item.alternate.stateNode
        )
      }
    } else if (item.effectTag === "placement") {
      /**
       * 向页面中追加节点
       */
      /**
       * 当前要追加的子节点
       */
      let fiber = item
      /**
       * 当前要追加的子节点的父级
       */
      let parentFiber = item.parent
      /**
       * 找到普通节点父级 排除组件父级
       * 因为组件父级是不能直接追加真实DOM节点的
       */
      while (
        parentFiber.tag === "class_component" ||
        parentFiber.tag === "function_component"
      ) {
        parentFiber = parentFiber.parent
      }
      /**
       * 如果子节点是普通节点 找到父级 将子节点追加到父级中
       */
      if (fiber.tag === "host_component") {
        parentFiber.stateNode.appendChild(fiber.stateNode)
      }
    }
  })
  /**
   * 备份旧的 fiber 节点对象
   */
  fiber.stateNode.__rootFiberContainer = fiber
}

const getFirstTask = () => {
  /**
   * 从任务队列中获取任务
  */
  const task = taskQueue.pop()

  if (task.from === "class_component") {
    const root = getRoot(task.instance)
    task.instance.__fiber.partialState = task.partialState
    return {
      props: root.props,
      stateNode: root.stateNode,
      tag: "host_root",
      effects: [],
      child: null,
      alternate: root
    }
  }

  /**
   * 返回最外层节点的 fiber 对象
  */
  return {
    props: task.props,
    stateNode: task.dom,
    tag: 'host_root',
    effects: [],
    child: null,
    alternate: task.dom.__rootFiberContainer
  }
}

const reconcileChildren = (fiber, children) => {
  /**
  * children 可能对象 也可能是数组
  * 将children 转换成数组
  */
  const arrifiedChildren = arrified(children)
  /**
   * 循环 children 使用的索引
   */
  let index = 0
  /**
   * children 数组中元素的个数
   */
  let numberOfElements = arrifiedChildren.length
  /**
   * 循环过程中的循环项 就是子节点的 virtualDOM 对象
   */
  let element = null
  /**
   * 子级 fiber 对象
   */
  let newFiber = null
  /**
   * 上一个兄弟 fiber 对象
   */
  let prevFiber = null

  let alternate = null

  if (fiber.alternate && fiber.alternate.child) {
    alternate = fiber.alternate.child
  }

  while (index < numberOfElements || alternate) {
    element = arrifiedChildren[index]
    if (!element && alternate) {
      /**
       * 删除操作
       */
      alternate.effectTag = "delete"
      fiber.effects.push(alternate)
    } else if (element && alternate) {
      /**
       * 更新
       */
      newFiber = {
        type: element.type,
        props: element.props,
        tag: getTag(element),
        effects: [],
        effectTag: "update",
        parent: fiber,
        alternate
      }
      if (element.type === alternate.type) {
        /**
         * 类型相同
         */
        newFiber.stateNode = alternate.stateNode
      } else {
        /**
         * 类型不同
         */
        newFiber.stateNode = createStateNode(newFiber)
      }
    } else if (element && !alternate) {
      /**
       * 初始渲染
       */
      /**
       * 子级 fiber 对象
       */
      newFiber = {
        type: element.type,
        props: element.props,
        tag: getTag(element),
        effects: [],
        effectTag: "placement",
        parent: fiber
      }
      /**
       * 为fiber节点添加DOM对象或组件实例对象
       */
      newFiber.stateNode = createStateNode(newFiber)
    }

    if (index === 0) {
      fiber.child = newFiber
    } else if (element) {
      prevFiber.sibling = newFiber
    }

    if (alternate && alternate.sibling) {
      alternate = alternate.sibling
    } else {
      alternate = null
    }

    prevFiber = newFiber
    index++
  }
}

const executeTask = fiber => {
  /**
   * 构建子级fiber对象
   */
  if (fiber.tag === 'class_component') {
    if (fiber.stateNode.__fiber && fiber.stateNode.__fiber.partialState) {
      fiber.stateNode.state = {
        ...fiber.stateNode.state,
        ...fiber.stateNode.__fiber.partialState
      }
    }
    reconcileChildren(fiber, fiber.stateNode.render())
  } else if (fiber.tag === 'function_component') {
    reconcileChildren(fiber, fiber.stateNode(fiber.props))
  } else {
    reconcileChildren(fiber, fiber.props.children)
  }

  /**
   * 如果子级存在 返回子级
   * 将这个子级当做父级 构建这个父级下的子级
   */
  if (fiber.child) {
    return fiber.child
  }

  /**
   * 如果存在同级 返回同级 构建同级的子级
   * 如果同级不存在 返回到父级 看父级是否有同级
   */
  let currentExecutelyFiber = fiber
  while (currentExecutelyFiber.parent) {
    currentExecutelyFiber.parent.effects = currentExecutelyFiber.parent.effects.concat(
      currentExecutelyFiber.effects.concat([currentExecutelyFiber])
    )
    if (currentExecutelyFiber.sibling) {
      return currentExecutelyFiber.sibling
    }
    currentExecutelyFiber = currentExecutelyFiber.parent
  }
  pendingCommit = currentExecutelyFiber

  if (fiber.sibling) {
    return fiber.sibling
  }
}

const workLoop = deadline => {
  /**
   * 如果子任务不存在就去获取子任务
  */
  if (!subTask) {
    subTask = getFirstTask()
  }
  /**
   * 如果任务存在且浏览器有空闲
   * executeTask 方法执行任务 接受任务 返回新任务
   * 大于 1 毫秒 空闲
  */
  while (subTask && deadline.timeRemaining() > 1) {
    subTask = executeTask(subTask)
  }
  if (pendingCommit) {
    commitAllWork(pendingCommit)
  }
}

const performTask = deadline => {
  /**
   * 执行任务
  */
  workLoop(deadline)
  /**
   * 判断任务是否存在
   * 判断任务队列中是否还有任务没执行
   * 再一次通知浏览器空闲时执行下一个任务
  */
  if (subTask || !taskQueue.isEmpty()) {
    requestIdleCallback(performTask)
  }
}

export const render = (element, dom) => {
  /**
   * 1. 任务队列中添加任务
   * 2. 指定在浏览器空闲时执行任务
   */

  /**
   * 任务就是通过 vdom 对象构建 fiber 对象
   */
  taskQueue.push({
    dom,
    props: {
      children: element
    }
  })
  /**
   * 浏览器空闲时执行任务
  */
  requestIdleCallback(performTask)
}

export const scheduleUpdate = (instance, partialState) => {
  taskQueue.push({
    from: "class_component",
    instance,
    partialState
  })
  requestIdleCallback(performTask)
}