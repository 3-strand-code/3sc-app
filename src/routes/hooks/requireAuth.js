const requireAuth = (location, replaceWith) => {
  console.log('YOU HAVE NO AUTH SETUP YET :)') // eslint-disable-line
  const isAuthenticated = true

  if (!isAuthenticated) {
    replaceWith(null, '/login')
  }
}

export default requireAuth
