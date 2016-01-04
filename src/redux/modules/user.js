import storage from 'modules/utils/storage'
import {SESSION_LOGIN_SUCCESS} from './session'

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
  node: storage.getUser() || null,
}

/* eslint complexity:0 */
export default function userReducer(state = initialState, action) {
  let newState
  switch (action.type) {
    case USER_FETCH_REQUEST:
      newState = {
        ...state,
        isFetching: true,
        error: null,
      }
      break
    case USER_FETCH_SUCCESS:
      storage.setUser(action.response)
      newState = {
        ...state,
        isFetching: false,
        node: action.response,
      }
      break
    case USER_FETCH_FAILURE:
      newState = {
        ...state,
        isFetching: false,
        error: action.error,
      }
      break
    case USER_UPDATE_REQUEST:
      newState = {
        ...state,
        isUpdating: true,
        error: null,
      }
      break
    case USER_UPDATE_SUCCESS:
      storage.setUser(action.response)
      newState = {
        ...state,
        isUpdating: false,
        node: action.response,
      }
      break
    case USER_UPDATE_FAILURE:
      newState = {
        ...state,
        isUpdating: false,
        error: action.error,
      }
      break
    case SESSION_LOGIN_SUCCESS:
      newState = {
        ...state,
        node: action.payload.user,
      }
      break
    default:
      return state
  }

  storage.setUser(newState.node)

  return newState
}


