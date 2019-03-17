let generateService = require('../common/generateService')
let util = require('../util')

class NodeServiceFileBuilder {
    constructor(apiUrls, paths, definitions, interfacePath) {
        this.apiUrls = apiUrls
        this.paths = paths
        this.definitions = definitions
        this.interfacePath = interfacePath
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

                let requestClassName = util.getResponseClassName(param.schema, this.definitions)
                let shortNameList = requestClassName.split('.')
                let shortName = shortNameList[shortNameList.length - 1]
                if (typeNameList.indexOf(shortName) === -1) {
                    typeNameList.push(shortName)
                }
            }
            let responses = apiInfo.responses
            let responseClassName = ''
            if (responses['200']) {
                responseClassName = util.getResponseClassName(responses['200'].schema, this.definitions)
                if (responseClassName === 'SchoolPal.Marketing.Pinke.Component.Commons.Result') {
                    continue
                }
                if (responseClassName === 'System.String' || responseClassName === 'System.Int64') {
                    continue
                }
                let shortNameList = responseClassName.split('.')
                let shortName = shortNameList[shortNameList.length - 1]
                if (typeNameList.indexOf(shortName) === -1) {
                    typeNameList.push(shortName)
                }
            }
        }
        return `
import request1 from '../utils/request1'
import {Data, PageList} from './CommonInterface'
import {${typeNameList.join(',\n')}
} from '${this.interfacePath}'
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
