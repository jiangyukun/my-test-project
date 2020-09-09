

let path = require('path')
let fileUtils = require('../utils/fileUtil')

let filePath = 'D:\\2066\\Projects\\solar-platform-view\\node_modules\\antd\\dist\\antd.css'

let content = fileUtils.getFileContent(filePath)
// console.log(content)

content = content.replace(/\.ant-(.*?)[,|{]/g, (d)=> {
  // console.log(d)
  return '.light-theme ' + d
})

console.log(content)