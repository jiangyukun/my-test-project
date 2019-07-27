
class LineLimitPlugin {
    constructor() {
    }

    apply(compiler) {
        compiler.hooks.compilation.tap('LineLimitPlugin', (compilation, {normalModuleFactory}) => {
            const handle = (parser) => {
                parser.hooks.program.tap('LineLimitPlugin', (ast, comments) => {
                    if (ast.loc.end.line > 3) {
                        console.log('文件超过了3行')
                    }
                })
            }
            normalModuleFactory.hooks.parser.for('javascript/auto').tap('XX', handle)
        })
    }
}

module.exports = LineLimitPlugin
