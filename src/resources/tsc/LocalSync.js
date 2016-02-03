import LocalSync from 'local-sync'

export const LS_KEYS = {
  currentUser: 'currentUser',
  authToken: 'authToken',
}

const storage = new LocalSync({
  prefix: 'tsc',
  bucket: 'client',
})

export default storage
