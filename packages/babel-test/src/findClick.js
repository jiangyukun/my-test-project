const t = require('@babel/types')
const parser = require('@babel/parser')
const path = require('path')
const {getJSX_text} = require('../../../utils/astUtil')
const {projectRoot} = require('./constants')
const {pagesRoot} = require('./constants')
const {bootstrap, getTsxMatch, sepLine} = require('../../../utils/utils')
const {convertCodeUseAst, isModuleImported, addImportItem, isHaveIdentify} = require('../../../utils/astUtil')

let clickId = 26

function convertFile(code, filePath) {
  let converted = false
  let fileShortName = path.parse(filePath).name

  let resultCode = convertCodeUseAst(code, {
    Program(rootPath) {
      rootPath.traverse({
        JSXAttribute(path) {
          let attributeName = path.node.name.name
          if (attributeName == 'onClick') {
            if (path.node.value.type == 'JSXExpressionContainer') {
              let expression = path.node.value.expression
              if (expression.type == 'ArrowFunctionExpression') {
                if (expression.body.type == 'BlockStatement' && !isHaveIdentify(path, 'sendClickEvent')) {
                  converted = true
                  let p = parser.parseExpression(`dispatch(sendClickEvent(${clickId++}, '${fileShortName}_${getJSX_text(path.parentPath.parentPath)}'))`)
                  expression.body.body.unshift(t.expressionStatement(p))
                }
              } else if (expression.type == 'Identifier') {
                rootPath.traverse({
                  VariableDeclarator(varPath) {
                    let varNode = varPath.node
                    if (varNode.id.name == expression.name && !isHaveIdentify(varPath, 'sendClickEvent')) {
                      converted = true
                      let p = parser.parseExpression(`dispatch(sendClickEvent(${clickId++}, '${fileShortName}_${expression.name}'))`)
                      varNode.init.body.body.unshift(t.expressionStatement(p))
                    }
                  }
                })
              } else if (expression.type == 'MemberExpression') {
                console.log()
              }
            }
          }
        }
      })
      if (converted) {
        if (!isModuleImported(rootPath, 'sendClickEvent')) {
          let relativePath = path.relative(filePath, path.join(projectRoot, 'src/container/app.action')).replace(/\\/g, '/').substring(3)
          if (relativePath.indexOf('/') == -1) {
            relativePath = './' + relativePath
          }
          addImportItem(rootPath, `import {sendClickEvent} from '${relativePath}'`)
        }
      }
    }
  }, filePath)

  if (converted) {
    return resultCode
  }
  return null
}

let handle = bootstrap(convertFile, getTsxMatch([]))
handle(pagesRoot)
