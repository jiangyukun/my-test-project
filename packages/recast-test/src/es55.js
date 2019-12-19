let recast = require('recast')
let tsParser = require('recast/parsers/typescript')


const code = `
let a: any=
(1  )
let b= 2
`
const parser = require('@babel/parser')
const ast = recast.parse(code, {
  parser: {
    parse(source) {
      return parser.parse(source, {plugins: ['typescript']})
    }
  }
})

// console.log(ast)
//
console.log(recast.print(ast, {}).code)
