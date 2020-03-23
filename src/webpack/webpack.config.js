let webpack = require('webpack')

let FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

let LineLimitPlugin = require('./plugins/LineLimitPlugin')
let FunctionNamePlugin = require('./plugins/FunctionNamePlugin')
let TodoTaskPlugin = require('./plugins/TodoTaskPlugin')
let SetClickIdPlugin = require('./plugins/SetClickIdPlugin')
let FindModulePlugin = require('./plugins/FindModulePlugin')
let AutoExportColumn = require('./plugins/AutoExportColumn')

let config = {
  mode: 'development',
  devtool: 'source-map',
  context: __dirname,
  watch: true,
  entry: {
    index: './input/index.tsx'
  },
  resolve: {
    symlinks: false,
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  externals: {
    jquery: 'jQuery'
  },
  output: {
    path: __dirname + '/dist/',
    filename: '[name].output.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },
  plugins: [
    // new LineLimitPlugin(),
    // new FunctionNamePlugin(),
    // new TodoTaskPlugin(),
    new FriendlyErrorsPlugin(),
    new AutoExportColumn(),
    // new SetClickIdPlugin(),
    // new FindModulePlugin({subDir: ''})
  ]
}

module.exports = config
