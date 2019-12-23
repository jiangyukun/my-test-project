const fs = require('fs')
const t = require('@babel/types')

const {traverseAndSelect, convertCodeUseAst, addImportItem} = require('./utils')

module.exports = function (dir, match) {
  traverseAndSelect(dir)(match)((filePath, namespace) => {
    convertFile(filePath, namespace)
  })
}

function convertFile(inputPath, namespace) {
  console.log(inputPath)
  const code = fs.readFileSync(inputPath).toString()
  let needDeclareVariable =false

  let convertCode = convertCodeUseAst(code, {
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
  fs.writeFile(inputPath, convertCode, {}, () => null)
}
