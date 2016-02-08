import tsc from '../resources/tsc'

import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutSuccess,
} from '../redux/modules/session/session'

export const login = (email, password) => {
  return (dispatch) => {
    dispatch(loginRequest())

    let token
    let user
    tsc.login(email, password)
      .then(res => {
        token = res.data.key
        return tsc.getCurrentUser()
      })
      .then(res => {
        user = res.data
        dispatch(loginSuccess(token, user))
      })
      .catch(err => {
        dispatch(loginFailure(err.data))
      })
  }
}

export const logout = () => {
  return (dispatch) => {
    tsc.logout()
      .then(res => dispatch(logoutSuccess()))
  }
}
