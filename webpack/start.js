const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const getDevConfig = require('./webpack.dev.config')
const pkg = require('../package.json')

const port = pkg.port || 4666

const options = {
  contentBase: path.join(__dirname, '../dist'),
  host: '0.0.0.0',
  stats: { colors: true },
  hot: true,
  noInfo: false,
  historyApiFallback: true,
  disableHostCheck: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'content-type',
  },
  proxy: {
    '/api': {
      target: 'http://10.19.117.252:11130',
      pathRewrite: { '^/api': '' },
      changeOrigin: true,
      historyApiFallback: true,
      secure: false,
    },
  },
}

const webpackConfig = getDevConfig()

WebpackDevServer.addDevServerEntrypoints(webpackConfig, options)

const compiler = webpack(webpackConfig)
const server = new WebpackDevServer(compiler, options)

server.listen(port, '0.0.0.0', err => {
  if (err) {
    console.error(err)
  }
  console.log('\n-------------\n')
  console.log(`http://127.0.0.1:${port}/index.html`)
})
