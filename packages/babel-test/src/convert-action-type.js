const template = require('@babel/template').default
const t = require('@babel/types')

const path = require('path')
const {srcRoot, projectRoot} = require('./constants')
const {bootstrap, sepLine, getTsxMatch} = require('./utils')
const {convertCodeUseAst} = require('../../../utils/astUtil')

function convertFile(code, namespace, filePath) {
  let needImport = false, isImported = false, isActionTypeImported = false

  let converted = false
  let resultCode = convertCodeUseAst(code, {
    Program(rootPath) {
      rootPath.traverse({
        CallExpression(path) {
          let functionName = path.node.callee.name
          if (functionName == 'dispatch') {
            path.traverse({
              ObjectProperty(propertyPath) {
                let keyName = propertyPath.node.key.name
                let valueType = propertyPath.node.value.type
                if (keyName == 'type') {
                  if (valueType == 'StringLiteral') {
                    let typeValue = propertyPath.node.value.value
                    // dispatch 当前模块
                    if (typeValue.indexOf('/') == -1) {
                      needImport = true
                      let getActionTypeAst = template.ast(`getActionType(${namespace}, '${typeValue}')`)
                      propertyPath.node.value = getActionTypeAst.expression
                    } else {
                      path.addComment(t.addComment(path.node, 'leading', ' todo', true))
                    }
                    converted = true
                  }
                }
              }
            })
          }
        }
      })
      if (needImport) {
        rootPath.traverse({
          ImportSpecifier(importPath) {
            if (importPath.node.imported.name == namespace) {
              isImported = true
            }
            if (importPath.node.imported.name == 'getActionType') {
              isActionTypeImported = true
            }
          }
        })
      }
      if (needImport) {
        if (isImported) {
          console.log(filePath, namespace, '已经导入')
        } else {
          let body = rootPath.node.body
          let relativePath = path.relative(filePath, path.join(projectRoot, 'src/pages/constants')).replace(/\\/g, '/').substring(3)
          let index = body.findIndex(statement => statement.type != 'ImportDeclaration')
          body.splice(index, -1, template.ast(`\nimport {${namespace}} from '${relativePath}'`))
        }
        if (isActionTypeImported) {
          console.log(filePath, 'getActionType', '已经导入')
        } else {
          let body = rootPath.node.body
          let relativePath = path.relative(filePath, path.join(projectRoot, 'src/pages/umi.helper')).replace(/\\/g, '/').substring(3)
          let index = body.findIndex(statement => statement.type != 'ImportDeclaration')
          body.splice(index, -1, template.ast(`\nimport {getActionType} from '${relativePath}'`))
        }
      }
    }
  }, filePath)

  if (converted) {
    return resultCode
  }

  return null
}


let handle = bootstrap(convertFile, getTsxMatch)

handle(srcRoot, [
  {path: sepLine('terminal-run-data'), ns: 't_diagram'},
])
