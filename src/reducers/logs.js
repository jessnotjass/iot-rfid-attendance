import {
  GET_LOGS,
  RESET_LOGS
} from '../actions/constants'

const initialState = {
  current: null
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case GET_LOGS:
      return {
        ...state,
        current: action.payload
      }
    case RESET_LOGS:
      return {
        ...initialState
      }
    default:
      return {
        ...state
      }
  }
}
