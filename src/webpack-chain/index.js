let WebpackChain = require('webpack-chain')

let config = require('../webpack/webpack.config')

let chain = new WebpackChain()
chain.merge(config)
chain.externals({
    a: 'a'
})
console.log(chain.toConfig());
