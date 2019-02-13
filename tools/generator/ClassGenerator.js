let util = require('../util')

const firstLetterLowerCase = util.firstLetterLowerCase

class ClassGenerator {
    constructor(definition) {
        this.description = definition.description
        let properties = definition.properties
        let propertyKeys = Object.getOwnPropertyNames(properties)
        this.typeList = propertyKeys.map(key => {
            let property = properties[key]
            let type = property.type
            if (property.$ref) {
                type = 'class'
            }
            switch (type) {
                case 'integer':
                case 'string':
                case 'boolean':
                case 'number':
                    return new PrimitiveProperty(key, property)
                case 'class':
                    return new ClassProperty(key, property)
                case 'array':
                    return new ArrayProperty(key, property)
            }
            throw new Error(`属性数据类型未知：${property.type}`)
        })
    }

    generate(context) {
        let propertyStr = this.typeList.map(property => {
            return property.get(context) + '\n'
        }).join('')

        return `
/**
 * ${this.description || ''}
 */
class ${context.className} {
  constructor(${context.constructorParamName}) {
    ${propertyStr}
  }
}
`
    }
}

class PrimitiveProperty {
    constructor(key, property) {
        this.key = key
        this.property = property
    }

    get(context) {
        let newKey = firstLetterLowerCase(this.key)
        return `this.${newKey} = ${context.constructorParamName}.${this.key} // ${this.property.description || ''}`
    }
}

class ClassProperty {
    constructor(key, property) {
        this.key = key
        this.property = property
        this.targeClass = property.$ref.substring(14)
    }

    get(context) {
        context.registerClass(this.targeClass, this.property.$ref)
        let newKey = firstLetterLowerCase(this.key)
        return `this.${newKey} = new ${this.targeClass}(${context.constructorParamName}.${this.key}) // ${this.property.description || ''}`
    }
}

class ArrayProperty {
    constructor(key, property) {
        this.key = key
        this.property = property
        this.targeClass = property.items.$ref.substring(14)
    }

    get(context) {
        context.registerClass(this.targeClass, this.property.$ref)
        let newKey = firstLetterLowerCase(this.key)
        return `this.${newKey} = ${context.constructorParamName}.${this.key}.map(item=> new ${this.targeClass}(item)) // ${this.property.description || ''}`
    }
}

module.exports = ClassGenerator
