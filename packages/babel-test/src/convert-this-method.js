const fs = require('fs')
const t = require('@babel/types')
const template = require('@babel/template').default
const {traverseAndSelect, convertCodeUseAst} = require('./utils')

module.exports = function (dir, match) {
  traverseAndSelect(dir)(match)((code, namespace, filePath) => {
    return convertFile(code, namespace, filePath)
  })
}

function convertFile(code, namespace, filePath) {
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
                  if (object.type == 'ThisExpression') {
                    if (property.name == '$getList') {
                      let putAst = t.yieldExpression(template.expression(`put({type: '${property.name}'})`)())
                      callPath.replaceWith(putAst)
                    }
                  }
                }
              }
            })
          }
        }
      })
    }
  })
}
