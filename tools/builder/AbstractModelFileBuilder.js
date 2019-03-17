let util = require('../util')

const responseClassIgnoreList = ['ResponseStateEnum', 'Int64', 'Int32', 'Boolean', 'String', 'Decimal', 'Object', 'System.String', 'System.Int64']

class AbstractModelFileBuilder {
    constructor(apiUrls, paths, definitions) {
        this.apiUrls = apiUrls
        this.paths = paths
        this.definitions = definitions
        this.registerModalClassList = []
        this.modalClassList = []

        this.registerClass = this.registerClass.bind(this)
    }

    buildHeader() {
        return ''
    }

    buildBody() {
        let body = ''
        for (let url of this.apiUrls) {
            let apiItem = this.paths[url]
            let httpType = Object.getOwnPropertyNames(apiItem)[0]
            let apiInfo = apiItem[httpType]

            let responseClassName = util.getResponseClassName(apiInfo.responses['200'].schema, this.definitions)
            let shortNameList = responseClassName.split('.')
            let shortName = shortNameList[shortNameList.length - 1]
            if (responseClassName && responseClassIgnoreList.indexOf(responseClassName) === -1 &&  this.modalClassList.indexOf(responseClassName) === -1) {
                this.modalClassList.push(responseClassName)
                body += this.generateModal(shortName, responseClassName, this.definitions[responseClassName], (modalName) => this.registerClass(modalName, this.registerModalClassList))
            }

            let parameters = apiInfo.parameters
            if (parameters && parameters.length === 1 && parameters[0].in === 'body') {
                let param = parameters[0]

                let requestClassName = util.getResponseClassName(param.schema, this.definitions)
                let shortNameList = requestClassName.split('.')
                let shortName = shortNameList[shortNameList.length - 1]
                this.modalClassList.push(responseClassName)
                body += this.generateModal(shortName, requestClassName, this.definitions[requestClassName], (modalName) => this.registerClass(modalName, this.registerModalClassList))
            }

        }
        while (this.registerModalClassList.length > 0) {
            let depList = []
            this.registerModalClassList.forEach(modalClass => {
                let shortNameList = modalClass.split('.')
                let shortName = shortNameList[shortNameList.length - 1]

                body += this.generateModal(shortName, modalClass, this.definitions[modalClass], (modalName) => this.registerClass(modalName, depList))
            })
            this.registerModalClassList = depList
        }
        return body
    }

    generateModal(shortName, modalClass, definition, registerClass) {
        throw new Error('override in subclass')
    }

    buildFooter() {
        return ''
    }

    //处理model依赖
    registerClass(modalName, list) {
        if (list.indexOf(modalName) === -1) {
            list.push(modalName)
        }
    }
}

module.exports = AbstractModelFileBuilder
