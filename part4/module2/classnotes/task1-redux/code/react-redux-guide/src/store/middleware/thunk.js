export default ({ dispatch }) => next => action => {
  if (typeof action === 'function') {
    // 异步
    return action(dispatch)
  }
  // 同步
  next(action)
}