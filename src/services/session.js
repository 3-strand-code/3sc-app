import tsc from '../resources/tsc'

import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from '../redux/modules/session'

export const login = (email, password) => {
  return (dispatch) => {
    dispatch(loginRequest())

    tsc.login(email, password)
      .then(
        ({ key, user }) => dispatch(loginSuccess(key, user)),
        (error) => dispatch(loginFailure(error)))
  }
}
