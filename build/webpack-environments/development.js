import webpack from 'webpack'
import _debug from 'debug'
import config from '../../config'

const debug = _debug('app:webpack:development')

export default (webpackConfig) => {
  debug('Create configuration.')

  webpackConfig.devtool = 'source-map'

  // ------------------------------------
  // Enable HMR if Requested
  // ------------------------------------
  if (config.compiler_enable_hmr) {
    debug('Enable Hot Module Replacement (HMR).')
    webpackConfig.entry.app.push(
      'webpack-hot-middleware/client?path=/__webpack_hmr'
    )

    webpackConfig.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    )

    debug('Override devtool with cheap-module-eval-source-map.')
    webpackConfig.devtool = 'cheap-module-eval-source-map'

    // Only emit warnings for eslint since we're in live development
    webpackConfig.eslint.emitWarning = true

    // We need to apply the react-transform HMR plugin to the Babel configuration,
    // but _only_ when HMR is enabled. Putting this in the default development
    // configuration or in .babelrc will break any babel transpiliations
    // where NODE_ENV=development and module.hot (from webpack) is disabled.
    webpackConfig.module.loaders = webpackConfig.module.loaders.map(loader => {
      if (
        /babel/.test(loader.loader) &&
        !~loader.query.presets.indexOf('react-hmre')
      ) {
        debug('Apply react-transform-hmre preset.')
        loader.query.presets.push('react-hmre')
      }

      return loader
    })
  }

  return webpackConfig
}
