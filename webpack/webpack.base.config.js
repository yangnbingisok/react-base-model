const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const { resolve } = require('./utils')

const devMode = process.env.NODE_ENV === 'development'
const getCssLoader = enableCssModule => {
  const cssLoaders = [
    { loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader },
    {
      loader: 'css-loader',
      options: enableCssModule
        ? {
          modules: true,
          importLoaders: 1,
          localIdentName: devMode
            ? '[path]_[name]__[local]___[hash:base64:8]'
            : '[hash:base64:8]',
        }
        : {
          modules: false,
        },
    },
  ]

  const extLoaders = [
    {
      loader: 'postcss-loader',
      options: {
        config: {
          path: path.join(__dirname, '../webpack/postcss.config.js'),
        },
      },
    },
  ]

  return enableCssModule ? cssLoaders : cssLoaders.concat(extLoaders)
}

const lessLoaderConfig = {
  loader: 'less-loader',
  options: {
    modifyVars: {
      'primary-color': '#1880E7',
      'link-color': '#1880E7',
      'border-radius-base': '2px',
    },
    javascriptEnabled: true,
  },
}

const lessLoader = getCssLoader(true).concat(lessLoaderConfig)

const antLessLoader = getCssLoader().concat(lessLoaderConfig)

// , isCDN = 'no'
function getCommonConfig() {
  const plugins = [
    new CleanWebpackPlugin(
      ['dist/app', 'dist/assets', 'dist/preview', 'dist/index.html', 'dist/preview.html'],
      {
        root: path.resolve(__dirname, '..'),
      }
    ),
    new MiniCssExtractPlugin({
      filename: '[name]/css/main.[hash:4].css',
      chunkFilename: '[name]/css/chunk.[id].[hash:4].css',
    }),
    // new webpack.NoEmitOnErrorsPlugin(),

    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(zh-cn)$/),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['app'],
      template: 'src/index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'preview.html',
      chunks: ['preview'],
      template: 'src/index.html',
    }),
  ]

  return {
    entry: {
      app: './src/index.js',
      preview: './src/preview.js',
    },

    output: {
      path: resolve('dist/'),
      publicPath: '',
      filename: '[name]/js/main.[hash:4].js',
      chunkFilename: '[name]/js/chunk.[id].[hash:4].js',
    },

    resolve: {
      alias: {
        '@': resolve('src'),
        mixin: resolve('src/mixin.less'),
      },
      extensions: ['*', '.js', '.jsx'],
    },

    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.(js|jsx)$/,
          include: resolve('src'),
          exclude: resolve('node_modules'),
          loader: 'eslint-loader',
        },
        {
          test: /\.(js|jsx)$/,
          include: [resolve('src')],
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          include: [resolve('node_modules/normalize.css')],
          use: getCssLoader(),
        },
        {
          test: /\.css$/,
          include: [resolve('src')],
          use: getCssLoader(true),
        },
        {
          test: /\.less$/,
          include: [resolve('node_modules/antd')],
          use: antLessLoader,
        },
        {
          test: /\.less$/,
          include: [resolve('src')],
          use: lessLoader,
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'assets/img/[name].[hash:4].[ext]',
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'file-loader',
          options: {
            limit: 8192,
            name: 'assets/fonts/[name].[hash:4].[ext]',
          },
        },
        {
          test: /\.(ogg|mp3|wav|mpe?g)$/i,
          loader: 'file-loader',
          options: {
            name: 'assets/video/[name].[hash:4].[ext]',
          },
        },
      ],
    },

    plugins,
  }
}

module.exports = getCommonConfig
