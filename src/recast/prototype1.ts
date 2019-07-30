let recast = require('recast')
let fs = require('fs')
let mkdirp = require('mkdirp')

let builders = recast.types.builders
let {expressionStatement, callExpression} = builders
let {classDeclaration, classProperty, identifier, classBody, methodDefinition, functionExpression} = builders
let superE = builders.super


let rootDir = 'E:/WEB-Projects/mxgraph/javascript/src/js'

function handlePrototype(filePath: string, moduleName: string, code: string) {
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
        visitIfStatement() {
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
            if (moduleName != 'mxSwimlaneLayout') {
                // console.log(moduleName, unHandlePropertyList)
            }
        }
        let convertCode = recast.print(astResult, {quote: "single", trailingComma: false}).code + `

export default ${moduleName}
`

        let list = handleModuleDep(code, moduleName)
        let importStr = list.reduce((str, current) => str += `import ${current} from '${handleModulePath(filePath, current)}'\n`, '')

        return importStr + '\n' + convertCode
    } else {
        // 常量类
        let returnOldCode = false
        recast.visit(ast, {
            visitVariableDeclaration(path: any) {
                let value = path.value
                let declaration = value.declarations[0]
                if (declaration.id.name == moduleName) {
                    returnOldCode = true
                }
                return false
            },
            visitFunctionDeclaration() {
                return false
            }
        })
        if (returnOldCode) {
            return recast.print(ast).code + `\n export default ${moduleName}`
        } else {
            console.log(moduleName + '不是一个模块')
        }
    }
}

function handleModulePath(currentModulePath: string, depModule: string) {
    let relativePath = currentModulePath.substring(currentModulePath.indexOf('/js/') + 4)
    let count = relativePath.split('/').length - 1
    let path = ''
    for (let i = 0; i < count; i++) {
        path += '../'
    }
    let depPath = findModule(rootDir, depModule)
    if (depPath) {
        let t = depPath.substring(currentModulePath.indexOf('/js/') + 4)
        t = t.substring(0, t.length - 3)
        path += t
        // console.log(path);
    }

    return path
}

function findModule(fileDir: string, moduleName: string) {
    let list = fs.readdirSync(fileDir)
    for (let fileName of list) {
        let filePath = fileDir + '/' + fileName
        let stat = fs.statSync(filePath)
        if (stat && stat.isDirectory()) {
            // 递归子文件夹
            let path: string = findModule(filePath, moduleName)
            if (path) {
                return path
            }
        } else {
            if (filePath.endsWith(moduleName + '.js')) {
                return filePath
            }
        }
    }
    return null
}

function handleModuleDep(code: string, moduleName: string): string[] {
    let moduleList: string[] = []
    let ast = recast.parse(code)

    recast.visit(ast, {
        visitIdentifier(path: any): any {
            let identify = path.value

            let name = identify.name

            if (name.startsWith('mx')) {
                if (moduleList.indexOf(name) == -1 && name != moduleName) {
                    moduleList.push(name)
                }
            }
            this.traverse(path)
        }
    })
    return moduleList
}

let ignoreList = [
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
                convertCode = handlePrototype(filePath, moduleName, code)
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

reserveFile(rootDir)
