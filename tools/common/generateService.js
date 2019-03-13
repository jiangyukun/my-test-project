let util = require('../util')

module.exports = function (url, httpType, apiInfo, definitions) {
    let urlParts = url.split('/')
    let functionName = util.firstLetterLowerCase(urlParts[urlParts.length - 1])
    let parameters = apiInfo.parameters
    let responses = apiInfo.responses
    let responseClassName = '', responseShortClassName = ''
    let responseType = ''
    if (responses['200']) {
        responseClassName = util.getResponseClassName(responses['200'].schema, definitions)

        let shortNameList = responseClassName.split('.')
        responseShortClassName = shortNameList[shortNameList.length - 1]
        if (responses['200'].schema.$ref.indexOf('PageResult') !== -1) {
            responseType = `Promise<Data<PageList<${responseShortClassName}>>>`
        }else if (responseClassName === 'SchoolPal.Marketing.Pinke.Web.Helper.Amap.Model.District1') {
            responseType = `Promise<Data<District1[]>>`
        } else {
            responseType = `Promise<Data<${responseShortClassName}>>`
        }
    }

    let functionParam = []
    let requestParam = []
    if (parameters && parameters.length === 1 && parameters[0].in === 'body') {
        let param = parameters[0]

        let responseClassName = util.getResponseClassName(param.schema, definitions)
        let shortNameList = responseClassName.split('.')
        let shortName = shortNameList[shortNameList.length - 1]
        functionParam.push({
            name: param.name,
            type: shortName
        })
        requestParam.push(param.name)
    }

    if (functionName === 'getDistrict') {
        console.log(1);
    }

    let apiStr = `
/**
 * ${apiInfo.summary}
 */
export function ${functionName}(${functionParam.map(p => `${p.name}: ${p.type}`).join(', ')}): ${responseType} {
  return request.${httpType}('${url.substring(4)}'${requestParam.length > 0 ? ', ' : ''}${requestParam.join(', ')})
}
`
    return apiStr
}
