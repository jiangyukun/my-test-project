let recast = require('recast')
let fs = require('fs')
let path = require('path')
let mkdirp = require('mkdirp')

let _findModuleInner = require('../recast/b')
let handlePrototype = require('../recast/handlePrototype')



let rootDir = 'E:/WEB-Projects/mxgraph/javascript/src/js'

function getImportStr(filePath, code, moduleName) {
    return handleModuleDep(code, moduleName).reduce((str, current) => {
        let modulePath = handleModulePath(filePath, current)
        if (modulePath) {
            return str + `import ${current} from '${modulePath}'\n`
        }
        return str
    }, '')
}

function handleModulePath(currentModulePath, depModule) {
    return 'mxgraph'
}

function handleModuleDep(code, moduleName) {
    let moduleList = []
    let ast = recast.parse(code)
    recast.visit(ast, {
        visitIdentifier(path) {
            let identify = path.value
            let name = identify.name
            if (name.startsWith('mx') && name != 'mxLoadResources' && name != 'mxTransient') {
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
    let filePath = '/Users/wangji/web_study/mxgraph/javascript/examples/grapheditor/www/js/Graph.js'
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
