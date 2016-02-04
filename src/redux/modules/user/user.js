import { SESSION_LOGIN_SUCCESS } from './../session/session'

export const USER_FETCH_REQUEST = 'USER_FETCH_REQUEST'
export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS'
export const USER_FETCH_FAILURE = 'USER_FETCH_FAILURE'

export const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST'
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS'
export const USER_UPDATE_FAILURE = 'USER_UPDATE_FAILURE'

// ------------------------------------
// Action Creators
// ------------------------------------
export const updateUserRequest = () => ({
  type: USER_UPDATE_REQUEST,
})

export const updateUserSuccess = (id, user) => ({
  type: USER_UPDATE_SUCCESS,
  payload: {
    id,
  },
  response: user,
})

export const updateUserFailure = (error) => ({
  type: USER_UPDATE_FAILURE,
  error,
})

export const fetchUserRequest = () => ({
  type: USER_FETCH_REQUEST,
})

export const fetchUserSuccess = (id, user) => ({
  type: USER_FETCH_SUCCESS,
  payload: {
    id,
  },
  response: user,
})

export const fetchUserFailure = (error) => ({
  type: USER_FETCH_FAILURE,
  error,
})

// ------------------------------------
// Reducer Definition
// ------------------------------------

const initialState = {
  error: null,
  isFetching: false,
  isUpdating: false,
  node: null,
}

/* eslint complexity:0 */
export default function userReducer(state = initialState, action = {}) {
  const { error, payload, response, type } = action

  switch (type) {
    case USER_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
      }
    case USER_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        node: response,
      }
    case USER_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        error,
      }
    case USER_UPDATE_REQUEST:
      return {
        ...state,
        isUpdating: true,
        error: null,
      }
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        node: response,
      }
    case USER_UPDATE_FAILURE:
      return {
        ...state,
        isUpdating: false,
        error,
      }
    case SESSION_LOGIN_SUCCESS:
      return {
        ...state,
        node: payload.user,
      }
    default:
      return state
  }
}
