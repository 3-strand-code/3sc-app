import tsc from 'resources/tsc'

import {
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
} from 'redux/modules/user'

export const update = (id, userData) => {
  return (dispatch) => {
    dispatch(updateUserRequest())

    tsc.users.update(id, userData)
      .then(
        (user) => dispatch(updateUserSuccess(id, user)),
        (error) => dispatch(updateUserFailure(error))
      )
  }
}

export const get = (id) => {
  return (dispatch) => {
    dispatch(fetchUserRequest())

    tsc.users.get(id)
      .then(
        (user) => dispatch(fetchUserSuccess(id, user)),
        (error) => dispatch(fetchUserFailure(error))
      )
  }
}
