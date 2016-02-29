import axios from 'axios'
import _debug from 'debug/browser'

// TODO add local storage
// import localSync, { LS_KEYS } from './localSync'

const debug = _debug('app:tsc')

// ----------------------------------------------------
// Init
// ----------------------------------------------------
const tsc = {
  currentUser: null,
  authToken: null,
}

// ----------------------------------------------------
// TSC Client Config
// ----------------------------------------------------

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
}

const API_URL = 'https://threesc-api.herokuapp.com/'

const ENDPOINTS = {
  applicants: 'api/applicants/',
  assignments: 'api/assignments/',
  connectGithub: 'login/github/',
  recipes: 'api/recipes/',
  passwordReset: 'rest-auth/password/reset/',
  passwordConfirm: 'rest-auth/password/reset/confirm/',
  passwordChange: 'rest-auth/password/change/',
  login: 'rest-auth/login/',
  logout: 'rest-auth/logout/',
  user: 'rest-auth/user/',
}

// ----------------------------------------------------
// AJAX - abstract away our ajax lib implementation
// ----------------------------------------------------

const ajax = axios.create({
  baseURL: API_URL,
})

ajax.interceptors.request.use(config => {
  const { authToken } = tsc

  config.headers = {
    ...DEFAULT_HEADERS,
    ...config.headers,
  }

  // add auth token if present
  if (authToken) config.headers.Authorization = `Token ${authToken}`

  return config
})

// ----------------------------------------------------
// Top level API
// ----------------------------------------------------

tsc.isAuthenticated = () => !!tsc.authToken

tsc.getCurrentUser = () => {
  debug('get current user request')
  return ajax.get(ENDPOINTS.user)
    .then(res => {
      debug('get current user success')
      tsc.currentUser = res.data
      return res
    }, err => {
      debug('get current user error')
      return Promise.reject(err)
    })
}

tsc.login = (email, password) => {
  debug('login request')
  return ajax.post(ENDPOINTS.login, { email, password })
    .then(res => {
      debug('login success')
      tsc.authToken = res.data.key
      return res
    }, err => {
      debug('login error')
      return Promise.reject(err)
    })
}

tsc.logout = () => {
  tsc.currentUser = null
  tsc.authToken = null
  return Promise.resolve()
}

tsc.connectGithub = () => window.location = API_URL + ENDPOINTS.connectGithub

// ----------------------------------------------------
// Namespaces (resources/models)
// ----------------------------------------------------

tsc.applicants = {
  create: () => ajax.post(ENDPOINTS.applicants),
  get: (id) => ajax.get(ENDPOINTS.applicants, { paras: { id } }),
}

tsc.users = {
  create: user => ajax.post(ENDPOINTS.users, user),
  get: id => ajax.get(ENDPOINTS.users, { params: { id } }),
  update: (id, user) => ajax.put(ENDPOINTS.users, user),
  delete: id => ajax.delete(ENDPOINTS.users, id),
  list: () => ajax.get(ENDPOINTS.users),
}

export default tsc
