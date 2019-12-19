let recast = require('recast')
let tsParser = require('recast/parsers/typescript')


const code = `
let a: any=
(1  )
let b= 2
`

const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const t = require('@babel/types')
const generator = require('@babel/generator').default

let ast = parser.parse(code, {plugins: ['typescript']})


console.log(ast)

console.log(recast.print(ast, {trailingComma: true}).code)
