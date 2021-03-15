const fs = require('fs')
const generateShape = require('./convert')


let shapes = ''
shapes += generateShape('T1', fs.readFileSync('./T1.svg').toString())
shapes += generateShape('T2', fs.readFileSync('./T2.svg').toString())
shapes += generateShape('T3', fs.readFileSync('./T3.svg').toString())
shapes += generateShape('T4', fs.readFileSync('./T4.svg').toString())

let result = `
<shapes name="mxgraph.custom">
${shapes}
</shapes>
`
console.log(result);
