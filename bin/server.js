import _debug from 'debug'
import config from '../config'
import server from '../server/main'

const debug = _debug('app:bin:server')

server.listen(config.server_port, config.server_host, () => {
  debug(`Server is now running at http://${config.server_host}:${config.server_port}`)
})
