const t = require('@babel/types')

const path = require('path')
const {projectRoot} = require('./constants')
const {addImportItem} = require('./utils')
const {isModuleImported} = require('./utils')
const {wrap, convertCodeUseAst} = require('./utils')

module.exports = wrap(convertFile)

function convertFile(code, namespace, filePath) {
  let needImport = false, newFunctionCallIndex = -1, newFunctionArg1

  return convertCodeUseAst(code, {
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
  })
}
