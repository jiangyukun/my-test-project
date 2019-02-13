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

let swaggerJson = require('./xbx.json')

const paths = swaggerJson.paths
const definitions = swaggerJson.definitions

let apiPaths = Object.getOwnPropertyNames(paths)

let serviceSet = new Set()
for (let key of apiPaths) {
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
    let filterApiPaths = apiPaths.filter(options.filter)
    let director = new FileDirector()

    let modalFilePath = path.resolve(process.cwd() + '/dist/modal/', options.filename + '.js')
    director.build(new ES6ModelFileBuilder(filterApiPaths, paths, definitions))
    director.write(modalFilePath)

    let serviceFilePath = path.resolve(process.cwd() + '/dist/services/', options.filename + '.js')
    director.build(new NodeServiceFileBuilder(filterApiPaths, paths, definitions))
    director.write(serviceFilePath)

    let tsFilePath = path.resolve(process.cwd() + '/dist/ts/', options.filename + '.ts')
    director.build(new TypescriptInterfaceFileBuilder(filterApiPaths, paths, definitions))
    director.write(tsFilePath)

}
