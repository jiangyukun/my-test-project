let recast = require('recast')
let fs = require('fs')


let builders = recast.types.builders
let {ifStatement, blockStatement, expressionStatement, callExpression, memberExpression} = builders
let {classDeclaration, classProperty, identifier, classBody, methodDefinition} = builders

let code = `
let a = ()=> 1
`

// console.log(code)

let astResult = recast.parse(code)
let astResult1 = recast.parse(`a()`)


let bodyAst = []


function handlePrototype1(code) {
    let ast = recast.parse(code)
    recast.visit(ast, {
        visitObjectExpression() {
            console.log(123);
            return false
        },
        visitAssignmentExpression(path) {
            console.log(1);
            let leftCode = recast.print(path.value.left).code
            let rightCode = recast.print(path.value.right).code
            let right = path.value.right


            if (leftCode.startsWith('mxEditor.prototype')) {
                let property = leftCode.substring(19)
                if (!property || property == 'constructor') {
                    return false
                }
                if (right.type == 'FunctionExpression') {
                    bodyAst.push(methodDefinition('method', identifier(property), right))

                } else {

                    bodyAst.push(classProperty(identifier(property), right))
                }
            }
            return false
        },
        visitFunctionDeclaration(path) {
            return false
        }
    })
    astResult.program.body.push(classDeclaration(identifier('Editor'), classBody(bodyAst)))

    return recast.print(astResult).code
}


let r = handlePrototype1(code)

r += `
export default Editor
`


// fs.open('static/result.js', (err: any, fd: any)=> {
//   fs.writeSync(fd, new Buffer(code))
// })
fs.writeFileSync('static/result.js', r)
// console.log(r);
