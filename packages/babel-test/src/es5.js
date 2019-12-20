const t = require('@babel/types')
const template = require('@babel/template').default

const code = `
let a = {b:1}
`

const {convertCodeUseAst, restObj} = require('./utils')

let convertCode = convertCodeUseAst(code, {
  ImportDefaultSpecifier(path) {
    console.log(1)
  }
})

console.log(convertCode)
