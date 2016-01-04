import _debug from 'debug'
import config from '../config'
import base from './webpack-environments/_default'
const debug = _debug('app:webpack:config')

// We use the current NODE_ENV to require the desired webpack configuration.
// Environment-specific configurations are provided a base configuration
// (found in ~/build/webpack-environments/_default) which they can then apply
// overrides to in order to achieve the desired functionality.
debug(`Apply environment overrides for "${config.env}".`)
const environmentWebpackConfig = require(`./webpack-environments/${config.env}`)(base)

debug('Apply project-specific overrides.')
let projectOverrides
try {
  projectOverrides = require('../build-overrides/webpack')(environmentWebpackConfig)
} catch (e) {
  debug('No project-specific overrides found.')
}

export default Object.assign({}, environmentWebpackConfig, projectOverrides)
