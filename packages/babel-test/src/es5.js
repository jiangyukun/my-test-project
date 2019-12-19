

const code = `
let a: any = (
<a></a>
)
let b= 2
`

const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const t = require('@babel/types')
const generator = require('@babel/generator').default

let ast = parser.parse(code, {plugins: ['typescript', 'jsx'], createParenthesizedExpressions: true})




console.log(generator(ast, {retainLines: true}).code);
