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
