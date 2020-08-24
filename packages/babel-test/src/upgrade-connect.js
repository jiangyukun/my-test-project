const t = require('@babel/types')

const path = require('path')
const {projectRoot} = require('./constants')
const {pagesRoot} = require('./constants')
const {bootstrap, getTsxMatch, sepLine} = require('./utils')
const {convertCodeUseAst, isModuleImported, addImportItem} = require('../../../utils/astUtil')

function convertFile(code, namespace, filePath) {
  let converted = false
  let needImport = false

  let resultCode = convertCodeUseAst(code, {
    Program(rootPath) {
      rootPath.traverse({
        CallExpression(path) {
          let functionName = path.node.callee.name
          if (functionName == 'connect') {
            path.replaceWith(
              t.callExpression(t.identifier('makeConnect'), [t.identifier(namespace), t.identifier('mapStateToProps')])
            )
            needImport = true
            converted = true
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

  if (converted) {
    return resultCode
  }
  return null
}

let handle = bootstrap(convertFile, getTsxMatch)
handle(pagesRoot, [
  {path: sepLine('terminal-run-data'), ns: 't_diagram'},
  {path: sepLine('terminal-analysis-query', 'battery'), ns: 't_battery'},
  {path: sepLine('terminal-index'), ns: 't_index'},
])
