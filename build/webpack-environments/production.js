import webpack from 'webpack'
import _debug from 'debug'
import config from '../../config'

const debug = _debug('app:webpack:production')

export default (webpackConfig) => {
  debug('Create configuration.')

  if (config.compiler_source_maps) {
    debug('Source maps enabled for production.')
    webpackConfig.devtool = 'source-map'
  } else {
    debug('Source maps are disabled in production.')
  }

  debug('Apply UglifyJS plugin.')
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        'unused': true,
        'dead_code': true,
      },
    })
  )

  return webpackConfig
}
