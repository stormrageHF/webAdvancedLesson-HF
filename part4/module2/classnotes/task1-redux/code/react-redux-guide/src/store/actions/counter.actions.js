import { INCREMENT, DECREMENT, INCREMENT_ASYNC } from '../const/counter.const'
import { createAction } from 'redux-actions'
import { createStore } from 'redux'

// export const increment = payload => ({ type: INCREMENT, payload })
// export const decrement = payload => ({ type: DECREMENT, payload })

export const increment = createAction('increment')
export const decrement = createAction('decrement')

export const increment_async = payload => ({ type: INCREMENT_ASYNC, payload })
