let webpack = require('webpack')
let config = require('./webpack.config')

let compiler = webpack(config)

compiler.hooks.compilation.tap('TT', (compilation, {normalModuleFactory}) => {

    const handler = (parser) => {
        parser.hooks.program.tap('TT', ast => {
            // console.log(ast);
        })
    }

    normalModuleFactory.hooks.parser.for("javascript/auto").tap("TT", handler);
    normalModuleFactory.hooks.parser.for("javascript/dynamic").tap("TT", handler);
    normalModuleFactory.hooks.parser.for("javascript/esm").tap("TT", handler);
})

compiler.hooks.done.tap('TT', (stats)=> {
    console.log(stats);
})

compiler.run((err) => {
    console.error(err)
})
