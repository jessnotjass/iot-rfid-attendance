import { message } from 'antd'
import { createAction } from 'redux-starter-kit'
import { DELETE_MEMBER } from '../constants'

export const deleteMember = values => {
  return async (dispatch, getState) => {
    try {
      await fetch('http://localhost:3002/deleteMember', {
        method: 'DELETE',
        body: values
      })
      const {
        members: { current }
      } = getState()
      const payload = current.filter(member => member !== values)
      dispatch(createAction(DELETE_MEMBER)(payload))
      message.success('Successfully Deleted Member.', 5)
    } catch (error) {
      console.log(error.message)
    }
  }
}
