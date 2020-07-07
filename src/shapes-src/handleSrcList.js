let nodePath = require('path')
let utils = require('../../utils/fileUtil')

let list = '[\n'
utils.reserveFile('D:/2066/Projects/ies-cloud-simulator/view-react/src/constants/svg-shapes', (path) => {
  if (path.indexOf('.txt') != -1) {
    return
  }
  let txtPath = path.replace('.svg', '.txt')
  if (txtPath.indexOf('Demux_3') != -1 || txtPath.indexOf('Demux_6') != -1) {
    txtPath = txtPath.replace('_3', '')
    txtPath = txtPath.replace('_6', '')
  }
  if (txtPath.indexOf('Mux_3') != -1 || txtPath.indexOf('Mux_6') != -1) {
    txtPath = txtPath.replace('_3', '')
    txtPath = txtPath.replace('_6', '')
  }

  let name = ''
  try {
    let content = utils.getFileContent(txtPath)
    let firstRow = content.split('\n')[0]
    name = firstRow.split('：')[1]
    if (!name) {
      name = firstRow.split(';')[1]
      if (!name) {
        name = firstRow.split(':')[1]
        if (!name) {
          console.log(firstRow)
        }
      }
    }
  } catch (e) {
    // console.log('找不到' + txtPath)
  }
  let p = path.replace(/\\/g, '/')
  name = name.replace(/\n|\r/, '')
  let item = `[require('./${p.substring(62)}'), './${p.substring(62)}', '${name}', '${nodePath.parse(path).name}'],`
  console.log(item)
  list += item

})

list += '\n]'
// console.log(list)
