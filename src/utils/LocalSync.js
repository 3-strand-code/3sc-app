import LocalSync from 'local-sync'

export const LS_KEYS = {
  user: 'user',
  authToken: 'authToken',
}

const localSync = new LocalSync({
  prefix: 'tsc',
  bucket: 'app',
})

export default localSync
