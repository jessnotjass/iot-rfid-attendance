import { GET_LOGS } from '../constants'
import { createAction } from 'redux-starter-kit'

export const getLogs = values => {
  return async dispatch => {
    try {
      const res = await fetch('http://localhost:3002/getLogs', {
        method: 'GET'
      })
      const logs = await res.json()
      dispatch(createAction(GET_LOGS)(logs))
    } catch (error) {
      console.log(error.message)
    }
  }
}
