const t = require('@babel/types')

const path = require('path')
const {projectRoot} = require('./constants')
const {addImportItem} = require('./utils')
const {isModuleImported} = require('./utils')
const {wrap, convertCodeUseAst, getTsxMatch} = require('./utils')

module.exports = wrap(convertFile, getTsxMatch)

function convertFile(code, namespace, filePath) {
  let needImport = false

  return convertCodeUseAst(code, {
    Program(rootPath) {
      rootPath.traverse({
        CallExpression(path) {
          let functionName = path.node.callee.name
          if (functionName == 'connect') {
            path.replaceWith(
              t.callExpression(t.identifier('makeConnect'), [t.identifier(namespace), t.identifier('mapStateToProps')])
            )
            needImport = true
          }
        },
        VariableDeclarator(path) {
          const node = path.node
          if (node.id.name == 'mapStateToProps') {
            if (node.init.type == 'CallExpression') {
              if (node.init.arguments.length == 2) {
                path.replaceWith(
                  t.variableDeclarator(t.identifier('mapStateToProps'), node.init.arguments[1])
                )
              } else {
                console.log('arguments 不为2')
              }
            }
          }
        }
      })

      if (needImport) {
        let isImported = isModuleImported(rootPath, 'makeConnect')
        if (!isImported) {
          let relativePath = path.relative(filePath, path.join(projectRoot, 'src/pages/umi.helper')).replace(/\\/g, '/').substring(3)
          addImportItem(rootPath, `\nimport {makeConnect} from '${relativePath}'`)
        }
      }
    }
  })
}
