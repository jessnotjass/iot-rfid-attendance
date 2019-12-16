import { combineReducers } from 'redux'
import members from './members'
import image from './image'
import logs from './logs'

export default combineReducers({
  members,
  image,
  logs
})
