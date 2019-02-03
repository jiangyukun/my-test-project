let fs = require('fs')
let path = require('path')
let util = require('./util')

let generateService = require('./common/generateService')
let generateModal = require('./common/generateModal')
let {ModelDirector, ES6ModelBuild, TypescriptInterfaceBuild} = require('./ModelDirector')

fs.exists(path.join(process.cwd(), 'dist/services'), exists => {
    if (!exists) {
        fs.mkdirSync(path.resolve(process.cwd() + '/dist/', 'services'))
    }
})
fs.exists(path.join(process.cwd(), 'dist/modal'), exists => {
    if (!exists) {
        fs.mkdirSync(path.resolve(process.cwd() + '/dist/', 'modal'))
    }
})

let json = require('./xbx.json')

const apiPaths = json.paths
const definitions = json.definitions


let keys = Object.getOwnPropertyNames(apiPaths)


let serviceSet = new Set()
for (let key of keys) {
    let category = key.split('/')
    serviceSet.add(category[1])
}

for (let service of serviceSet) {
    autoGenerator({
        filename: `${service}.js`,
        filter(apiPath) {
            return apiPath.indexOf(service) !== -1
        }
    })
}

function autoGenerator(options) {
    let filterKeys = keys.filter(options.filter)
    let serviceText = ''
    let exportFunctionList = []

    let director = new ModelDirector()
    director.buildModelFile(new ES6ModelBuild(filterKeys, apiPaths, definitions))
    let result = director.getResult()

    for (let url of filterKeys) {
        let urlParts = url.split('/')
        let functionName = util.firstLetterLowerCase(urlParts[urlParts.length - 1])
        exportFunctionList.push(functionName)
        let apiItem = apiPaths[url]
        let httpType = Object.getOwnPropertyNames(apiItem)[0]

        serviceText += generateService(url, httpType, apiItem[httpType])

    }

    let output = `
import axios from 'axios'
${serviceText}
module.exports = {\n    ${exportFunctionList.join(',\n    ')}\n}
`

    let filePath = path.resolve(process.cwd() + '/dist/services/', options.filename)
    fs.writeFile(filePath, output, (err, fd) => {
        if (err) {
            throw err
        } else {
            // console.log(options.filename + '模块写入完成')
        }
    })
    let modalPath = path.resolve(process.cwd() + '/dist/modal/', options.filename)
    if (result) {
        fs.writeFile(modalPath, result, (err, fd) => {
            if (err) {
                throw err
            } else {
                // console.log(options.filename + 'modal写入完成')
            }
        })
    }

}
