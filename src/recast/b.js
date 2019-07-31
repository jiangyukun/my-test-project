let recast = require('recast')
let fs = require('fs')

let cache = {}

function _findModuleInner(fileDir, moduleName) {
    let key = moduleName
    if (cache[key]) {
        return cache[key]
    }
    let list = fs.readdirSync(fileDir)
    for (let fileName of list) {
        let filePath = fileDir + '/' + fileName
        let stat = fs.statSync(filePath)
        if (stat && stat.isDirectory()) {
            // 递归子文件夹
            let result = _findModuleInner(filePath, moduleName)
            if (result) {
                return result
            }
        } else {
            if (!filePath.endsWith('.js')) {
                continue
            }

            let code = fs.readFileSync(filePath).toString()
            let ast = recast.parse(code)
            let result = null
            recast.visit(ast, {
                visitFunctionDeclaration(path) {
                    if (path.value.id.name == moduleName) {
                        result = filePath.substring(0, filePath.lastIndexOf('/') + 1) + moduleName + '.js'
                    }
                    return false
                }
            })
            if (result) {
                cache[key] = result
                return result
            }
        }
    }
    return null
}


module.exports = _findModuleInner


function handleFileImport(fileDir) {
    let list = fs.readdirSync(fileDir)
    for (let fileName of list) {
        let filePath = fileDir + '/' + fileName
        let stat = fs.statSync(filePath)
        if (stat && stat.isDirectory()) {
            // 递归子文件夹
            handleFileImport(filePath)

        } else {
            let moduleName = fileName.substring(0, fileName.length - 3)
            let code = fs.readFileSync(filePath).toString()
            let distCode = fs.readFileSync(filePath).toString()
            let deps = handleModuleDep(code, moduleName)
            let importStr = deps.reduce((str, current) => str += `import ${current} from '${handleModulePath(filePath, current)}'\n`, '')
            writeCodeToFile(filePath.replace('src', 'dist'), importStr + `\n` + distCode)
        }
    }
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
