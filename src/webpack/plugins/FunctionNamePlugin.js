

class FunctionNamePlugin {
    constructor() {
    }

    apply(compiler) {
        compiler.hooks.compilation.tap('FunctionNamePlugin', (compilation, {normalModuleFactory}) => {
            const handle = (parser) => {
                parser.hooks.statement.tap('FunctionNamePlugin', (statement) => {
                    if (statement.type == 'FunctionDeclaration') {
                        let functionName = statement.id.name
                        if (functionName > 20) {
                            console.log(functionName + '过长')
                        }
                    }
                })
            }
            normalModuleFactory.hooks.parser.for('javascript/auto').tap('XX', handle)
        })
    }
}

module.exports = FunctionNamePlugin
