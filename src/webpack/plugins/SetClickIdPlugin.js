const escodegen = require('escodegen')
const walk = require('acorn-walk')

class SetClickIdPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('SetClickIdPlugin', (compilation, {normalModuleFactory}) => {
      const handle = (parser) => {
        parser.hooks.program.tap('SetClickIdPlugin', (ast) => {
          walk.simple(ast, {
            CallExpression(node) {
              if (node.callee.type == 'MemberExpression') {
                if (node.callee.object.name == 'React') {
                  //
                }
              }
            }
          })
        })
      }
      normalModuleFactory.hooks.parser.for('javascript/auto').tap('SetClickIdPlugin', handle)
    })
  }
}

module.exports = SetClickIdPlugin
