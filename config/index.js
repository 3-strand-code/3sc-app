import _debug from 'debug'
import base from './_default'
const debug = _debug('app:config')

debug(`Apply environment overrides for NODE_ENV "${base.env}".`)
const config = Object.assign({}, base, require(`./${base.env}`)(base))

// Apply project-specific overrides
let projectOverrides
debug(`Apply project overrides from ~/build-overrides/config.`)
try {
  projectOverrides = require(`../build-overrides/config`)(config)
} catch (e) {
  debug('No project configuration overrides found.')
}

export default Object.assign({}, config, projectOverrides)
