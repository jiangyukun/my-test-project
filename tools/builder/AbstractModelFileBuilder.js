let util = require('../util')

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
            if (responseClassName && this.modalClassList.indexOf(responseClassName) === -1) {
                this.modalClassList.push(responseClassName)
                body += this.generateModal(responseClassName, this.definitions[responseClassName], this.registerClass)
            }
        }
        this.registerModalClassList.forEach(modalClass => {
            body += this.generateModal(modalClass, this.definitions[modalClass], this.registerClass)
        })
        return body
    }

    generateModal(modalClass, definition, registerClass) {
        throw new Error('override in subclass')
    }

    buildFooter() {
        return ''
    }

    //处理model依赖
    registerClass(modalName) {
        if (this.registerModalClassList.indexOf(modalName) === -1) {
            this.registerModalClassList.push(modalName)
        }
    }
}

module.exports = AbstractModelFileBuilder
