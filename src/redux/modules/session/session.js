export const SESSION_LOGIN_REQUEST = 'SESSION_LOGIN_REQUEST'
export const SESSION_LOGIN_SUCCESS = 'SESSION_LOGIN_SUCCESS'
export const SESSION_LOGIN_FAILURE = 'SESSION_LOGIN_FAILURE'
export const SESSION_LOGOUT_SUCCESS = 'SESSION_LOGOUT_SUCCESS'

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

export const logoutSuccess = () => ({
  type: SESSION_LOGOUT_SUCCESS,
})

// ------------------------------------
// Reducer Definition
// ------------------------------------
const initialState = {
  authToken: null,
  error: null,
  hasPendingLogin: false,
  isAuthenticated: false,
  user: null,
}

export default function sessionReducer(state = initialState, action = {}) {
  const { error, payload, type } = action

  switch (type) {
    case SESSION_LOGIN_REQUEST:
      console.log('SESSION_LOGIN_REQUEST')
      return {
        ...state,
        hasPendingLogin: true,
        error: null,
      }
    case SESSION_LOGIN_SUCCESS:
      console.log('SESSION_LOGIN_SUCCESS')
      return {
        ...state,
        hasPendingLogin: false,
        isAuthenticated: true,
        authToken: payload.token,
        user: payload.user,
      }
    case SESSION_LOGIN_FAILURE:
      return {
        ...state,
        hasPendingLogin: false,
        error,
      }
    case SESSION_LOGOUT_SUCCESS:
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
