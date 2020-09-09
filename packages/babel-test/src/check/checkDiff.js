const path = require('path')
const t = require('@babel/types')
const {convertCodeUseAst, isModuleImported, addImportItem, addItemAfterImport} = require('../../../../utils/astUtil')
const {bootstrap, sepLine} = require('../../../../utils/utils')
const {nodeProjectRoot} = require('../constants')
const diffList = require('../../../../temparory/storage/diffInfo.json')

let srcRoot = path.join(nodeProjectRoot, 'src-storage')

function convertFile(code, namespace, filePath) {
  let relativePath = path.relative(srcRoot, filePath).substring(7).padEnd(55)
  let converted = false

  let resultCode = convertCodeUseAst(code, {
    CallExpression(callPath) {
      let node = callPath.node
      let callee = node.callee
      let {object, property} = callee
      if (callee.type == 'MemberExpression' && object.type == 'Identifier') {
        if (object.name.indexOf('Models') != -1) {
          let diffMatch = diffList.find(item => item.module.replace('/index.ts', 'Models') == object.name)
          if (diffMatch) {
            let api = diffMatch.diffInfo.filter(item => item.type != 'Loss').find(item => item.funcName == property.name)
            if (api && api.diff.length) {
              console.log(`${object.name}.${property.name} ${api.diff}`)
            }
          }
        } else {

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
  {path: sepLine('routes'), ns: 'empty'},

])
