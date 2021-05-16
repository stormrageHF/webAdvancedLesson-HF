import { HIDEMODAL, SHOWMODAL } from '../const/modal.const'

const initialState = {
  showState: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOWMODAL:
      return {
        ...state,
        showState: true
      }
    case HIDEMODAL:
      return {
        ...state,
        showState: false
      }
    default:
      return state
  }
}