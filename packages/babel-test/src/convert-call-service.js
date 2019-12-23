const t = require('@babel/types')
const {wrap, convertCodeUseAst} = require('./utils')

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
                  if (object.name == 'services') {
                    if (node.arguments.length <= 1) {
                      let args = []
                      args.push(t.memberExpression(t.identifier('services'), t.identifier(property.name)))
                      if (node.arguments.length == 1) {
                        args.push(node.arguments[0])
                      }
                      callPath.replaceWith(t.callExpression(t.identifier('call'), args))
                    } else {
                      console.log('services 参数大于1')
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
