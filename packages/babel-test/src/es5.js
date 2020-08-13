const t = require('@babel/types')
const template = require('@babel/template').default
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default

const code = `
import a from 'b'
`

const ast = parser.parse(code, {
  sourceType: 'module',
  plugins: ['jsx', 'typescript'],
  tokens: true
})

traverse(ast, {
  Program(path) {
    let node = path.node
  },
  JSXElement(path) {
    let node = path.node
  },
  TemplateElement(path) {
    let node = path.node
    let value = node.value.raw
    node.value = {
      raw: 'dd', cooked: 'dd'
    }

    // path.replaceWith(
    //   t.templateElement({})
    // )
    console.log(value)
  }
})

console.log(generator(ast, {retainFunctionParens: true, retainLines: true, concise: true}).code)
