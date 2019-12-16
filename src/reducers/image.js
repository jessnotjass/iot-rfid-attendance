import {
  SET_IMAGE,
  RESET_IMAGE
} from '../actions/constants'

const initialState = {
  current: null
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case SET_IMAGE:
      return {
        ...state,
        current: action.payload
      }
    case RESET_IMAGE:
      return {
        ...state,
        current: null
      }
    default:
      return {
        ...state
      }
  }
}
