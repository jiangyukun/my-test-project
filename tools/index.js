let fs = require('fs')
let path = require('path')

let FileDirector = require('./FileDirector')
let ES6ModelFileBuilder = require('./builder/ES6ModelFileBuilder')
let NodeServiceFileBuilder = require('./builder/NodeServiceFileBuilder')
let TypescriptInterfaceFileBuilder = require('./builder/TypescriptInterfaceFileBuilder')

try {
    fs.mkdirSync(path.resolve(process.cwd() + '/dist/'))
    fs.mkdirSync(path.resolve(process.cwd() + '/dist/', 'services'))
    fs.mkdirSync(path.resolve(process.cwd() + '/dist/', 'modal'))
    fs.mkdirSync(path.resolve(process.cwd() + '/dist/', 'ts'))
} catch (e) {
    // ignore
}

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
        filename: `${service}`,
        filter(apiPath) {
            return apiPath.indexOf(service) !== -1
        }
    })
}

function autoGenerator(options) {
    let filterKeys = keys.filter(options.filter)
    let director = new FileDirector()

    let modalPath = path.resolve(process.cwd() + '/dist/modal/', options.filename + '.js')
    director.build(new ES6ModelFileBuilder(filterKeys, apiPaths, definitions))
    director.write(modalPath)

    let serviceFilePath = path.resolve(process.cwd() + '/dist/services/', options.filename + '.js')
    director.build(new NodeServiceFileBuilder(filterKeys, apiPaths, definitions))
    director.write(serviceFilePath)

    let tsFilePath = path.resolve(process.cwd() + '/dist/ts/', options.filename + '.ts')
    director.build(new TypescriptInterfaceFileBuilder(filterKeys, apiPaths, definitions))
    director.write(tsFilePath)

}
