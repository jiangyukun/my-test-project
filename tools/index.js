let fs = require('fs')
let path = require('path')
let axios = require('axios')

let FileDirector = require('./FileDirector')
let TsServiceFileBuilder = require('./builder/TsServiceFileBuilder')
let TypescriptInterfaceFileBuilder = require('./builder/TypescriptInterfaceFileBuilder')

let util = require('./util')

try {
    fs.mkdirSync(path.resolve(process.cwd() + '/dist/'))
    fs.mkdirSync(path.resolve(process.cwd() + '/dist/', 'services'))
    fs.mkdirSync(path.resolve(process.cwd() + '/dist/', 'modal'))
    fs.mkdirSync(path.resolve(process.cwd() + '/dist/', 'ts'))
} catch (e) {
    // ignore
}
function generateCode() {

    axios.get('http://192.168.30.30:8081/swagger/docs/v1').then(res => {
        let swaggerJson = res.data
        const paths = swaggerJson.paths
        const definitions = swaggerJson.definitions

        let apiPaths = Object.getOwnPropertyNames(paths)

        let serviceSet = new Set()
        for (let key of apiPaths) {
            let category = key.split('/')
            serviceSet.add(category[2])
        }

        for (let service of serviceSet) {
            if (service === 'Values') {
                continue
            }
            autoGenerator({
                filename: `${service}`,
                filter(apiPath) {
                    return apiPath.indexOf(`/${service}/`) !== -1 && apiPath.indexOf('/api/Common/UploadImage') === -1
                }
            })
        }

        function autoGenerator(options) {
            let filterApiPaths = apiPaths.filter(options.filter)

            let director = new FileDirector()

            let serviceFilePath = path.resolve(process.cwd() + '/dist/ts/', util.firstLetterLowerCase(options.filename) + '-api.ts')
            director.build(new TsServiceFileBuilder(filterApiPaths, paths, definitions, `./types/${options.filename}Type`))
            director.write(serviceFilePath)

            let tsFilePath = path.resolve(process.cwd() + '/dist/ts/types/', options.filename + 'Type.ts')
            director.build(new TypescriptInterfaceFileBuilder(filterApiPaths, paths, definitions))
            director.write(tsFilePath)

        }

    })

}

generateCode()

module.exports = generateCode
