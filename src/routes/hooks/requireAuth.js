import tsc from 'resources/tsc'

const requireAuth = (location, replaceWith) => {
  if (!tsc.isAuthenticated()) {
    replaceWith(null, '/login')
  }
}

export default requireAuth
