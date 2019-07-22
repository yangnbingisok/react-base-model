const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',

  devtool: false,

  entry: {
    react: [
      'react',
      'react-dom',
      'react-router-dom',
      'prop-types',
      'react-fastclick',
      'classnames',
    ],
    common: ['axios'],
  },

  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'lib/[name]_[hash:4].dll.js',
    library: '[name]_[hash:4]',
  },

  performance: {
    hints: false,
    maxAssetSize: 300000, //单文件超过300k，命令行告警
    maxEntrypointSize: 300000, //首次加载文件总和超过300k，命令行告警
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        // 开启多线程并行
        parallel: true,
      }),
      // new OptimizeCSSAssetsPlugin()
    ],
  },

  plugins: [
    // new CleanWebpackPlugin(['dist'], {
    //     root: path.resolve(__dirname, '..')
    // }),
    new webpack.DllPlugin({
      context: __dirname,
      path: path.join(__dirname, '../dist/lib', '[name]-manifest.json'),
      name: '[name]_[hash:4]',
    }),
  ],
}
