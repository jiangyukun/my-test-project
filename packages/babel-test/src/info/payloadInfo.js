/**
 * 查看 payload 是否为对象
 */

const {wrap, getTsxMatch, convertCodeUseAst} = require('../utils')

module.exports = wrap(convertFile, getTsxMatch)

function convertFile(code, namespace, filePath) {
  return convertCodeUseAst(code, {
    Program(rootPath) {
      rootPath.traverse({
        CallExpression(path) {
          let functionName = path.node.callee.name
          if (functionName == 'dispatch') {
            path.traverse({
              ObjectProperty(propertyPath) {
                let keyName = propertyPath.node.key.name
                let valueType = propertyPath.node.value.type
                if (keyName == 'payload') {
                  if (valueType != 'ObjectExpression') {
                    console.log(filePath, propertyPath.node.value.loc.start.line)
                  }
                }
              }
            })
          }
        }
      })
    }
  }, filePath)
}
