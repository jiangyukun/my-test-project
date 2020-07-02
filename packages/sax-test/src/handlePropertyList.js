let sax = require('sax')
let json5 = require('json5')
let utils = require('../../../utils/fileUtil')

let list = []
utils.reserveFile('D:/2066/Projects/ies-cloud-simulator/view-react/src/constants/svg-shapes', (path) => {
  if (path.indexOf('.txt') != -1) {
    return
  }
  let content = utils.getFileContent(path)
  let propertyList = []

  let parser = sax.parser(true)
  let start = false
  let setValue = false

  parser.onopentag = (tag) => {
    let type = tag.attributes.type
    if (start) {
      propertyList.push({
        name: tag.name,
        type: tag.attributes.dataType,
        description: tag.attributes.description,
        value: ''
      })
      setValue = true
    }
    if (type == 'metadata') {
      start = true
    }
  }

  parser.ontext = (text) => {
    if (setValue && propertyList.length) {
      setValue = false
      let lastProperty = propertyList[propertyList.length - 1]
      if (lastProperty.type == 'fixedtype') {
        lastProperty.options = text.split('/')
        lastProperty.value = text.split('/')[0]
      } else {
        lastProperty.value = text
      }
    }
  }

  parser.write(content).end()

  list.push({
    path: path.substring(73),
    propertyList
  })
})

console.log(json5.stringify(list, {space: 2}))
