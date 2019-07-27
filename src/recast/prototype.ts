

let recast = require('recast')
let fs = require('fs')


let builders = recast.types.builders
let {ifStatement, blockStatement, expressionStatement, callExpression, memberExpression} = builders
let {classDeclaration, classProperty, identifier, classBody, methodDefinition} = builders

let code = fs.readFileSync('static/mxEditor.js').toString()

// console.log(code)

let astResult = recast.parse('')
let astResult1 = recast.parse(`
class A {
  a() {
    
  }
}
`)


let bodyAst: any[] = []


function handlePrototype(code: string) {
  let ast = recast.parse(code)
  recast.visit(ast, {
    visitAssignmentExpression(path: any) {
      let leftCode = recast.print(path.value.left).code
      let rightCode = recast.print(path.value.right).code
      let right = path.value.right


      if (leftCode.startsWith('mxEditor.prototype')) {
        let property = leftCode.substring(19)
        if (!property || property == 'constructor') {
          return false
        }
      if (right.type == 'FunctionExpression') {
        bodyAst.push( methodDefinition('method', identifier(property), right))

      } else {

        bodyAst.push(classProperty(identifier(property), right))
      }




      }
      return false
    },
    visitFunctionDeclaration(path: any): any {
      return false
    }
  })
  astResult.program.body.push(classDeclaration(identifier('Editor'), classBody(bodyAst)))

  return recast.print(astResult).code
}


let r = handlePrototype(code)

r += `
export default Editor
`


// fs.open('static/result.js', (err: any, fd: any)=> {
//   fs.writeSync(fd, new Buffer(code))
// })
fs.writeFileSync('static/result.js', r)
// console.log(r);
