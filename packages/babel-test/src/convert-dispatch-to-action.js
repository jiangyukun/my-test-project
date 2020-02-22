const t = require('@babel/types')
const {wrap, getTsxMatch, convertCodeUseAst} = require('./utils')

module.exports = wrap(convertFile, getTsxMatch)

function convertFile(code, namespace, filePath) {
  return convertCodeUseAst(code, {
    Program(rootPath) {
      rootPath.traverse({
        CallExpression(path) {
          let functionName = path.node.callee.name
          if (functionName == 'dispatch') {
            let node = path.node
            if (node.arguments.length != 1) {
              return
            }
            let typeName = null, payload = null

            let properties = node.arguments[0].properties
            if (properties) {
              for (let property of properties) {
                let key = property.key.name

                if (key == 'payload') {
                  payload = property.value
                }
                if (key == 'type') {
                  if (property.value.arguments[0].name == namespace) {
                    typeName = property.value.arguments[1]
                  }
                }
              }
            } else {
              // getAction()
              path.traverse({
                CallExpression(propertyPath) {
                  if (propertyPath.node.arguments[0].name == namespace) {
                    typeName = propertyPath.node.arguments[1]
                    payload = propertyPath.node.arguments[2]
                  }
                }
              })
            }

            let args = []
            if (typeName) {
              args.push(typeName)
              if (payload) {
                args.push(payload)
              }
            } else {
              console.log(1)
            }
            if (args.length > 0) {
              let actionExpression = t.callExpression(t.memberExpression(t.identifier('props'), t.identifier('action')), args)
              path.replaceWith(actionExpression)
            }
          }
        }
      })
    }
  })
}
