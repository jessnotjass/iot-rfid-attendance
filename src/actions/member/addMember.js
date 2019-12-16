import { message } from 'antd'
import { createAction } from 'redux-starter-kit'
import { ADD_MEMBER } from '../constants'

export const addMember = values => {
  return async dispatch => {
    try {
      await fetch('http://localhost:3002/addMember', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify(values)
      })
      dispatch(createAction(ADD_MEMBER)(values))
      message.success('Successfully Added New Member', 5)
    } catch (error) {
      console.log(error.message)
      message.error(error.message, 5)
    }
  }
}
