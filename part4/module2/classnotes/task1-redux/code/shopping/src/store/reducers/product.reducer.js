import { handleActions as createReducer } from 'redux-actions'
import { saveProducts } from '../actions/product.actions'

const initialState = []

const handleSaveProducts = (state, action) => {
  return action.payload
}

export default createReducer({
  [saveProducts]: handleSaveProducts
}, initialState)

