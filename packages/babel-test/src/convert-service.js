const t = require('@babel/types')
const {srcRoot} = require("./constants")

const {bootstrap, convertCodeUseAst} = require('./utils')

function convertFile(code, namespace, filePath) {
  let converted = false
  let resultCode = convertCodeUseAst(code, {
    Program(rootPath) {
      let properties = []
      rootPath.traverse({
        CallExpression(path1) {
          let node1 = path1.node

          if (node1.callee.name == 'createServices') {
            let object = node1.arguments[0]
            properties = object.properties
            path1.remove()
          }
        }
      })
      if (properties.length > 0) {
        converted = true
        properties.forEach(property => {
          let key = property.key.name
          let value = property.value.value
          let parts = value.split('|')
          if (parts.length == 0) {
            console.log(value);
            return
          }
          let url = parts[0]
          let method = parts[1] || 'get'

          rootPath.node.body.push(
            t.exportNamedDeclaration(
              t.functionDeclaration(
                t.identifier(key),
                [t.identifier('data')],
                t.blockStatement(
                  [
                    t.returnStatement(
                      t.callExpression(t.identifier('myAxios'),
                        [t.objectExpression([
                          t.objectProperty(t.identifier('method'), t.stringLiteral(method)),
                          t.objectProperty(t.identifier('url'), t.stringLiteral(url)),
                          t.objectProperty(t.identifier('data'), t.identifier('data')),
                        ])]
                      )
                    )
                  ]
                )
              ), []
            )
          )
        })
      }
    }
  })
  if (converted) {
    return resultCode
  }
  return null
}

let handle = bootstrap(convertFile)

handle(srcRoot, [{path: '.service.ts', ns: 'empty'}])
