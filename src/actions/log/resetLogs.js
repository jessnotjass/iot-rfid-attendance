import { message } from 'antd'
import { createAction } from 'redux-starter-kit'
import { RESET_LOGS } from '../constants'

export const resetLogs = () => {
  return async dispatch => {
    try {
      await fetch('http://localhost:3002/resetLogs', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors'
      })
      dispatch(createAction(RESET_LOGS)())
      message.success('Successfully Reset Logs.', 5)
    } catch (error) {
      console.log(error.message)
      message.error(error.message, 5)
    }
  }
}
