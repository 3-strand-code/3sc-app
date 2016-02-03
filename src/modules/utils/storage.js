import LocalSync from 'local-sync'
import keyMirror from 'keymirror'

// -----------------------------------
// Setup
// -----------------------------------

const KEYS = keyMirror({
  authToken: '',
  isAuthenticated: '',
  user: '',
})

const localSync = new LocalSync({
  prefix: 'tsc',
  bucket: 'app',
})

// -----------------------------------
// Public API
// -----------------------------------

const storage = {
  setAuthToken: (token) => localSync.set(KEYS.authToken, token),
  getAuthToken: () => localSync.get(KEYS.authToken),

  // TODO: why do we need a new key for this? this could just look if user//auth_token is defined??
  setIsAuthenticated: (isAuthenticated) => localSync.set(KEYS.isAuthenticated, isAuthenticated),
  getIsAuthenticated: () => localSync.get(KEYS.isAuthenticated),

  setUser: (user) => localSync.set(KEYS.user, user),
  getUser: () => localSync.get(KEYS.authToken),
}

export default storage
