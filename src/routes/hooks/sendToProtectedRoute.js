import tsc from 'resources/tsc'
import { makeDebugger } from 'utils/debug'
const debug = makeDebugger('app:routes:hooks:send_to_protected_route')

const sendToProtectedRoute = (location, replaceWith) => {
  if (tsc.isAuthenticated()) {
    debug('user is authenticated')
    replaceWith(null, '/dashboard')
  } else {
    debug('user is not authenticated')
  }
}

export default sendToProtectedRoute
