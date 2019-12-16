import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'
import reducer from './reducers'

const middleware = [...getDefaultMiddleware()]

const store = configureStore({
  reducer,
  middleware
})

export default store
