let ClassGenerator = require('../generator/ClassGenerator')

let AbstractModelFileBuilder = require('./AbstractModelFileBuilder')

class ES6ModelFileBuilder extends AbstractModelFileBuilder {
    generateModal(modalClass, definition, registerClass) {
        let constructorParamName = 'item'
        return new ClassGenerator(definition).generate({
            className: modalClass,
            constructorParamName,
            registerClass
        })
    }

    buildFooter() {
        return `module.exports = {\n    ${this.modalClassList.concat(this.registerModalClassList).join(',\n    ')}\n}`
    }
}

module.exports = ES6ModelFileBuilder
