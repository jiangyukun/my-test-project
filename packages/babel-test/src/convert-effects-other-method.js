const t = require('@babel/types')
const {wrap, convertCodeUseAst, putObjAst} = require('./utils')

module.exports = wrap(convertFile)

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
                  if (object.type == 'ThisExpression' && property.name == 'selectTree') {
                    let putAst = t.callExpression(t.identifier('put'), [putObjAst(property.name, node.arguments[0])])
                    callPath.replaceWith(putAst)
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
