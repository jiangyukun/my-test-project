const fs = require('fs')
const path = require('path')
const fileUtils = require('../utils/fileUtil')
const {convertCodeUseAst} = require('../utils/astUtil')

// const diffFrom = 'D:/2066/node/ems2.0-mm-controller/src/models'
const diffFrom = 'D:/2066/node/ems2.0-mm-controller/src/controllers'
const diffTo = 'D:/2066/node/wanke-bff-common/src/models'

let apiDiffList = []

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
            diffInfo.push({
              type: 'Diff',
              funcName: item.name,
              diff: getDiff(item, match)
            })
          }
        } else {
          // 查找修改名称后的api
          let newApi = findTargetApi(item, list2)
          if (newApi) {
            diffInfo.push({
              type: 'Replace',
              funcName: item.name,
              to: newApi.name,
              diff: getDiff(item, newApi)
            })
          } else {
            // console.log('Loss', relativePath, item.name)
            diffInfo.push({
              type: 'Loss',
              funcName: item.name,
            })
          }
        }
      })
      if (diffInfo.length) {
        apiDiffList.push({
          module: relativePath.replace('\\', '/'),
          diffInfo
        })
      } else {
        // console.log(`${relativePath} 相同`)
      }

    }
  } else {
    // console.log(`${relativePath} 找不到`)
    if (relativePath.indexOf('index') != -1) {

    }
  }
})

console.log(JSON.stringify(apiDiffList))

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
              let data = node.arguments[2]
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
              if (data) {
                if (data.type == 'Identifier') {
                  params.push(data.name)
                  return
                }
                if (data.type == 'ObjectExpression') {
                  params.push(data.properties.map(p => {
                    if (p.type == 'ObjectProperty') {
                      return p.key.name
                    }
                    if (p.type == 'SpreadElement') {
                      return `...${p.argument.name}`
                    }
                    throw new Error('未知object类型')
                  }).join('_'))
                  return
                }
                throw new Error('未知类型22')
              }
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
      return p == params2[index] ? [] : [p, params2[index] || '']
    })
  }
  if (params2.length > params1.length) {
    return params2.map((p, index) => {
      return p == params1[index] ? [] : [params1[index] || '', p]
    })
  }
}

function findTargetApi(api, list) {
  let match = list.find(item => {
    if (item.comments.length) {
      let lastComment = item.comments[item.comments.length - 1]
      return lastComment.value.indexOf(api.name) != -1
    }
    return false
  })
  if (match) { //校验注释的正确性
    let diffs = getDiff(api, match).filter(diff => diff.length > 0)
    if (diffs.length > 0) {
      // console.log(`comment: ${api.name}=> ${match.name}`)
      // console.log(diffs)
      return match
    }
    return match
  }
  for (let targetApi of list) { // 自动查找对应的
    if (api.params.length == targetApi.params.length) {
      let diffs = getDiff(api, targetApi)
      if (diffs.length >= 2 && diffs[0].length == 0 && diffs[1].length == 0) {
        if (api.name.replace('new', 'post') == targetApi.name || api.name.replace('revise', 'patch') == targetApi.name) {
          // console.log(`list  : ${api.name} => ${targetApi.name}`)
          return targetApi
        }
      }
    }
  }
  return null
}
