let fs = require('fs')
let path = require('path')
let util = require('./util')

let generateService = require('./common/generateService')
let generateModal = require('./common/generateModal')


fs.exists(path.join(process.cwd(), 'build/auto-generate'), exists => {
  if (!exists) {
    fs.mkdirSync(path.resolve(process.cwd() + '/build/', 'auto-generate'))
  }
})
fs.exists(path.join(process.cwd(), 'build/auto-generate/modal'), exists => {
  if (!exists) {
    fs.mkdirSync(path.resolve(process.cwd() + '/build/auto-generate/', 'modal'))
  }
})

let json = require('./xbx.json')

const apiPaths = json.paths
const definitions = json.definitions


let keys = Object.getOwnPropertyNames(apiPaths)


let serviceSet = new Set()
for (let key of keys) {
  let category = key.split('/')
  serviceSet.add(category[1])
}

for (let service of serviceSet) {
  autoGenerator({
    filename: `${service}.js`,
    filter(apiPath) {
      return apiPath.indexOf(service) !== -1
    }
  })
}

function autoGenerator(options) {
  let filterKeys = keys.filter(options.filter)
  let serviceText = ''
  let modalText = ''
  let exportFunctionList = []
  let modalClassList = []
  let registerModalClassList = []
  for (let url of filterKeys) {
    let urlParts = url.split('/')
    let functionName = util.firstLetterLowerCase(urlParts[urlParts.length - 1])
    exportFunctionList.push(functionName)
    let apiItem = apiPaths[url]
    let httpType = Object.getOwnPropertyNames(apiItem)[0]
    let apiInfo = apiItem[httpType]

    serviceText += generateService(url, httpType, apiItem[httpType])

    let responseClassName = util.getResponseClassName(apiInfo.responses['200'].schema, definitions)
    if (responseClassName && modalClassList.indexOf(responseClassName) === -1) {
      modalClassList.push(responseClassName)
      modalText += generateModal(responseClassName, json.definitions[responseClassName], registerClass)
    }
  }
  registerModalClassList.forEach(modalClass => {
    modalText += generateModal(modalClass, definitions[modalClass], registerClass)
  })


  let output = `
import axios from 'axios'
${serviceText}
module.exports = {\n    ${exportFunctionList.join(',\n    ')}\n}
`

  let modalFileOutput = `
${modalText}
module.exports = {\n    ${modalClassList.concat(registerModalClassList).join(',\n    ')}\n}
`

  let filePath = path.resolve(process.cwd() + '/build/auto-generate/', options.filename)
  fs.writeFile(filePath, output, (err, fd) => {
    if (err) {
      throw err
    } else {
      // console.log(options.filename + '模块写入完成')
    }
  })
  let modalPath = path.resolve(process.cwd() + '/build/auto-generate/modal/', options.filename)
  if (modalText) {
    fs.writeFile(modalPath, modalFileOutput, (err, fd) => {
      if (err) {
        throw err
      } else {
        // console.log(options.filename + 'modal写入完成')
      }
    })
  }

  function registerClass(modalName) {
    if (registerModalClassList.indexOf(modalName) === -1) {
      registerModalClassList.push(modalName)
    }
  }

}
