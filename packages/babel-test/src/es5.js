const t = require('@babel/types')
const template = require('@babel/template').default

const code = `
let obj = {
  effects: {
    async c({name}) {
      await a.b()
    },
    * d() {
      yield 23
    }
  }
}
`

const {convertCodeUseAst, restObj} = require('./utils')

let convertCode = convertCodeUseAst(code, {
  ObjectProperty(objectPath) {
    let ast1 = template.ast('{a, b, c}')
    console.log(2)
  }
})

console.log(convertCode)
