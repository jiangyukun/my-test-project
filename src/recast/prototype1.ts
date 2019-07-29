let recast = require('recast')
let fs = require('fs')
let mkdirp = require('mkdirp')

let builders = recast.types.builders
let {ifStatement, blockStatement, expressionStatement, callExpression, memberExpression} = builders
let {classDeclaration, classProperty, identifier, classBody, methodDefinition, functionExpression} = builders
let superE = builders.super

function handlePrototype(moduleName: string, code: string) {
    let bodyAst: any[] = []
    let ast = recast.parse(code)
    let astResult = recast.parse('')

    let unHandlePropertyList: string[] = []
    let superClass: any = null
    let constructor: any = null
    recast.visit(ast, {
        visitCallExpression(path: any) {
            let value = path.value
            let called = value.callee
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
        visitObjectExpression(path: any) {
            return false
        },
        visitAssignmentExpression(path: any) {
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
            } else {
                unHandlePropertyList.push(leftCode)
            }
            return false
        },
        visitFunctionDeclaration(path: any): any {
            if (path.value.id.name == moduleName) {
                constructor = methodDefinition('constructor', identifier('constructor'), functionExpression(null, path.value.params, path.value.body))
                bodyAst.push(constructor)
            } else {
                console.log(`${moduleName} 模块包含其他模块 ${path.value.id.name}`)
            }
            return false
        }
    })
    if (bodyAst.length != 0) {
        let bodyList = []
        if (superClass) {
            let t = expressionStatement(callExpression(superE(), []))
            if (constructor) {
                constructor.value.body.body[0] = t
            }
        }
        astResult.program.body.push(classDeclaration(identifier(moduleName), classBody(bodyAst), superClass))
        if (unHandlePropertyList.length != 0) {
            if (moduleName != 'mxSwimlaneLayout') {
                console.log(moduleName, unHandlePropertyList)
            }
        }
        let convertCode = recast.print(astResult, {quote: "single", trailingComma: false}).code += `

export default ${moduleName}
`
        return convertCode
    } else {
        // console.log(moduleName + '不是一个模块')
    }
}

let ignoreList = [
    'mxClient',
    'mxCodecRegistry',
    'mxDefaultToolbarCodec',
    'mxStylesheetCodec'
]

function reserveFile(dir: string): void {
    let list = fs.readdirSync(dir)
    list.forEach(function (fileName: string) {

        let filePath = dir + '/' + fileName
        var stat = fs.statSync(filePath)
        if (stat && stat.isDirectory()) {
            // 递归子文件夹
            reserveFile(filePath)
        } else {
            if (!filePath.endsWith('.js')) {
                return
            }
            if (ignoreList.find(ignoreFileName => ignoreFileName + '.js' == fileName)) {
                return
            }
            let moduleName = fileName.substring(0, fileName.length - 3)
            let code = fs.readFileSync(filePath).toString()
            let convertCode = ''
            try {
                convertCode = handlePrototype(moduleName, code)
            } catch (e) {
                throw e
            }
            if (convertCode) {
                let distPath = filePath.replace('src', 'dist')
                let distDir = distPath.substring(0, filePath.lastIndexOf('/') + 1)
                mkdirp(distDir, () => {
                    fs.writeFileSync(distPath, convertCode)
                })
            }
        }
    })
}

reserveFile('/Users/wangji/web_study/mxgraph/javascript/src/js')
