const t = require('@babel/types')
const {wrap, convertCodeUseAst} = require('./utils')

module.exports = wrap(convertFile)

function convertFile(code, namespace, filePath) {
  let needImport = false
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
                  if (object.type == 'ThisExpression' && property.name == 'updateState') {
                    needImport = true
                    callPath.replaceWith(t.yieldExpression(t.callExpression(t.identifier('updateState'), [t.identifier('put'), ...node.arguments])))
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
