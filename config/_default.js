import path from 'path'
import { argv } from 'yargs'
import pkg from '../package.json'

const env = process.env.NODE_ENV || 'development'
const __DEV__ = env === 'development'
const __PROD__ = env === 'production'

const basePath = path.resolve(__dirname, '../')
const fromBase = (relativePath) => path.resolve(basePath, relativePath)

const config = {
  env,

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base: path.resolve(__dirname, '../'),
  dir_src: 'src',
  dir_dist: 'dist',
  dir_server: 'server',
  dir_test: 'test',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host: 'localhost',
  server_port: process.env.PORT || 8080,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_css_modules: false,
  compiler_enable_hmr: !!argv.hot,
  compiler_source_maps: true,
  compiler_hash_type: 'hash',
  compiler_inline_manifest: false,
  compiler_fail_on_warning: false,
  compiler_lint: argv.lint !== false,
  compiler_quiet: false,
  compiler_public_path: '/',
  compiler_vendor: Object.keys(pkg.dependencies),
  compiler_stats: {
    chunks: false,
    chunkModules: false,
    colors: true,
  },
  compiler_globals: {
    'process.env': {
      NODE_ENV: JSON.stringify(env),
    },
    __DEV__,
    __DEBUG__: __DEV__ && argv.debug !== false,
    __PROD__,
  },
  compiler_css_autoprefixer: {
    add: true,
    remove: true,
    browsers: ['last 2 versions'],
  },
  compiler_local_projects: {
    stardust: {
      enabled: !!argv['local-stardust'],
      path: fromBase('../stardust/src/index'),
    },
  },


  // ----------------------------------
  // Test Configuration
  // ----------------------------------
  coverage_enabled: !!argv.coverage,
  coverage_reporters: [
    {
      type: 'text-summary',
    },
    {
      type: 'html',
      dir: 'coverage',
    },
  ],
}

// ------------------------------------
// Utilities
// ------------------------------------
config.utils_paths = (() => {
  const resolve = path.resolve
  const base = (...args) =>
    resolve.apply(resolve, [config.path_base, ...args])

  return {
    base,
    src: base.bind(null, config.dir_src),
    dist: base.bind(null, config.dir_dist),
  }
})()

export default config
