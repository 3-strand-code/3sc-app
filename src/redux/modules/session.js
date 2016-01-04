import storage from 'modules/utils/storage'

export const SESSION_LOGIN_REQUEST = 'SESSION_LOGIN_REQUEST'
export const SESSION_LOGIN_SUCCESS = 'SESSION_LOGIN_SUCCESS'
export const SESSION_LOGIN_FAILURE = 'SESSION_LOGIN_FAILURE'
export const SESSION_LOGOUT = 'SESSION_LOGOUT'

// ------------------------------------
// Action Creators
// ------------------------------------
export const loginRequest = () => ({
  type: SESSION_LOGIN_REQUEST,
})

export const loginSuccess = (token, user) => ({
  type: SESSION_LOGIN_SUCCESS,
  payload: {
    token,
    user,
  },
})

export const loginFailure = (error) => ({
  type: SESSION_LOGIN_FAILURE,
  error,
})

export const logout = () => ({
  type: SESSION_LOGOUT,
})

// ------------------------------------
// Reducer Definition
// ------------------------------------
// TODO: this should be rehydrated on initialization
const initialState = {
  authToken: null,
  error: null,
  hasPendingLogin: false,
  isAuthenticated: false,
  user: null,
}
export default function sessionReducer(state = initialState, action) {
  let newState
  // NOTE: these case statements would normally just return the new state
  // shape, but because we need to sync to local storage which is easier
  // to do using the "newState" pattern. See below note for more on this.
  switch (action.type) {
    case SESSION_LOGIN_REQUEST:
      newState = {
        ...state,
        hasPendingLogin: true,
        error: null,
      }
      break
    case SESSION_LOGIN_SUCCESS:
      newState = {
        ...state,
        hasPendingLogin: false,
        isAuthenticated: true,
        authToken: action.payload.token,
        user: action.payload.user,
      }
      break
    case SESSION_LOGIN_FAILURE:
      newState = {
        ...state,
        hasPendingLogin: false,
        error: action.error,
      }
      break
    case SESSION_LOGOUT:
      newState = {
        ...state,
        authToken: null,
        isAuthenticated: false,
        user: null,
      }
      break
    default:
      return state
  }

  // TODO: this will be handled by a store enhancer or middleware
  storage.setUser(newState.user)
  storage.setAuthToken(newState.authToken)
  storage.setIsAuthenticated(newState.isAuthenticated)

  return newState
}
