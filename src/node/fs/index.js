const fs = require('fs')



let output = fs.readFileSync('./temp.txt', 'utf-8')
console.log(output);

fs.writeFileSync('./temp.txt', output, {flag: 'a'})
