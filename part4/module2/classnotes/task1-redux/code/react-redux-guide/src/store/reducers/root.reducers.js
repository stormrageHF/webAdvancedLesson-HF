import { combineReducers } from 'redux'
import modalReducer from './modal.reducers'
import counterReducer from './counter.reducers'

export default combineReducers({
  counter: counterReducer,
  modal: modalReducer
})