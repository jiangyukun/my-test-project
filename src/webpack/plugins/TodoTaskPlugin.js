
class TodoTaskPlugin {
    constructor() {
    }

    apply(compiler) {
        compiler.hooks.compilation.tap('TodoTaskPlugin', (compilation, {normalModuleFactory}) => {
            const handle = (parser) => {
                parser.hooks.program.tap('TodoTaskPlugin', (ast, comments) => {
                    comments.forEach(comment=> {
                        if (comment.value == 'todo') {
                            console.log('存在待完成事项')
                        }

                    })
                })
            }
            normalModuleFactory.hooks.parser.for('javascript/auto').tap('XX', handle)
        })
    }
}

module.exports = TodoTaskPlugin
