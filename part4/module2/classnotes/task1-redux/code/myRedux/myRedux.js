
function createStore(reducer, preloadedState, enhancer) {
  if (typeof reducer !== 'function') {
    throw new Error('reducer must be function')
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') throw new Error('enhancer must be function')
    return enhancer(createStore)(reducer, preloadedState)
  }

  var currentState = preloadedState
  var currentListeners = []

  function getState() {
    return currentState
  }

  function dispatch(action) {
    if (!isPlainObject(action)) throw new Error('action must be object')
    if (typeof action.type === 'undefined') throw new Error('action must have type')
    currentState = reducer(currentState, action)
    currentListeners.map(listener => {
      listener()
    })
  }

  function subscribe(listener) {
    currentListeners.push(listener)
  }
  return {
    getState,
    dispatch,
    subscribe
  }
}

function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false
  // 区分数组和对象
  let proto = obj
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }
  return Object.getPrototypeOf(obj) === proto
}

function applyMiddleware(...middlewares) {
  return function (createStore) {
    return function (reducer, preloadedState) {

      const store = createStore(reducer, preloadedState)

      const middlewareApi = {
        getState: store.getState,
        dispatch: store.dispatch
      }

      const chain = middlewares.map(middle => middle(middlewareApi))

      const dispatch = compose(...chain)(store.dispatch)

      return {
        ...store,
        dispatch
      }
    }
  }
}

function compose() {
  const funcs = [...arguments]
  return function (dispatch) {
    for (let i = funcs.length - 1; i >= 0; i--) {
      dispatch = funcs[i](dispatch)
    }
    return dispatch
  }
}

function bindActionCreators(actionCreators, dispatch) {
  const boundActionCreators = {}
  for (let key in actionCreators) {
    boundActionCreators[key] = function () {
      dispatch(actionCreators[key]())
    }
  }
  return boundActionCreators
}

function combineReducers(reducers) {
  const keys = Object.keys(reducers)
  keys.forEach(key => {
    if (typeof reducers[key] !== 'function') throw new Error('reducer must be a function')
  })

  return function (state, action) {
    const nextState = {}
    keys.forEach(key => {
      const reducer = reducers[key]
      const previousStateForKey = state[key]
      nextState[key] = reducer(previousStateForKey, action)
    })
    return nextState
  }
}

// console.log(isPlainObject([]));