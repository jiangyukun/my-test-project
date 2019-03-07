/**
 * 将require改成import
 */
let recast = require('recast')
let acorn = require('acorn-object-spread')

let {importDeclaration, importSpecifier, importDefaultSpecifier, literal, callExpression, memberExpression, identifier} = recast.types.builders

let code = `
let a = require('abc')
import b from './b.js'
`


module.exports = function convertRequireToImport(content) {

    let ast = recast.parse(content, {
        parser: {
            parse(source) {
                return acorn.parse(source, {
                    plugins: {objectSpread: true}
                })
            }
        }
    })

    recast.visit(ast, {
        visitVariableDeclarator(path) {
            let variableName = path.value.id.name
            this.visit(path, {
                visitCallExpression(callPath) {
                    let value = callPath.value
                    let callee = value.callee
                    let modulePath = value.arguments[0].value
                    if (callee.name !== 'require') {
                        return false
                    }
                    let newImport = importDeclaration([importDefaultSpecifier(identifier(variableName))], literal(modulePath))
                    path.replace(newImport)
                    return false
                }
            })
            return false
        },
        visitCallExpression(path) {
            return false
        }
    })

    return recast.print(ast).code
}
