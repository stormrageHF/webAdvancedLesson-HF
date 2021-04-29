const createTaskQueue = () => {
  const taskQueue = []
  return {
    // 进队列
    push: item => taskQueue.push(item),
    // 出队列
    pop: () => taskQueue.shift(),
    /**
     * 判断任务队列中是否还有任务
     */
    isEmpty: () => taskQueue.length === 0
  }
}

export default createTaskQueue