let recast = require('recast')
let fs = require('fs')


let builders = recast.types.builders
let {ifStatement, blockStatement, expressionStatement, callExpression, memberExpression} = builders
let {classDeclaration, classProperty, identifier, classBody} = builders

let code = fs.readFileSync('../../static/mxEditor.js').toString()

// console.log(code)

let astResult = recast.parse('')
let astResult1 = recast.parse(`
class A {
  a() {}
}
`)


let bodyAst: any[] = []


function handlePrototype(code: string) {
  let ast = recast.parse(code)
  recast.visit(ast, {
    visitAssignmentExpression(path: any) {
      let leftCode = recast.print(path.value.left).code
      let rightCode = recast.print(path.value.right).code

      if (leftCode.startsWith('mxEditor.prototype')) {
        let property = leftCode.substring(19)
        if (!property || property == 'constructor') {
          return false
        }
        bodyAst.push(classProperty(identifier(property), null))

      }
      return false
    },
    visitFunctionDeclaration(path: any): any {
      return false
    }
  })
  astResult.program.body.push(classDeclaration(null, classBody(bodyAst)))

  return recast.print(astResult).code
}


let r = handlePrototype(code)
console.log(r);
