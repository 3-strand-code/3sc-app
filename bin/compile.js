/* eslint no-console:0 */
import _debug from 'debug'
import webpack from 'webpack'
import config from '../config'
import webpackConfig from '../build/webpack.config'

const debug = _debug('app:bin:compile')
const compiler = webpack(webpackConfig)

debug('Run webpack compiler.')
compiler.run((err, stats) => {
  const { errors, warnings } = stats.toJson()

  debug('Webpack compile completed.')
  console.log(stats.toString(config.compiler_stats))

  if (err) {
    debug('Webpack compiler encountered a fatal error.')
    console.log(err)
    process.exit(1)
  } else if (errors.length > 0) {
    debug('Webpack compiler encountered errors.')
    console.log(errors)
    process.exit(1)
  } else if (warnings.length > 0) {
    debug('Webpack compiler encountered warnings.')

    if (config.compiler_fail_on_warning) {
      process.exit(1)
    }
  }
})
