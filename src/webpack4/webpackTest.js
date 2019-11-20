let webpack = require('webpack')
let config = require('./webpack.config')

let compiler = webpack(config)

compiler.hooks.compilation.tap('TT', (compilation, {normalModuleFactory}) => {
    // console.log(normalModuleFactory);
    compilation.hooks.buildModule.tap('TT', (module) => {
        console.log('buildModule');
    })

    compilation.hooks.succeedModule.tap('TT', (module) => {
        console.log('succeedModule');
    })

    compilation.hooks.failedModule.tap('TT', (module) => {
        console.log('failedModule');
    })
    compilation.hooks.finishModules.tap('TT', (modules) => {
        console.log('finishModules');
    })

    const handler = (parser) => {
        parser.hooks.program.tap('TT', ast => {
            // console.log(ast);
        })
    }

    normalModuleFactory.hooks.parser.for("javascript/auto").tap("TT", handler);
    normalModuleFactory.hooks.parser.for("javascript/dynamic").tap("TT", handler);
    normalModuleFactory.hooks.parser.for("javascript/esm").tap("TT", handler);
})

compiler.run((err) => {
    console.error(err)
})
