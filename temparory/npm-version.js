const nodePath = require('path')
const utils = require('../utils/fileUtil')

let classpath = ''
utils.reserveFile('D:/libs', (path)=> {
  let jarName = nodePath.relative('D:/libs', path)
  classpath+= ':/root/dingding-machine/libs/' + jarName
})
console.log('java -Dfile.encoding=UTF-8 -classpath .' + classpath + ' com.company.Task')