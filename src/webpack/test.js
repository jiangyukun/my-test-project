let webpack = require('webpack')
let config = require('./webpack.config')

let compiler = webpack(config)

compiler.hooks.failed.tap('fail', (err)=> {
    console.log(err)
})


compiler.run((err) => {
    // console.log(err)
})
