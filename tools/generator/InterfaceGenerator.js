class InterfaceGenerator {
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
                    return new PrimitiveProperty(key, property, type)
                case 'class':
                    return new ClassProperty(key, property)
                case 'array':
                    return new ArrayProperty(key, property)
                case 'object':
                    return new ObjectProperty(key, property)
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
export interface ${context.interfaceName} {
    ${propertyStr}
}
`
    }
}

class PrimitiveProperty {
    constructor(key, property, type) {
        this.key = key
        this.property = property
        this.type = type
    }

    get(context) {
        let type = this.type
        if (type === 'integer') {
            type = 'number'
        }
        return `${this.key}?: ${type} // ${this.property.description || ''}`
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
        let shortNameList = this.targeClass.split('.')
        let shortName = shortNameList[shortNameList.length - 1]
        return `${this.key}?: ${shortName} // ${this.property.description || ''}`
    }
}

class ArrayProperty {
    constructor(key, property) {
        this.key = key
        this.property = property
        if (property.items.type === 'integer') {
            this.targeClass = 'integer'
        } else if (property.items.type === 'string') {
            this.targeClass = 'string'
        } else {
            this.targeClass = property.items.$ref.substring(14)
        }
    }

    get(context) {
        let shortName = ''
        if (this.targeClass === 'integer') {
            shortName = 'number'
        } else if (this.targeClass === 'string') {
            shortName = 'string'
        } else {
            context.registerClass(this.targeClass, this.property.$ref)
            let shortNameList = this.targeClass.split('.')
            shortName = shortNameList[shortNameList.length - 1]
        }
        return `${this.key}?: ${shortName}[] // ${this.property.description || ''}`
    }
}

class ObjectProperty {
    constructor(key, property) {
        this.key = key
        this.property = property
    }

    get(context) {
        return `${this.key}?: any // ${this.property.description || ''}`
    }
}

module.exports = InterfaceGenerator
