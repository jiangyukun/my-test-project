const t = require('@babel/types')

const {getAstBody} = require('./utils')
const {wrap, convertCodeUseAst} = require('./utils')

module.exports = wrap(convertFile)

function getPayloadObj(payloadExpression) {
  let payloadAst = getAstBody(`let {payload: {}} = {}`)[0]
  let objectPattern = payloadAst.declarations[0].id
  objectPattern.properties[0].value.properties = payloadExpression
  return objectPattern
  // return t.objectExpression([
  //   t.objectProperty(t.identifier('payload'), t.objectExpression(payloadExpression))
  // ])
}

function getPayloadObj1(name) {
  let payloadAst = getAstBody(`let {payload: {${name}}} = {}`)[0]
  let objectPattern = payloadAst.declarations[0].id
  return objectPattern
}

function convertFile(code, namespace, filePath) {

  let resultCode = convertCodeUseAst(code, {
    Program(rootPath) {
      rootPath.traverse({
        ObjectProperty(objectPath) {
          let keyName = objectPath.node.key.name
          if (keyName === 'effects') {
            objectPath.traverse({
              ObjectMethod(methodPath) {
                const node = methodPath.node
                const params = node.params
                if (params.length == 2) {
                  const payloadInfo = params[0]
                  if (payloadInfo.type == 'ObjectPattern') {
                    const properties = payloadInfo.properties
                    if (properties.length == 0) {
                      console.log(3)
                    } else if (properties.length == 1) {
                      let keyName = properties[0].key.name
                      let valueName = properties[0].value.name
                      if (keyName != valueName) {
                        console.log(keyName, valueName)
                      }
                      if (valueName != 'payload') {
                        console.log(valueName)
                        params[0] = getPayloadObj1(valueName)
                      } else {
                        //不需要调整
                        // console.log(6)
                      }
                    } else {
                      params[0] = getPayloadObj(properties)
                      console.log(filePath, properties[0].key.loc.start.line)
                    }
                  } else if (payloadInfo.type == 'Identifier') {
                    params[0] = getPayloadObj1(payloadInfo.name)
                  }
                }
              }
            })
          }
        }
      })
    }
  })

  return resultCode
}
