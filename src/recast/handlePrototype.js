let recast = require('recast')
let recastUtil = require('./recastUtil')

let builders = recast.types.builders
let {classDeclaration, classProperty, identifier, classBody, methodDefinition} = builders


function handlePrototype(moduleName, code, findImport) {
    let bodyAst = []
    let ast = recast.parse(code)
    let astResult = recast.parse('')

    let unHandlePropertyList = []
    let otherModules = recastUtil.getOtherModuleList(moduleName, ast)
    let superClass = recastUtil.getSuperClass(moduleName, ast)
    let constructor = recastUtil.getConstructor(moduleName, ast, superClass)

    if (constructor) {
        bodyAst.push(constructor)
    }

    recast.visit(ast, {
        visitCallExpression(path) {
            this.traverse(path)
        },
        visitObjectExpression() {
            return false
        },
        visitAssignmentExpression(path) {
            let leftCode = recast.print(path.value.left).code
            let right = path.value.right

            if (leftCode.startsWith(`${moduleName}.prototype.`)) {
                let property = leftCode.substring(`${moduleName}.prototype`.length + 1)
                if (!property || property == 'constructor') {
                    return false
                }
                if (right.type == 'FunctionExpression') {
                    bodyAst.push(methodDefinition('method', identifier(property), right))
                } else {
                    bodyAst.push(classProperty(identifier(property), right))
                }
            } else if (leftCode.startsWith(`${moduleName}.`)) {
                let property = leftCode.substring(`${moduleName}`.length + 1)
                if (property === 'prototype') {
                    return false
                }
                if (right.type == 'FunctionExpression') {
                    bodyAst.push(methodDefinition('method', identifier(property), right, true))
                } else {
                    bodyAst.push(classProperty(identifier(property), right, null, true))
                }
            } else if (leftCode.indexOf('.prototype.') != -1) {
                unHandlePropertyList.push(leftCode)
            }
            return false
        }
    })

    if (bodyAst.length != 0) {
        astResult.program.body.push(classDeclaration(identifier(moduleName), classBody(bodyAst), superClass))
        if (unHandlePropertyList.length != 0) {
            // console.log(moduleName, unHandlePropertyList)
        }
        let convertCode = recast.print(astResult, {quote: "single", trailingComma: false}).code + `

export default ${moduleName}
`
        return {code: findImport() + '\n' + convertCode, otherModules}
    } else {
        // 常量类
        let returnOldCode = false
        recast.visit(ast, {
            visitVariableDeclaration(path) {
                let value = path.value
                let declaration = value.declarations[0]
                if (declaration.id.name == moduleName) {
                    returnOldCode = true
                }
                return false
            },
            visitFunctionDeclaration() {
                return false
            },
            visitCallExpression() {
                return false
            }
        })
        if (returnOldCode) {
            return {
                code: findImport() + '\n' + recast.print(ast).code + `\n export default ${moduleName}`,
                otherModules
            }
        } else {
            let isRegister = false
            recast.visit(ast, {
                visitCallExpression(path) {
                    let value = path.value
                    let callee = value.callee
                    if (callee.object.name == 'mxCodecRegistry' && callee.property.name == 'register') {
                        isRegister = true
                    }
                    return false
                }
            })
            if (isRegister) {
                return {code: findImport() + '\n' + recast.print(ast).code, otherModules}
            } else {
                console.log(moduleName + '不是一个模块')
                return {otherModules, code: null}
            }

        }
    }
}

module.exports = handlePrototype
