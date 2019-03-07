let count = 0

function logFirst() {
    if (count === 1) {
        return
    }
    count++
    console.log(...arguments)
}

function firstLetterLowerCase(str) {
    if (!str) return str

    let firstLetter = str[0]
    return firstLetter.toLowerCase() + str.substring(1)
}

const responseClassIgnoreList = ['ResponseStateEnum', 'Int64', 'Int32', 'Boolean', 'String', 'Decimal', 'Object']

function getResponseClassName(schema, definitions) {
    let ref = ''
    let type = schema.type
    if (type === 'boolean') {
        return ''
    }
    if (type === 'array') {
        if (schema.items.$ref) {
            ref = schema.items.$ref
        } else {
            if (schema.items.type === 'integer') {
                // ignore
            } else {
                console.warn(`unhandled ${schema.items}`)
            }
        }
    } else {
        ref = schema.$ref
    }
    let responseClassName = getClassName(ref)

    if (!responseClassName || responseClassIgnoreList.indexOf(responseClassName) !== -1) {
        return ''
    }
    if (!definitions[responseClassName]) {
        console.error(responseClassName)
        return ''
    }
    return responseClassName
}

function getClassName(str) {
    if (!str) {
        return ''
    }
    let responseClassName = getContent(str)
    if (!responseClassName) {
        return ''
    }
    if (responseClassName.indexOf('[') !== -1) {
        responseClassName = getContent(responseClassName)
    }
    return responseClassName
}

function getContent(str) {
    if (str.indexOf('[') === -1) {
        return str.substring(14)
    }
    let left = str.indexOf('[')
    let right = str.lastIndexOf(']')
    let typeStr = str.substring(left + 1, right)
    let index = typeStr.indexOf(',')
    return typeStr.substring(index + 1)
}

module.exports = {
    logFirst, firstLetterLowerCase, getResponseClassName
}
