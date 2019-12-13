let webpack = require('webpack')

let FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

let LineLimitPlugin = require('./plugins/LineLimitPlugin')
let FunctionNamePlugin = require('./plugins/FunctionNamePlugin')
let TodoTaskPlugin = require('./plugins/TodoTaskPlugin')

let config = {
    mode: "development",
    devtool: "#source-map",
    context: __dirname,
    watch: true,
    entry: {
        index: './input/index.js'
    },
    resolve: {
        symlinks: false
    },
    externals: {
        jquery: 'jQuery'
    },
    output: {
        path: __dirname + '/dist/',
        filename: "[name].output.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [/node_modules/]
            }
        ]
    },
    plugins: [
        // new LineLimitPlugin(),
        new FunctionNamePlugin(),
        new TodoTaskPlugin(),
        new FriendlyErrorsPlugin(),

        new webpack.DefinePlugin({
            mode: JSON.stringify('dev')
        })

    ]
}

module.exports = config
