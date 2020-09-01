const path = require('path')
const t = require('@babel/types')
const {convertCodeUseAst, isModuleImported, addImportItem, addItemAfterImport} = require('../../../utils/astUtil')
const {bootstrap, sepLine} = require('../../../utils/utils')
const {nodeProjectRoot} = require('./constants')

let srcRoot = path.join(nodeProjectRoot, 'src-storage')

function convertFile(code, namespace, filePath) {
  let converted = false
  let funcList = []

  let resultCode = convertCodeUseAst(code, {
    ImportDeclaration(importPath) {
      let node = importPath.node
      let specifiers = node.specifiers
      let from = node.source.value
      let defaultImport = specifiers.find(item => item.type == 'ImportDefaultSpecifier') != undefined
      let funcImport = specifiers.find(item => item.type == 'ImportSpecifier') != undefined
      if (!defaultImport && funcImport) {
        let isController = from.indexOf('/controllers/') != -1 || from.indexOf('/models/') != -1
        let isHandler = from.indexOf('_handler') != -1

        if (isController || isHandler) {
          let parts = from.split('/')
          let moduleName = parts[parts.length - 1].replace(/[-_](\w)/g, (str, letter) => letter.toUpperCase())
          let finallyName = moduleName + (isController ? 'Controller' : '')
          node.specifiers.forEach(item => {
            if (funcList.find(funcItem => funcItem.name == item.local.name)) {
              console.log('重复的变量')
            }
            funcList.push({
              name: item.local.name,
              module: finallyName
            })
          })

          node.specifiers = [
            t.importDefaultSpecifier(t.identifier(finallyName))
          ]
          converted = true
        }
      }
    },
    CallExpression(callPath) {
      let node = callPath.node
      let name = node.callee.name
      if (node.callee.type == 'Identifier') {
        let match = funcList.find(funcItem => funcItem.name == name)
        if (match) {
          callPath.replaceWith(
            t.callExpression(
              t.memberExpression(t.identifier(match.module), t.identifier(name)),
              node.arguments
            )
          )
        }
      }
    }
  }, filePath)

  if (converted) {
    return resultCode
  }
  return null
}

let handle = bootstrap(convertFile)

handle(srcRoot, [
  {path: sepLine('vpp', 'enums.ts'), ns: 'empty'},
])
