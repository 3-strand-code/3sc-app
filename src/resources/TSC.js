import _debug from 'debug'
import axios from 'axios'
import keyMirror from 'keymirror'
import LocalSync from 'local-sync'

const debug = _debug('tsc')

// ----------------------------------------------------
// Storage
// ----------------------------------------------------

// tsc client uses it's own bucket in storage for reusability
const localSync = new LocalSync({
  prefix: 'tsc',
  bucket: 'client',
})

const LS_KEYS = keyMirror({
  user: '',
  authToken: '',
})

// do not use localSync directly anywhere else in this file
// this is the storage abstraction we use
// once the tsc client is in it's own repo, storage would be its own module
const storage = {
  getAuthToken: () => localSync.get(LS_KEYS.authToken),
  setAuthToken: (token) => localSync.set(LS_KEYS.authToken, token),
  clear: () => localSync.clear(),
}

// ----------------------------------------------------
// TSC Client Config
// ----------------------------------------------------

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
}

const ENDPOINTS = {
  applications: 'api/applications/',
  login: 'rest-auth/login/',
  logout: 'TODO',
  users: 'TODO',
}

// ----------------------------------------------------
// AJAX - abstract away our ajax lib implementation
// ----------------------------------------------------

const ajax = axios.create({
  baseURL: 'https://threesc-api.herokuapp.com',
})
window.ajax = ajax

ajax.interceptors.request.use(config => {
  if (!storage.getAuthToken()) debug('No authToken found in local storage.')

  config.headers = {
    ...DEFAULT_HEADERS,
    ...config.headers,
  }

  if (/^(HEAD|OPTIONS|TRACE)$/.test(config.method)) {
    config.headers.Authorization = `Key ${storage.getAuthToken()}`
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

  getCurrentUser: () => storage.getUser(),
  isAuthenticated: () => !!storage.getAuthToken,

  login(username, password) {
    return ajax.post(ENDPOINTS.login, {username, password})
      .then(({data}) => {
        debug('logged in', data.key)
        storage.setAuthToken(data.key)
        return data
      })
      .catch(error => debug(error))
  },
  logout: () => {
    storage.clear()
    return Promise.resolve()
  },

  //
  // namespaces (resources/models)
  //

  applications: {
    create: () => ajax.post(ENDPOINTS.applications),
    get: (id) => ajax.get(ENDPOINTS.applications, {paras: {id}})
      .then(res => debug('success', res))
      .catch(res => debug('error', res)),
  },

  // example namespace with CRUD and list methods
  users: {
    create: user => ajax.post(ENDPOINTS.users, user),
    get: id => ajax.get(ENDPOINTS.users, {params: {id}}),
    update: (id, user) => ajax.put(ENDPOINTS.users, user),
    delete: id => ajax.delete(ENDPOINTS.users, id),
    list: () => ajax.get(ENDPOINTS.users),
  },
}

window.tsc = tsc

export default tsc
