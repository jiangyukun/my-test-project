
function firstLetterLowerCase(str) {
    if (!str) return str

    let firstLetter = str[0]
    return firstLetter.toLowerCase() + str.substring(1)
}

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
    if (ref === '#/definitions/SchoolPal.Marketing.Pinke.Component.Commons.Result[SchoolPal.Marketing.Pinke.Web.Helper.Amap.Model.District1[]]') {
        return 'SchoolPal.Marketing.Pinke.Web.Helper.Amap.Model.District1'
    }
    let responseClassName = getClassName(ref)

    if (!responseClassName) {
        return ''
    }
    /*if (!definitions[responseClassName]) {
        console.error(responseClassName)
        return ''
    }*/
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
    while (responseClassName.indexOf('[') !== -1) {
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
    getClassName, firstLetterLowerCase, getResponseClassName
}
