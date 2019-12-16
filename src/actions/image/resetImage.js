import { RESET_IMAGE } from '../constants'
import { createAction } from 'redux-starter-kit'

export const resetImage = () => {
  return async dispatch => {
    dispatch(createAction(RESET_IMAGE)())
  }
}
