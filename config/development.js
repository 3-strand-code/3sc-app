export default (config) => {
  const overrides = {}

  // We use an explicit public path in development to resolve this issue:
  // http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
  if (config.compiler_enable_hmr) {
    overrides.compiler_public_path = (
      `http://${config.server_host}:${config.server_port}/`
    )
  }

  return overrides
}
