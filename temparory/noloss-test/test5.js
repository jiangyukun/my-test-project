let  fs = require('fs')
let obj = require('../block-chain/data/nameList.json')

let list = []

for (let a in obj) {
  list.push({
    address: a, name: obj[a]
  })
}

console.log(JSON.stringify(list))
