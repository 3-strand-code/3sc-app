import { argv } from 'yargs'
import _debug from 'debug'
import config from '../config'
import webpackConfig from './webpack.config'

const debug = _debug('karma')

const includePattern = (pattern) => ({
  pattern,
  watched: false,
  served: true,
  included: true,
})
const karmaConfig = {
  basePath: process.cwd(),
  files: [
    './node_modules/phantomjs-polyfill/bind-polyfill.js',
    includePattern(`./${config.dir_test}/test-bundler.js`),
  ],
  singleRun: !argv.watch,
  frameworks: ['mocha', 'chai-as-promised', 'chai-sinon', 'chai'],
  preprocessors: {
    [`${config.dir_test}/test-bundler.js`]: ['webpack'],
  },
  reporters: ['spec'],
  browsers: ['PhantomJS'],
  webpack: {
    devtool: 'cheap-eval-source-map',
    resolve: webpackConfig.resolve,
    plugins: webpackConfig.plugins
      .filter(plugin => !plugin.__KARMA_IGNORE__),
    module: {
      loaders: webpackConfig.module.loaders,
    },
    sassLoader: webpackConfig.sassLoader,
    postcss: webpackConfig.postcss,
  },
  webpackMiddleware: {
    noInfo: true,
  },
  coverageReporter: {
    reporters: config.coverage_reporters,
  },
}

if (config.coverage_enabled) {
  karmaConfig.reporters.push('coverage')
  karmaConfig.webpack.module.preLoaders = [{
    test: /\.js$/,
    include: config.utils_paths.base(config.dir_src),
    loader: 'isparta',
  }]
}

export default (cfg) => {
  debug('Create configuration.')
  cfg.set(karmaConfig)
}
