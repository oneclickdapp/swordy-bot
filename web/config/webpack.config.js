module.exports = (config, { env }) => {
  if (env === 'development') {
    // Add dev plugin
  }

  // Add custom rules for your project
  config.module.rules.push({
    test: /\.(md)$/i,
    use: [
      {
        loader: 'raw-loader',
      },
    ],
  })

  // Add custom plugins for your project
  // config.plugins.push(YOUR_PLUGIN)

  return config
}
