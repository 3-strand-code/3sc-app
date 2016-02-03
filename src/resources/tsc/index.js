import axios from 'axios'
import _debug from 'debug/browser'
import localSync, { LS_KEYS } from './localSync'

const debug = _debug('app:tsc')

// ----------------------------------------------------
// TSC Client Config
// ----------------------------------------------------

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
}

const ENDPOINTS = {
  applicants: 'api/applicants/',
  assignments: 'api/assignments/',
  recipes: 'api/recipes/',
  passwordReset: '/rest-auth/password/reset/',
  passwordConfirm: '/rest-auth/password/reset/confirm/',
  passwordChange: '/rest-auth/password/change/',
  login: '/rest-auth/login/',
  logout: '/rest-auth/logout/',
  user: '/rest-auth/user/',
}

// ----------------------------------------------------
// AJAX - abstract away our ajax lib implementation
// ----------------------------------------------------

const ajax = axios.create({
  baseURL: 'https://threesc-api.herokuapp.com',
})
window.ajax = ajax

ajax.interceptors.request.use(config => {
  if (!localSync.get(LS_KEYS.authToken)) debug('No authToken found in local storage.')
  debug(`${config.method.toUpperCase()} ${config.url}`)

  config.headers = {
    ...DEFAULT_HEADERS,
    ...config.headers,
  }

  if (/^(HEAD|OPTIONS|TRACE)$/.test(config.method)) {
    config.headers.Authorization = `Key ${localSync.get(LS_KEYS.authToken)}`
  }

  return config
})

// ----------------------------------------------------
// Public API
// ----------------------------------------------------

const tsc = {

  //
  // top level
  //

  getCurrentUser: () => localSync.get(LS_KEYS.currentUser),
  isAuthenticated: () => !!localSync.get(LS_KEYS.authToken),

  login(username, password) {
    debug('login_request')
    return ajax.post(ENDPOINTS.login, { username, password })
      .then(res => {
        debug('login_success', res.data)
        localSync.set(LS_KEYS.authToken, res.data.key)
        debug('user_request', res)
        return ajax.get(ENDPOINTS.user)
      }, error => {
        debug('login_error', error)
        return error
      })
      .then(res => {
        debug('user_success', res.data)
        localSync.set(LS_KEYS.currentUser, res.data)
        return res
      }, err => {
        debug('user_error', err)
        return err
      })
  },
  logout: () => {
    localSync.clear()
    return Promise.resolve()
  },

  //
  // namespaces (resources/models)
  //

  applicants: {
    create: () => ajax.post(ENDPOINTS.applicants),
    get: (id) => ajax.get(ENDPOINTS.applicants, { paras: { id } })
      .then(res => debug('success', res))
      .catch(res => debug('error', res)),
  },

  // example namespace with CRUD and list methods
  users: {
    create: user => ajax.post(ENDPOINTS.users, user),
    get: id => ajax.get(ENDPOINTS.users, { params: { id } }),
    update: (id, user) => ajax.put(ENDPOINTS.users, user),
    delete: id => ajax.delete(ENDPOINTS.users, id),
    list: () => ajax.get(ENDPOINTS.users),
  },
}

window.tsc = tsc

export default tsc
