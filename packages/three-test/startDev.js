let path = require('path')
let webpack = require('webpack')
let webpackDevServer = require('webpack-dev-server')
let config = require('./webpack.config.js')

let compiler = webpack(config)

//init server
let app = new webpackDevServer(compiler, {
  publicPath: config.output.publicPath,
  contentBase: ['./public'],
  contentBasePublicPath: './static'
})


app.listen(3003, null, function(err) {
  if(err) {
    console.log(err)
  }
})

console.log('listen at http://localhost:3003')
