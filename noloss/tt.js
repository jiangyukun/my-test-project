


let fs = require('fs')

let txt = fs.readFileSync('./member-address.txt').toString()
console.log(txt)

let list = []

for (let item of txt.split('\r\n')) {
  list.push(item)
}

fs.writeFileSync('dd.json', JSON.stringify(list))
