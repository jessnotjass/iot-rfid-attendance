import {
  ADD_MEMBER,
  GET_MEMBERS,
  EDIT_MEMBER,
  DELETE_MEMBER
} from '../actions/constants'

const initialState = {
  current: null
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case ADD_MEMBER:
      return {
        ...state,
        current: [...state.current, action.payload]
      }
    case GET_MEMBERS:
      return {
        ...state,
        current: action.payload
      }
    case EDIT_MEMBER:
      return {
        ...state,
        current: action.payload
      }
    case DELETE_MEMBER:
      return {
        ...state,
        current: action.payload
      }
    default:
      return {
        ...state
      }
  }
}
