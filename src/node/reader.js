let path = require('path')

let fs = require('fs')

let result = fs.readFileSync(path.join(__dirname, './bit.js'))

let a = 'abcd'
let buffer = Buffer.from(a)

console.log(buffer.toString('base64'));

for (let i = 0 ; i< a.length; i++) {
    console.log(a.charCodeAt(i))
}
