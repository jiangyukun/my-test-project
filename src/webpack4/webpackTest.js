let fs = require('fs')
let webpack = require('webpack')
let config = require('./webpack.config')

let compiler = webpack(config)

compiler.hooks.compilation.tap('TT', (compilation, {normalModuleFactory}) => {
    let moduleName = ''
    const handler = (parser) => {
        parser.hooks.program.tap('TT', (ast, comments) => {
            if (moduleName.indexOf('node_modules') != -1) {
                return
            }
            if (ast.loc.end.line > 3) {
                // console.log(moduleName, ', 超过了3行,', ast.loc.end.line)
            }
        })
    }

    compilation.hooks.buildModule.tap('TT', (module) => {
        if (module.userRequest.indexOf('node_modules') != -1) {
            return
        }
        fs.readFile(module.userRequest, (err, buffer) => {
            if (err) {
                return
            }
            let code = buffer.toString()
            let codeLine = code.split('\n').length
            if (codeLine > 300) {
                console.log(module.userRequest, codeLine);
            }
        })

    })

    normalModuleFactory.hooks.parser.for("javascript/auto").tap("TT", handler);
    // normalModuleFactory.hooks.parser.for("javascript/dynamic").tap("TT", handler);
    // normalModuleFactory.hooks.parser.for("javascript/esm").tap("TT", handler);
})

compiler.hooks.done.tap('TT', (stats) => {
    // console.log(stats);
})

compiler.run((err) => {
    // console.error(err)
})
