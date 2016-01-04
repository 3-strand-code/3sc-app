/*-------------------------------------
[ NOTE ]
This server currently only uses webpack middleware to server
the React application for local development, it is *not*
intended for production usage. However, keeping it in ~/server
keeps the door open for potential future isomorphic functionality.
-------------------------------------*/
import express from 'express'
import webpack from 'webpack'
import WebpackDevMiddleware from 'webpack-dev-middleware'
import WebpackHotMiddleware from 'webpack-hot-middleware'
import historyApiFallback from 'connect-history-api-fallback'
import config from '../config'
import webpackConfig from '../build/webpack.config'

const paths = config.utils_paths
const app = express()

// TODO: remove this once once static assets are integrated
// into webpack build system
app.use(express.static(paths.src('assets')))
// ------------------------------------

app.use(historyApiFallback({
  verbose: false,
}))

const compiler = webpack(webpackConfig)
app.use(WebpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  contentBase: paths.base(config.dir_src),
  hot: true,
  quiet: false,
  noInfo: false,
  lazy: false,
  stats: config.compiler_stats,
}))
app.use(WebpackHotMiddleware(compiler))

export default app
