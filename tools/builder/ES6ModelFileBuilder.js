let ClassGenerator = require('../generator/ClassGenerator')

let AbstractModelFileBuilder = require('./AbstractModelFileBuilder')

class ES6ModelFileBuilder extends AbstractModelFileBuilder {
    generateModal(shortName, modalClass, definition, registerClass) {
        let constructorParamName = 'item'
        return new ClassGenerator(definition).generate({
            className: shortName,
            constructorParamName,
            registerClass
        })
    }

    buildFooter() {
        return `module.exports = {\n    ${this.modalClassList.concat(this.registerModalClassList).join(',\n    ')}\n}`
    }
}

module.exports = ES6ModelFileBuilder
