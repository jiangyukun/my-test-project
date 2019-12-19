

const code = `
// eee
let b ={...c}
let d = 2
function a() {}

`

const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const t = require('@babel/types')
const generator = require('@babel/generator').default

let ast = parser.parse(code)

traverse(ast, {
    FunctionDeclaration(path) {

        path.replaceWith(t.arrowFunctionExpression([], t.numericLiteral(1)))
    }
})


console.log(generator(ast, {}).code);
