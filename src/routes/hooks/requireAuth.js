import { makeDebugger } from 'utils/debug'
import tsc from 'resources/tsc'

const debug = makeDebugger('app:routes:hooks:require_auth')

const requireAuth = (location, replaceWith) => {
  if (tsc.isAuthenticated()) {
    debug('user is authenticated')
  } else {
    debug('user is not authenticated, redirect')
    replaceWith(null, '/login')
  }
}

export default requireAuth
