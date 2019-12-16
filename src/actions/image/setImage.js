import { SET_IMAGE } from '../constants'
import { createAction } from 'redux-starter-kit'

export const setImage = image => {
  return async dispatch => {
    dispatch(createAction(SET_IMAGE)(image))
  }
}
