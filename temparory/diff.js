const fs = require('fs')
const path = require('path')
const fileUtils = require('../utils/fileUtil')
const {convertCodeUseAst} = require('../utils/astUtil')

const diffFrom = 'D:/2066/node/ems2.0-mm-controller/src/models'
const diffTo = 'D:/2066/node/wanke-bff-common/src/models'

fileUtils.reserveFile(diffFrom, (filePath) => {
  let relativePath = path.relative(diffFrom, filePath)
  let diffFilePath = path.join(diffTo, relativePath)
  if (fs.existsSync(diffFilePath)) {
    let content1 = fileUtils.getFileContent(filePath)
    let content2 = fileUtils.getFileContent(diffFilePath)
    if (content1 == content2) {
      console.log('same')
    } else {
      let list1 = getList(content1)
      let list2 = getList(content2)
      let diffInfo = []
      list1.forEach(item => {
        let match = list2.find(item2 => item2.name == item.name)
        if (match) {
          if (!checkIsEqual(item, match)) {
            diffInfo.push(`Diff   : ${item.name}(${getDiff(item, match)})`)
          }
        } else {
          let newApi = list2.find(item3 => item3.comments.find(item4 => item4.value.indexOf(item.name) != -1))
          if (newApi) {
            diffInfo.push(`Replace: ${item.name}=>${newApi.name}`)
          } else {
            diffInfo.push(`Loss   : ${item.name}`)
          }
        }
      })
      if (diffInfo.length) {
        console.log(`${relativePath.padEnd(40)}: ${diffInfo.join(', ')}`)
      } else {
        // console.log(`${relativePath} 相同`)
      }

    }
  } else {
    // console.log(`${relativePath} 找不到`)
  }
})

function getList(code) {
  let list = []
  convertCodeUseAst(code, {
    FunctionDeclaration(functionPath) {
      let functionNode = functionPath.node
      let funcName = functionNode.id.name
      let params = []
      functionPath.traverse({
        CallExpression(callPath) {
          let node = callPath.node
          if (node.callee.type == 'MemberExpression') {
            let name = node.callee.property.name
            if (name == 'urlGenerator' || name == 'joinUrl') {
              let backApiList = node.arguments[1].elements
              params = backApiList.map(item => {
                if (item.type == 'StringLiteral') {
                  return item.value
                }
                if (item.type == 'Identifier') {
                  return item.name
                }
                if (item.type == 'MemberExpression') {
                  return handleMemberExpression(item)
                }
              })
            }
          }
        }
      })
      list.push({
        name: funcName,
        params,
        comments: functionPath.parent.comments || []
      })
    }
  })
  return list
}

function handleMemberExpression(node) {
  let result = ''
  if (node.object.type == 'Identifier') {
    result += node.object.name
  } else if (node.object.type == 'MemberExpression') {
    result += handleMemberExpression(node.object)
  } else {
    console.log('未知类型')
  }
  result += '_'
  if (node.property.type == 'Identifier') {
    result += node.property.name
  } else if (node.property.type == 'MemberExpression') {
    result += handleMemberExpression(node.property)
  } else {
    console.log('未知类型')
  }
  return result
}

function checkIsEqual(api1, api2) {
  if (api1.params.length != api2.params.length) {
    return false
  }
  let index = 0
  for (let d of api1.params) {
    if (d != api2.params[index++]) {
      return false
    }
  }
  return true
}

function getDiff(api1, api2) {
  let params1 = api1.params
  let params2 = api2.params
  if (params1.length >= params2.length) {
    return params1.map((p, index) => {
      return p == params2[index] ? '_, ' : `${p}=>${params2[index] || ''}`
    }).join('')
  }
  if (params2.length > params1.length) {
    return params2.map((p, index) => {
      return p == params1[index] ? '_, ' : `${p}=>${params1[index] || ''}`
    }).join('')
  }
}
