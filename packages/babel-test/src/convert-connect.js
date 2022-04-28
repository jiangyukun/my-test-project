const t = require('@babel/types')
const path = require('path')
const {sepLine} = require('../../../utils/utils')

const {pagesRoot} = require('./constants')
const {addImportItem, bootstrap, getTsxMatch} = require('./utils')
const {convertCodeUseAst, isModuleImported} = require('../../../utils/astUtil')

function convertFile(code, namespace, filePath) {
  let converted = false
  let needImport = false, newFunctionCallIndex = -1, newFunctionArg1

  let resultCode = convertCodeUseAst(code, {
    Program(rootPath) {
      rootPath.traverse({
        CallExpression(path) {
          let functionName = path.node.callee.name
          if (functionName == 'connect') {
            needImport = true
            let parentPath = path.parentPath
            let currentPath = path
            while (parentPath.type != 'Program') {
              currentPath = parentPath
              parentPath = parentPath.parentPath
            }
            let rootPath1 = parentPath
            newFunctionCallIndex = rootPath1.node.body.indexOf(currentPath.node)
            newFunctionArg1 = path.node.arguments[0]
            path.node.arguments[0] = t.identifier('mapStateToProps')
          }
        }
      })
      if (newFunctionCallIndex != -1) {
        let body = rootPath.node.body
        let functionVariable = t.variableDeclaration('const',
          [
            t.variableDeclarator(t.identifier('mapStateToProps'), t.callExpression(t.identifier('mapModelState'), [t.identifier(namespace), newFunctionArg1]))
          ]
        )
        body.splice(newFunctionCallIndex, -1, functionVariable)
      }
      if (needImport) {
        let isImported = isModuleImported(rootPath, 'mapModelState')
        if (!isImported) {
          let relativePath = path.relative(filePath, path.join(projectRoot, 'src/pages/umi.helper')).replace(/\\/g, '/').substring(3)
          addImportItem(rootPath, `\nimport {mapModelState} from '${relativePath}'`)
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

handle(pagesRoot, [
  {path: sepLine('terminal-run-data'), ns: 't_diagram'},
])
