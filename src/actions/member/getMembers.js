import { GET_MEMBERS } from '../constants'
import { createAction } from 'redux-starter-kit'

export const getMembers = values => {
  return async dispatch => {
    try {
      const res = await fetch('http://localhost:3002/getMembers', {
        method: 'GET'
      })
      const members = await res.json()
      dispatch(createAction(GET_MEMBERS)(members))
    } catch (error) {
      console.log(error.message)
    }
  }
}
