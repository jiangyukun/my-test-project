const t = require('@babel/types')
const template = require('@babel/template').default

const code = `
let a = {b:'2'}
`

const {convertCodeUseAst, restObj} = require('./utils')

let convertCode = convertCodeUseAst(code, {
  ObjectExpression(path) {
    let node = path.node
    console.log(1)
  }
})

console.log(convertCode)
