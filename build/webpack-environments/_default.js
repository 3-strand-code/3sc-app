import _debug from 'debug'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import cssnano from 'cssnano'
import config from '../../config'

const paths = config.utils_paths
const debug = _debug('app:webpack:base')
debug('Create configuration.')

const webpackConfig = {
  name: 'client',
  target: 'web',
  entry: {
    app: [
      paths.src('main.js'),
    ],
    vendor: config.compiler_vendor,
  },
  output: {
    filename: `[name].[${config.compiler_hash_type}].js`,
    path: paths.base(config.dir_dist),
    publicPath: config.compiler_public_path,
  },
  plugins: [
    new webpack.DefinePlugin(config.compiler_globals),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      hash: false,
      template: paths.src('index.html'),
      inject: 'body',
      minify: {
        collapseWhitespace: true,
      },
    }),
  ],
  resolve: {
    root: paths.base(config.dir_src),
    alias: {},
    modulesDirectories: [
      'node_modules',
      '.',
    ],
  },
  module: {
    preLoaders: config.compiler_lint ? [{
      test: /\.js$/,
      loader: 'eslint',
      exclude: /node_modules/,
    }] : [],
    loaders: [
      {test: /\.json/, loader: 'json'},
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(stardust))/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          plugins: [
            // 'transform-runtime',
            'transform-decorators-legacy',
            'add-module-exports',
          ],
          presets: ['es2015', 'react', 'stage-1'],
        },
      },
      {
        test: /\.scss$/,
        loaders: [
          'style',
          [
            'css?sourceMap',
            'modules',
            'importLoaders=1',
            'localIdentName=[name]__[local]___[hash:base64:5]',
          ].join('&'),
          'postcss',
          'sass',
        ],
      },
    ],
  },
  externals: {
    // force everything to use the window jquery, that is where semantic-ui plugins are attached, not node_modules
    jquery: 'jQuery',
  },
  sassLoader: {
    includePaths: [
      paths.src('styles'),
    ],
  },
  postcss: [
    cssnano({
      sourcemap: true,
      autoprefixer: config.compiler_css_autoprefixer,
      discardComments: {
        removeAll: true,
      },
    }),
  ],
  eslint: {
    configFile: paths.base('.eslintrc'),
  },
}

// when we don't know the public path (we know it only when HMR is enabled) we
// need to use ExtractTextPlugin to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
if (!config.compiler_enable_hmr) {
  debug('Apply ExtractTextPlugin to CSS loaders.')
  webpackConfig.module.loaders.filter(loader =>
    loader.loaders && loader.loaders.find(name => /css/.test(name.split('?')[0]))
  ).forEach(loader => {
    const [first, ...rest] = loader.loaders
    loader.loader = ExtractTextPlugin.extract(first, rest.join('!'))
    delete loader.loaders
  })

  webpackConfig.plugins.push(
    new ExtractTextPlugin('[name].[contenthash].css', {
      allChunks: true,
    })
  )
}

// NOTE: this is a temporary workaround. I don't know how to get Karma
// to include the vendor bundle that webpack creates, so to get around that
// we remove the bundle splitting when webpack is used with Karma.
const commonChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
  names: ['vendor'],
})
commonChunkPlugin.__KARMA_IGNORE__ = true
webpackConfig.plugins.push(commonChunkPlugin)

export default webpackConfig
