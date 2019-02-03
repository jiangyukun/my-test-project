let generateModal = require('./common/generateModal')
let util = require('./util')

class ModelDirector {
    buildModelFile(modelBuild) {
        this.modelBuild = modelBuild
        modelBuild.buildHeader()
        modelBuild.buildBody()
        modelBuild.buildFooter()
    }

    getResult() {
        return this.modelBuild.getResult()
    }
}

class ES6ModelBuild {
    constructor(apiUrls, paths, definitions) {
        this.apiUrls = apiUrls
        this.paths = paths
        this.definitions = definitions
        this.registerModalClassList = []
        this.modalClassList = []
        this.header = ''
        this.body = ''
        this.footer = ''
        this.registerClass = this.registerClass.bind(this)
    }

    buildHeader() {

    }

    buildBody() {
        for (let url of this.apiUrls) {
            let apiItem = this.paths[url]
            let httpType = Object.getOwnPropertyNames(apiItem)[0]
            let apiInfo = apiItem[httpType]

            let responseClassName = util.getResponseClassName(apiInfo.responses['200'].schema, this.definitions)
            if (responseClassName && this.modalClassList.indexOf(responseClassName) === -1) {
                this.modalClassList.push(responseClassName)
                this.body += generateModal(responseClassName, this.definitions[responseClassName], this.registerClass)
            }
        }
        this.registerModalClassList.forEach(modalClass => {
            this.body += generateModal(modalClass, this.definitions[modalClass], this.registerClass)
        })
    }

    buildFooter() {
        this.footer = `module.exports = {\n    ${this.modalClassList.concat(this.registerModalClassList).join(',\n    ')}\n}`
    }

    getResult() {
        return this.header + this.body + this.footer
    }

    registerClass(modalName) {
        if (this.registerModalClassList.indexOf(modalName) === -1) {
            this.registerModalClassList.push(modalName)
        }
    }
}

class TypescriptInterfaceBuild {
    buildHeader() {

    }

    buildBody() {

    }

    buildFooter() {

    }
}

module.exports = {
    ModelDirector, ES6ModelBuild, TypescriptInterfaceBuild
}
