const template = require('@babel/template').default
const t = require('@babel/types')

const fs = require('fs')
const path = require('path')
const {getAstBody} = require('./utils')
const {traverseAndSelect, convertCodeUseAst} = require('./utils')

module.exports = function (dir, match) {
  traverseAndSelect(dir)(match)((filePath, namespace) => {
    convertFile(filePath, namespace)
  })
}

function convertFile(inputPath, namespace) {
  const code = fs.readFileSync(inputPath).toString()
  let needImport = false, isImported = false

  let convertCode = convertCodeUseAst(code, {
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
          console.log(inputPath, namespace, '已经导入')
        } else {
          let body = rootPath.node.body
          let relativePath = path.relative(inputPath, path.join(projectPath, 'src/pages/constants')).replace(/\\/g, '/').substring(3)
          let index = body.findIndex(statement => statement.type != 'ImportDeclaration')
          body.splice(index, -1, template.ast(`\nimport {${namespace}} from '${relativePath}'`))
        }
      }
    }
  })
  fs.writeFile(inputPath, convertCode, {}, () => null)
}
