
let util = require('../util')

module.exports = function(url, httpType, apiInfo) {
  let urlParts = url.split('/')
  let functionName = util.firstLetterLowerCase(urlParts[urlParts.length - 1])
  let parameters = apiInfo.parameters

  let functionParam = []
  let requestParam = []
  if (parameters && parameters.length === 1 && parameters[0].in === 'body') {
    functionParam.push('data')
    requestParam.push('data')
  }

  let apiStr = `
/**
 * ${apiInfo.summary}
 */
async function ${functionName}(${functionParam.join(', ')}) {
  return axios.${httpType}('${url}'${requestParam.length > 0 ? ', ' : ''}${requestParam.join(', ')})
}
`
  return apiStr
}
