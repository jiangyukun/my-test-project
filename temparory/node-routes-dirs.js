const fs = require('fs')
const {reserveFile} = require('../utils/fileUtil')

let dir = 'D:\\2066\\node\\ems2.0-mm-controller\\src\\routes'

let list = fs.readdirSync(dir)

list.forEach(item => {
  console.log(item)
})
