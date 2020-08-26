const fs = require('fs')
const path = require('path')
const fileUtils = require('../utils/fileUtil')
const {convertCodeUseAst, isModuleImported, addImportItem} = require('../utils/astUtil')

const diffFrom = 'D:/2066/node/ems2.0-mm-controller/src/models'
const diffTo = 'D:/2066/node/wanke-bff-common/src/models'

fileUtils.reserveFile(diffFrom, (filePath) => {
  let relativePath = path.relative(diffFrom, filePath)
  let diffFilePath = path.join(diffTo, relativePath)
  if (fs.existsSync(diffFilePath)) {

  } else {

    if (relativePath.indexOf('index') != -1) {
      let resultCode = convertCode(fileUtils.getFileContent(filePath))
      fileUtils.writeCodeToFile(diffFilePath, resultCode)
    }
  }
})

function convertCode(code) {
  return convertCodeUseAst(code, {
    Program(rootPath) {
      let body = rootPath.node.body
      let match = body.filter(item => item.type == 'ImportDeclaration').find(item => item.source.value.indexOf('request_handler') != -1)
      let matchBase = body.filter(item => item.type == 'ImportDeclaration').find(item => item.source.value.indexOf('baseHandler') != -1)

      if (match) {
        match.source.value = '../../handlers/requestHandler'
      } else {
        addImportItem(rootPath, `import * as requestHandler from '../../handlers/requestHandler'`)
      }
      if (matchBase) {
        match.source.value = '../../handlers/baseHandler'
      } else {
        addImportItem(rootPath, `import * as baseHandler from '../../handlers/baseHandler'`)
      }
      if (isModuleImported(rootPath, 'IRequest')) {
        let matchInterface = body.filter(item => item.type == 'ImportDeclaration').find(item => item.source.value.indexOf('globals') != -1)
        matchInterface.source.value = '../../types/interface'
        console.log(3)
      } else {
        addImportItem(rootPath, `import { IRequest, IEnums } from '../../types/globals'`)
      }
    },
    CallExpression(callPath) {
      let callee = callPath.node.callee
      if (callee.type == 'MemberExpression') {
        let name = callee.property.name
        if (name == 'urlGenerator') {
          callee.property.name = 'joinUrl'
        }
      }
    }
  })
}
