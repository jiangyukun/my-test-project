const escodegen = require('escodegen')
const walk = require('acorn-walk')

class SetClickIdPlugin {
    constructor() {
    }

    apply(compiler) {
        compiler.hooks.compilation.tap('SetClickIdPlugin', (compilation, {normalModuleFactory}) => {
            const handle = (parser) => {
                // parser.hooks.statement.tap('SetClickIdPlugin', (expression) => {
                //     if (expression.type == 'ReturnStatement') {
                //         console.log(escodegen.generate(expression));
                //         if (expression.argument) {
                //             // parser.evaluateExpression(expression.argument)
                //         }
                //     }
                // })

                parser.hooks.program.tap('SetClickIdPlugin', (ast) => {
                    walk.simple(ast, {
                        CallExpression(node) {
                            if (node.callee.type == 'MemberExpression') {
                                if (node.callee.object.name == 'React') {
                                    //todo
                                }
                            }
                        }
                    })
                })

                parser.hooks.call.for('imported var.createElement').tap('SetClickIdPlugin', (expression) => {
                    // console.log(2);
                    console.log(escodegen.generate(expression));
                })
                // parser.hooks.evaluate.for('CallExpression').tap('SetClickIdPlugin', (expression) => {
                //     // parser.evaluateExpression(expression.callee)
                //     const callee = expression.callee
                //     if (expression.callee && expression.callee.type == 'MemberExpression') {
                //         if (callee.object.name == 'React') {
                //             console.log(escodegen.generate(expression));
                //             // parser.evaluateExpression(expression['arguments'][2])
                //         }
                //     }
                //     if (expression.type == 'ReturnStatement') {
                //     }
                // })
            }
            normalModuleFactory.hooks.parser.for('javascript/auto').tap('XX', handle)
        })
    }
}

module.exports = SetClickIdPlugin
