let recast = require('recast')

let builders = recast.types.builders
let {expressionStatement, callExpression} = builders
let {classDeclaration, classProperty, identifier, classBody, methodDefinition, functionExpression} = builders
let superE = builders.super

function handlePrototype(moduleName, code, findImport) {
    let bodyAst = []
    let ast = recast.parse(code)
    let astResult = recast.parse('')

    let unHandlePropertyList = []
    let otherModules = []
    let superClass = null
    let constructor = null
    recast.visit(ast, {
        visitCallExpression(path) {
            let value = path.value
            let called = value.callee
            if (!called.id) {
                this.traverse(path)
                return
            }
            if (!called.object) {
                return false
            }
            if (called.object.name == 'mxUtils' && called.property.name == 'extend') {
                if (value.arguments[0].name == moduleName) {
                    superClass = identifier(value.arguments[1].name)
                }
            }
            return false
        },
        visitObjectExpression(path) {
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
                    superClass = right.callee
                    return false
                }
                if (right.type == 'FunctionExpression') {
                    bodyAst.push(methodDefinition('method', identifier(property), right, true))
                } else {
                    bodyAst.push(classProperty(identifier(property), right, null, true))
                }
            } else if (leftCode.indexOf('.prototype.') != -1) {
                let otherModuleName = leftCode.split('.')[0]
                if (otherModules.indexOf(otherModuleName) == -1) {
                    otherModules.push(otherModuleName)
                }
                unHandlePropertyList.push(leftCode)
            }
            return false
        },
        visitFunctionDeclaration(path) {
            if (path.value.id.name == moduleName) {
                constructor = methodDefinition('constructor', identifier('constructor'), functionExpression(null, path.value.params, path.value.body))
                bodyAst.push(constructor)
            } else {
                // console.log(`${moduleName} 模块包含其他模块 ${path.value.id.name}`)
                otherModules.push(path.value.id.name)
            }
            return false
        }
    })
    if (bodyAst.length != 0) {
        if (superClass) {
            if (constructor) {
                let superEs5Call = constructor.value.body.body[0]
                if (superEs5Call.expression && superEs5Call.expression.type == 'CallExpression') {
                    let callee = superEs5Call.expression.callee
                    if (callee.object.name == superClass.name || callee.property.name == 'call') {
                        constructor.value.body.body[0] = expressionStatement(callExpression(superE(), superEs5Call.expression.arguments.slice(1)))
                    } else {
                        // 默认super()
                        constructor.value.body.body.unshift(expressionStatement(callExpression(superE(), [])))
                    }
                } else {
                    // 默认super()
                    constructor.value.body.body.unshift(expressionStatement(callExpression(superE(), [])))
                }
            }
        }
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
                let code = recast.print(value).code
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
