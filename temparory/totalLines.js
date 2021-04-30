let utils = require('../utils/fileUtil')

let total = 0

utils.reserveFile('E:\\Project2021\\node-red\\packages\\node_modules\\@node-red\\editor-client\\src\\js', (filePath) => {

  if (filePath.indexOf('.js') == -1) {
    return
  }
  if (filePath.indexOf('vendor') != -1) {
    return
  }
  let str = utils.getFileContent(filePath)
  let lines = str.split('\n').length
  console.log(filePath.padStart(150, ' '), lines);
  total += lines
})

console.log(total);
