/**
 * 检测 model 的 namespace是否正确
 */
const path = require('path')
const t = require('@babel/types')
const {projectRoot} = require('./constants')

let srcPath = path.join(projectRoot, 'src')

const {convertCodeUseAst, isModuleImported, addImportItem} = require('../../../utils/astUtil')
const {bootstrap, sepLine, endWith} = require('../../../utils/utils')

function convertFile(code, namespace, filePath) {
  if (!(endWith(filePath, 'model.ts') || filePath.indexOf('models') != -1)) {
    return
  }
  let relativePath = path.relative(srcPath, filePath)
  let converted = false
  let ns = ''
  let diffList = []

  let resultCode = convertCodeUseAst(code, {
    ExportDefaultDeclaration(path) {
      let node = path.node
      let {declaration} = node
      if (declaration.type == 'CallExpression') {
        let arg0 = declaration.arguments[0]
        if (arg0.type == 'Identifier') {
          ns = arg0.name
        }
        if (arg0.type == 'StringLiteral') {
          ns = arg0.value
        }
      } else if (declaration.type == 'ObjectExpression') {
        let item = declaration.properties.find(item => item.key.name == 'namespace')
        if (item.value.type == 'StringLiteral') {
          ns = item.value.value
        } else {
          ns = item.value.name
        }
      }
      if (!ns) {
        console.log(4)
      }
    },
    CallExpression(callPath) {
      let {node} = callPath
      let {callee} = node
      if (callee.type == 'Identifier' && callee.name == 'select') {
        callPath.traverse({
          MemberExpression(subPath) {
            let {object, property} = subPath.node
            if (object.type == 'Identifier' && property.type == 'Identifier') {
              if (object.name == 'state' && property.name != ns && property.name != 'globalNS') {
                diffList.push(`  diff:  ${property.name}`)
              }
            }
          }
        })
      }
    }
  })
  if (diffList.length > 0) {
    console.log(`${relativePath.padEnd(80)} ### ${ns}`)
    diffList.forEach(item => {
      console.log(item)
    })
  }
  if (converted) {
    return resultCode
  }

  return null
}

let handle = bootstrap(convertFile)

handle(srcPath, [
  {path: sepLine('pages'), ns: 'empty'},
])
