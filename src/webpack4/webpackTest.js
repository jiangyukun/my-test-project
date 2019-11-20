let webpack = require('webpack')
let config = require('./webpack.config')

let compiler = webpack(config)

compiler.hooks.compilation.tap('TT', (compilation, {normalModuleFactory}) => {
    // console.log(normalModuleFactory);

    const handler = (parser) => {
        console.log(1);
        parser.hooks.program.tap('TT', ast => {
            console.log(ast);
        })
    }

    normalModuleFactory.hooks.parser
        .for("javascript/auto")
        .tap("TT", handler);
    normalModuleFactory.hooks.parser
        .for("javascript/dynamic")
        .tap("TT", handler);
    normalModuleFactory.hooks.parser
        .for("javascript/esm")
        .tap("TT", handler);
})

compiler.run((err)=> {
    console.error(err)
})
