import { message } from 'antd'
import { createAction } from 'redux-starter-kit'
import { EDIT_MEMBER } from '../constants'

export const editMember = values => {
  return async (dispatch, getState) => {
    try {
      await fetch('http://localhost:3002/editMember', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify(values)
      })
      const {
        members: { current }
      } = getState()
      const diff = current.filter(e => e._id !== values._id)
      const payload = [...diff, values]
      dispatch(createAction(EDIT_MEMBER)(payload))
      message.success('Successfully Updated Member', 5)
    } catch (error) {
      console.log(error.message)
      message.error(error.message, 5)
    }
  }
}
