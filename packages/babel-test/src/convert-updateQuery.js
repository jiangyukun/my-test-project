const fs = require('fs')
const t = require('@babel/types')

const {traverseAndSelect, convertCodeUseAst, addImportItem} = require('./utils')

module.exports = function (dir, match) {
  traverseAndSelect(dir)(match)((code, namespace, filePath) => {
    return convertFile(code, namespace, filePath)
  })
}

function convertFile(code, namespace, filePath) {
  let needDeclareVariable = false
  return convertCodeUseAst(code, {
    Program(rootPath) {
      rootPath.traverse({
        ObjectProperty(objectPath) {
          let keyName = objectPath.node.key.name
          if (keyName === 'effects') {
            objectPath.traverse({
              CallExpression(callPath) {
                const node = callPath.node
                if (node.callee.type == 'MemberExpression') {
                  const {object, property} = node.callee
                  if (object.type == 'ThisExpression' && property.name == 'updateQuery') {
                    needDeclareVariable = true
                    let putAst = t.callExpression(t.identifier('updateQuery'), [t.identifier('select'), t.identifier('put'), node.arguments[0]])
                    callPath.replaceWith(putAst)
                  }
                }
              }
            })
          }
        }
      })
      if (needDeclareVariable) {
        addImportItem(rootPath, `\nconst updateQuery = getUpdateQuery(${namespace})`)
      }
    }
  })
}
