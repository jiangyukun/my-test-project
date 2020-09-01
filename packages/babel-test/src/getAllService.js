const path = require('path')
const t = require('@babel/types')
const {projectRoot} = require('./constants')

const {bootstrap, sepLine} = require('../../../utils/utils')
const {convertCodeUseAst} = require('../../../utils/astUtil')

let apiList = []

function convertFile(code, namespace, filePath) {
  let converted = false
  if (filePath.indexOf('.tsx') != -1) {
    return
  }

  let resultCode = convertCodeUseAst(code, {
    CallExpression(callPath) {
      let node = callPath.node
      let name = node.callee.name
      if (name == 'createServices') {
        let arg = node.arguments[0]
        if (arg.type == 'ObjectExpression') {
          arg.properties.forEach(item => {
            if (item.type == 'ObjectProperty') {
              let url = item.value.value
              let parts = url.split('|')
              apiList.push({
                type: parts[1] || 'get',
                path: parts[0]
              })
            }
          })

        } else {
          let args = node.arguments
          if (args[1].type != 'StringLiteral') {
            console.log(`${filePath} 无法处理的createServices，`)
            return
          }
          apiList.push({
            type: args[0].value,
            path: args[1].value
          })
        }
      } else if (name == 'myAxios' || name == 'http') {
        let properties = node.arguments[0].properties
        let type = properties.find(item => item.key.name == 'method')
        let url = properties.find(item => item.key.name == 'url')
        apiList.push({
          type: type.value.value,
          path: url.value.value
        })
      }
    }
  }, filePath)
  if (converted) {
    return resultCode
  }

  return null
}

let handle = bootstrap(convertFile)

const srcRoot = path.join(projectRoot, 'src')

handle(srcRoot, [
  {path: sepLine('pages', 'vpp'), ns: 'empty'},

])

let sortList = apiList.map(item => {
  if (item.path[0] != '/') {
    item.path = '/' + item.path
  }
  if (item.path.indexOf('/api/') != -1) {
    item.path = item.path.substring(4)
  }
  return item
}).sort((a, b) => {
  return a.path > b.path ? 1 : -1
})

let ddd = []
for (let api of sortList) {
  if (!ddd.find(item => item.path == api.path)) {
    ddd.push(api)
  }
}

let r = []

for (let d of ddd) {
  let category = d.path.split('/')[1]
  let index = d.path.indexOf(category)
  let suffix = d.path.substring(index + category.length)
  let match = r.find(item => item.category == category)
  if (match) {
    match.api.push(suffix)
  } else {
    r.push({
      category,
      api: [suffix]
    })
  }
}

console.log(r)
// r.map(item => item.category).forEach(item=> {
//   console.log(item)
// })
