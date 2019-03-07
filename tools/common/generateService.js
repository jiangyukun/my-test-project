let util = require('../util')

module.exports = function (url, httpType, apiInfo, definitions) {
    let urlParts = url.split('/')
    let functionName = util.firstLetterLowerCase(urlParts[urlParts.length - 1])
    let parameters = apiInfo.parameters

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

    let apiStr = `
/**
 * ${apiInfo.summary}
 */
export async function ${functionName}(${functionParam.map(p => `${p.name}: ${p.type}`).join(', ')}): Promise<any> {
  return request.${httpType}('${url}'${requestParam.length > 0 ? ', ' : ''}${requestParam.join(', ')})
}
`
    return apiStr
}
