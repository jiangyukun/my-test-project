module.exports = {
    entry: './entry.js',
    output: {
        path: __dirname,
        filename: 'build.js'
    },
    context: __dirname,
    mode: "development",
    devtool: 'source-map',
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     loader: 'babel-loader'
            // },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            }
        ]
    },
    externals: {
        jquery: 'jQuery'
    },
    //插件
    plugins: []
}
