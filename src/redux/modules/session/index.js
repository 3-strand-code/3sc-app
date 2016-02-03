import tsc from 'resources/tsc'

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
  isAuthenticated: tsc.isAuthenticated(),
  user: tsc.getCurrentUser(),
}

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SESSION_LOGIN_REQUEST:
      return {
        ...state,
        hasPendingLogin: true,
        error: null,
      }
    case SESSION_LOGIN_SUCCESS:
      return {
        ...state,
        hasPendingLogin: false,
        isAuthenticated: true,
        authToken: action.payload.token,
        user: action.payload.user,
      }
    case SESSION_LOGIN_FAILURE:
      return {
        ...state,
        hasPendingLogin: false,
        error: action.error,
      }
    case SESSION_LOGOUT:
      return {
        ...state,
        authToken: null,
        isAuthenticated: false,
        user: null,
      }
    default:
      return state
  }
}

// ------------------------------------
// Selectors
// ------------------------------------
export const currentUser = (state) => {
  return state.user
}
