let generateService = require('../common/generateService')
let util = require('../util')

class NodeServiceFileBuilder {
    constructor(apiUrls, paths, definitions) {
        this.apiUrls = apiUrls
        this.paths = paths
        this.definitions = definitions
        this.exportFunctionList = []
    }

    buildHeader() {
        let typeNameList = []
        for (let url of this.apiUrls) {
            let urlParts = url.split('/')
            let functionName = util.firstLetterLowerCase(urlParts[urlParts.length - 1])
            this.exportFunctionList.push(functionName)
            let apiItem = this.paths[url]
            let httpType = Object.getOwnPropertyNames(apiItem)[0]
            let apiInfo = apiItem[httpType]
            let parameters = apiInfo.parameters
            if (parameters && parameters.length === 1 && parameters[0].in === 'body') {
                let param = parameters[0]

                let responseClassName = util.getResponseClassName(param.schema, this.definitions)
                let shortNameList = responseClassName.split('.')
                let shortName = shortNameList[shortNameList.length - 1]
                typeNameList.push(shortName)
            }
        }
        return `
import request from '../utils/request'
import {${typeNameList.join(',\n')}
} from './CustomerType'
        `
    }

    buildBody() {
        let body = ''
        for (let url of this.apiUrls) {
            let urlParts = url.split('/')
            let functionName = util.firstLetterLowerCase(urlParts[urlParts.length - 1])
            this.exportFunctionList.push(functionName)
            let apiItem = this.paths[url]
            let httpType = Object.getOwnPropertyNames(apiItem)[0]
            body += generateService(url, httpType, apiItem[httpType], this.definitions)
        }
        return body
    }

    buildFooter() {
        // return `module.exports = {\n    ${this.exportFunctionList.join(',\n    ')}\n}`
        return ''
    }
}

module.exports = NodeServiceFileBuilder
