/**
 * typescript 接口文件
 */
let AbstractModelFileBuilder = require('./AbstractModelFileBuilder')
let InterfaceGenerator = require('../generator/InterfaceGenerator')

class TypescriptInterfaceFileBuilder extends AbstractModelFileBuilder {
    generateModal(shortName, modalClass, definition, registerClass) {
        return new InterfaceGenerator(definition).generate({
            interfaceName: shortName, registerClass
        })
    }

    buildFooter() {
        return ''
    }
}

module.exports = TypescriptInterfaceFileBuilder
