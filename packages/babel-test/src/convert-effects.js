const template = require('@babel/template').default
const t = require('@babel/types')

const path = require('path')
const {projectRoot} = require('./constants')
const {getAstBody} = require('./utils')
const {traverseAndSelect, convertCodeUseAst} = require('./utils')

module.exports = function (dir, match) {
  traverseAndSelect(dir)(match)((code, namespace, filePath) => {
    convertFile(code, namespace, filePath)
  })
}

function convertFile(code, namespace, filePath) {
  let needImport = false, isImported = false

  return convertCodeUseAst(code, {
    Program(rootPath) {
      rootPath.traverse({
        ObjectProperty(objectPath) {
          let keyName = objectPath.node.key.name
          if (keyName === 'effects') {
            objectPath.traverse({
              ObjectMethod(methodPath) {
                if (methodPath.node.async) {
                  let node = methodPath.node
                  node.async = false
                  node.generator = true
                  let param1 = getAstBody('({payload})')[0].expression
                  let param2 = getAstBody('({call, put, select})')[0].expression

                  if (node.params.length == 0) {
                    node.params.push(param1)
                    node.params.push(param2)
                  } else if (node.params.length == 1) {
                    console.log(`effects ${node.key.name} 已有1个参数`)
                    node.params.push(param2)
                  } else {
                    console.log(`effects ${node.key.name} 已有2个参数`)
                  }
                  methodPath.traverse({
                    AwaitExpression(awaitPath) {
                      awaitPath.replaceWith(t.yieldExpression(awaitPath.node.argument))
                    }
                  })
                }
              }
            })
          }
        }
      })

      rootPath.traverse({
        ImportSpecifier(importPath) {
          if (importPath.node.imported.name == namespace) {
            isImported = true
          }
        }
      })
      if (needImport) {
        if (isImported) {
          console.log(filePath, namespace, '已经导入')
        } else {
          let body = rootPath.node.body
          let relativePath = path.relative(filePath, path.join(projectRoot, 'src/pages/constants')).replace(/\\/g, '/').substring(3)
          let index = body.findIndex(statement => statement.type != 'ImportDeclaration')
          body.splice(index, -1, template.ast(`\nimport {${namespace}} from '${relativePath}'`))
        }
      }
    }
  })
}
