let recast = require('recast')
let fs = require('fs')
let path = require('path')
let mkdirp = require('mkdirp')

let handlePrototype = require('../recast/handlePrototype')

function getImportStr(filePath, code, moduleName) {
    let importGraphStr = `import mxGraph4 from 'mxgraph'`
    let moduleStr = handleModuleDep(code, moduleName).reduce((str, current, index) => {
        if (index % 10 == 9) {
            return str + ', ' + current + '\n'
        }
        return str + ', ' + current
    })
    return importGraphStr + '\nlet { ' + moduleStr + ' } = mxGraph4\n'
}

function handleModuleDep(code, moduleName) {
    let moduleList = []
    let ast = recast.parse(code)
    let variableDeclarationList = []
    recast.visit(ast, {
        visitVariableDeclaration(path) {
            let declarations = path.value.declarations
            declarations.forEach(d => {
                if (d.id.name.startsWith('mx')) {
                    if (variableDeclarationList.indexOf(d.id.name) == -1) {
                        variableDeclarationList.push(d.id.name)
                    }
                }
            })
            return false
        },
        visitAssignmentExpression(path) {
            let value = path.value
            if (value.left.type == 'Identifier' && value.left.name.startsWith('mx')) {
                if (variableDeclarationList.indexOf(value.left.name) == -1) {
                    variableDeclarationList.push(value.left.name)
                }
            }
            this.traverse(path)
        }
    })

    recast.visit(ast, {
        visitIdentifier(path) {
            let identify = path.value
            let name = identify.name
            if (name.startsWith('mx') && name != 'mxLoadResources' && name != 'mxTransient') {
                if (variableDeclarationList.indexOf(name) != -1) {
                    return false
                }
                if (moduleList.indexOf(name) == -1 && name != moduleName) {
                    moduleList.push(name)
                }
            }
            return false
        },

        visitFunctionDeclaration(path) {
            let code = recast.print(path.value).code
            if (path.value.id.name != moduleName) {
                return false
            } else {
                this.traverse(path)
            }
        }
    })
    return moduleList
}

function reserveFile() {
    let filePath = 'E:/WEB-Projects/mxgraph/javascript/examples/grapheditor/www/js/Graph.js'
    let distPath = path.join(process.cwd(), 'static')
    let moduleName = 'Graph'
    let code = fs.readFileSync(filePath).toString()
    let resultInfo = handlePrototype(moduleName, code, () => getImportStr(filePath, code, moduleName))
    let convertCode = resultInfo.code
    if (resultInfo.otherModules.length > 0) {
        resultInfo.otherModules.forEach((moduleName) => {
            let otherModulePath = (distPath + '/' + moduleName + '.js')
            let resultInfo1 = handlePrototype(moduleName, code, () => getImportStr('', code, moduleName))
            writeCodeToFile(otherModulePath, resultInfo1.code)
        })
    }
    writeCodeToFile(distPath + '/Graph.js', convertCode)
}

function writeCodeToFile(distPath, code) {
    if (!code) {
        return
    }
    let distDir = distPath.substring(0, distPath.lastIndexOf('/') + 1)
    mkdirp(distDir, () => {
        fs.writeFileSync(distPath, code)
    })
}

reserveFile()
