let recast = require('recast')
let recastUtil = require('./recastUtil')

let builders = recast.types.builders
let {classDeclaration, classProperty, identifier, classBody, methodDefinition, arrowFunctionExpression, callExpression, memberExpression} = builders
let {spreadElement} = builders

function handlePrototype(moduleName, code, findImport) {
    let bodyAst = []
    let ast = recast.parse(code)

    let newModuleName = moduleName
    if (newModuleName.startsWith('mx')) {
        newModuleName = newModuleName.substring(2)
    }

    let unHandlePropertyList = []
    let otherModules = recastUtil.getOtherModuleList(moduleName, ast)
    let superClass = recastUtil.getSuperClass(moduleName, ast)
    let constructor = recastUtil.getConstructor(moduleName, ast, superClass)
    let func = recastUtil.getFunction(moduleName, ast)
    if (!superClass && moduleName.startsWith('mx')) {
        superClass = identifier(moduleName)
    }

    recast.visit(ast, {
        visitCallExpression(path) {
            let object = path.value.callee.object
            let property = path.value.callee.property
            let arguments = path.value.arguments
            if (object) {
                if (object.name == 'mxUtils' && property.name == 'bind') {
                    path.replace(arrowFunctionExpression([], arguments[1].body, false))
                }
            }
            if (object && property && property.name == 'apply' && object.type == 'Identifier') {
                if (arguments.length == 2 && arguments[0].type == 'ThisExpression' && arguments[1].name == 'arguments') {
                    let parentPath = path.parentPath
                    while (parentPath) {
                        if (parentPath.value.type == 'AssignmentExpression') {
                            break
                        }
                        parentPath = parentPath.parentPath
                    }
                    if (parentPath && parentPath.value.left.property) {
                        let methodName = parentPath.value.left.property.name
                        if (methodName != 'click') {
                            path.replace(callExpression(memberExpression(identifier('super'), identifier(methodName)), [spreadElement(identifier('arguments'))]))
                        }
                    }
                }
            }
            this.traverse(path)
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
            this.traverse(path)
        }
    })
    if (func && bodyAst.length == 0) {
        // 普通函数
        return {code: findImport() + '\n' + recastUtil.getCode(func), otherModules}
    } else if (bodyAst.length > 0) {
        if (constructor) {
            bodyAst.unshift(constructor)
        }
        if (unHandlePropertyList.length != 0) {
            // console.log(moduleName, unHandlePropertyList)
        }
        let convertCode = recastUtil.getCode(classDeclaration(identifier(newModuleName), classBody(bodyAst), superClass)) + `

export default ${newModuleName}
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
