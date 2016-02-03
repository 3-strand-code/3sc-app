import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import session from './modules/session'
import user from './modules/user'

// combineReducers returns a function
export default combineReducers({
  router,
  session,
  user,
})
