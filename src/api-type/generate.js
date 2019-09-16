let obj = {
    a: {
        b: [{c: ''}]
    }
}

function generateObjectType(obj) {
    let keys = Object.getOwnPropertyNames(obj)

    let props = keys.reduce((result, key) => {
        let value = obj[key]
        let prop = `${key}: `
        if (typeof value === 'number') {
            prop += 'number'
        } else if (typeof value === 'boolean') {
            prop += 'boolean'
        } else if (typeof value === 'string') {
            prop += 'string'
        } else if (value instanceof Array) {
            prop += '{\n' + generateArrayType(value) + '}[]\n'
        } else if (typeof value == 'object') {
            prop += '{\n' + generateObjectType(value) + '}\n'
        }
        return prop
    }, '')
    return props

}

function generateArrayType(arr) {
    let obj = arr[0]
    return generateObjectType(obj)
}


function generate(modal, interfaceName) {
    let props
    if (modal instanceof Array) {
        props = generateArrayType(modal)
    } else {
        props = generateObjectType(modal)
    }
    return `interface ${interfaceName} {
    ${props}
    }`
}

let interfaceTxt = generate(obj, 'A')

console.log(interfaceTxt);

