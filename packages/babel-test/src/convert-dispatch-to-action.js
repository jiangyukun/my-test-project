const t = require('@babel/types')
const {wrap, getTsxMatch, convertCodeUseAst} = require('./utils')

module.exports = wrap(convertFile, getTsxMatch)

function convertFile(code, namespace, filePath) {
  let isClass = false
  return convertCodeUseAst(code, {
    Program(rootPath) {
      rootPath.traverse({
        ClassDeclaration() {
          isClass = true
          return false
        }
      })
      rootPath.traverse({
        CallExpression(path) {
          let functionName = path.node.callee.name
          if(path.node.callee.type == 'MemberExpression') {
            functionName = path.node.callee.property.name
          }
          if (functionName != 'dispatch') {
            return
          }
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
                if (property.value.type == 'StringLiteral') {
                  console.log(property.value.value)
                } else if (property.value.arguments[0].name == namespace) {
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
            let actionExpression
            if (isClass) {
              actionExpression = t.callExpression(
                t.memberExpression(t.memberExpression(t.thisExpression(), t.identifier('props')),
                  t.identifier('action')), args)
            } else {
              actionExpression = t.callExpression(
                t.memberExpression(t.identifier('props'),
                  t.identifier('action')), args)
            }

            path.replaceWith(actionExpression)
          }
        }
      })
    }
  }, filePath)
}
