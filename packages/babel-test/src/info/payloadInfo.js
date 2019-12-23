const {wrap, getDefaultMatch, convertCodeUseAst} = require('../utils')


function getTsxMatch(pathInfoList) {
  const defaultMatch = getDefaultMatch(pathInfoList)
  return function (filePath) {
    if (filePath.indexOf('.tsx') == -1) {
      return null
    }
    return defaultMatch(filePath)
  }
}

module.exports = wrap(getTsxMatch, convertFile)

function convertFile(code, namespace, filePath) {
  let needImport = false, isImported = false, isActionTypeImported = false

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
                  if (valueType == 'StringLiteral') {

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
