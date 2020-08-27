const path = require('path')
const t = require('@babel/types')
const {convertCodeUseAst, isModuleImported, addImportItem, addItemAfterImport} = require('../../../utils/astUtil')
const {bootstrap, sepLine} = require('./utils')
const {srcRoot, projectRoot} = require('./constants')
const json = require('../../../temparory/terminal/diffInfo.json')

let handleMap = {
  'baseHandler.dataToFix': ['baseHandler', 'fixDigits'],
  'baseHandler.empty': ['baseHandler', 'judgeEmpty'],
  'frontHandler.enumsHandle': ['baseHandler', 'getPropertyFromOrigin'],

  'frontHandler.uniqueIdHandler': ['frontHandler', 'setUniqueId'],
  'frontHandler.datasFix': ['frontHandler', 'mixArrToObj'],
  'frontHandler.pagingHandle': ['frontHandler', 'setPageToTarget'],
  'frontHandler.paramLostRespGener': ['frontHandler', 'getParamLost'],
  'baseHandler.baseRespFactory': ['frontHandler', 'getBaseResp'],
  'conversionHandler.dataConverse': ['frontHandler', 'conversionUnit'],
  'timeHandler.dateSplicing': ['timeHandler', 'splicingDate'],
  'timeHandler.getSelectStrByDay': ['timeHandler', 'splicingDate'],
  'timeHandler.compareTime2': ['timeHandler', 'getTimePointInterval'],
  'baseHandler.judgeNullException': ['requestHandler', 'judgeAbnormalResp'],
}

function convertFile(code, namespace, filePath) {
  let relativePath = path.relative(srcRoot, filePath).substring(7).padEnd(55)
  let converted = false
  let list = []
  let handleList = []
  let finallyHandleList = []

  let resultCode = convertCodeUseAst(code, {
    Program(rootPath) {
      if (!isModuleImported(rootPath, 'share')) {
        converted = true
        rootPath.traverse({
          ImportDeclaration(importPath) {
            let node = importPath.node
            let from = node.source.value
            if (from.indexOf('/models/') != -1) {
              let variableName = node.specifiers[0].local.name
              let parts = from.split('/')
              let modelPath = parts[parts.length - 1]
              list.push([variableName, modelPath + 'Models'])
              importPath.remove()
            } else if (from.indexOf('/handler/') != -1) {
              let modelPath = from.substring(from.indexOf('/handler/') + 9)
              let variableName = node.specifiers[0].local.name
              let newName = modelPath.replace(/_(\w)/, (s, w) => w.toUpperCase())
              handleList.push([variableName, newName + 's'])
              importPath.remove()
            }
          },

          CallExpression(callPath) {
            let node = callPath.node
            if (node.callee.type == 'MemberExpression') {
              let {object, property} = node.callee
              if (object.type == 'Identifier' && property.type == 'Identifier') {
                let modelName = object.name
                let funcName = property.name
                let match = list.find(item => item[0] == object.name)
                if (match) {
                  object.name = match[1]
                  // 判断函数是否需要替换

                  let diffMatch = json.find(item => item.module.replace('/index.ts', 'Models') == match[1])
                  if (diffMatch) {
                    let diffItem = diffMatch.diffInfo.find(item => item.funcName == funcName)
                    if (diffItem && diffItem.type == 'Replace') {
                      property.name = diffItem.to
                    }
                  }
                  if (funcName != property.name) {
                    console.log(`${relativePath} ${modelName} => ${object.name}, ${funcName}=>${property.name}`)
                  } else {
                    console.log(`${relativePath} ${modelName} => ${object.name}`)
                  }
                }
              }
              // handler 替换
              if (object.type == 'Identifier' && property.type == 'Identifier') {
                let match = handleList.find(item => item[0] == object.name)
                if (match) {
                  let key = object.name + '.' + property.name
                  let targetHandle = handleMap[key]
                  if (targetHandle) {
                    let oldHandleName = targetHandle[0]
                    let match1 = handleList.find(item => item[0] == oldHandleName)
                    if (!match1) {
                      let newHandleName = oldHandleName + 's'
                      match1 = [oldHandleName, newHandleName]
                      handleList.push(match1)
                    }
                    object.name = match1[1]
                    property.name = targetHandle[1]
                    if (finallyHandleList.indexOf(match1[1]) == -1) {
                      finallyHandleList.push(match1[1])
                    }
                    console.log(`${relativePath} ${key} => ${object.name}.${property.name}`)
                  } else {
                    object.name = match[1]
                    if (finallyHandleList.indexOf(match[1]) == -1) {
                      finallyHandleList.push(match[1])
                    }
                  }
                }
              }
            }
          }
        })
        addImportItem(rootPath, `import share from 'wanke-bff-share'`)
        addItemAfterImport(rootPath, ` const {${list.map(item => item[1]).join(', ')}} = models`)
        addItemAfterImport(rootPath, `const {${finallyHandleList.join(', ')}} = handlers`)
        addItemAfterImport(rootPath, `const {handlers, models} = share`)
      }
    },
  }, filePath)
  if (converted) {
    return resultCode
  }

  return null
}

let handle = bootstrap(convertFile)

handle(srcRoot, [
  {path: sepLine('socket'), ns: 'empty'},
])
