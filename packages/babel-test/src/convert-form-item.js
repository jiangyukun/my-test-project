const t = require('@babel/types')
const {wrap, convertCodeUseAst} = require('./utils')

module.exports = wrap(convertFile)

function convertFile(code, namespace, filePath) {
  let converted = false
  let newCode = convertCodeUseAst(code, {
    Program(rootPath) {
      rootPath.traverse({
        JSXElement(path1) {
          let node1 = path1.node
          if (node1.openingElement.name) {
            let tagName1 = node1.openingElement.name.name
            if (tagName1 == 'Form') {
              let initValueList = []

              path1.traverse({
                JSXElement(path2) {
                  let node2 = path2.node
                  let inputName
                  let configs
                  let inputElement
                  let attributes
                  if (node2.openingElement.name) {
                    let tagName2 = node2.openingElement.name.name
                    if (tagName2 == 'FormItem') {

                      attributes = node2.openingElement.attributes
                      path2.traverse({
                        CallExpression(path3) {
                          let node3 = path3.node
                          let callee = node3.callee
                          let arguments = node3.arguments

                          if (callee.arguments && callee.arguments.length == 2 && arguments.length == 1) {
                            inputName = callee.arguments[0].value
                            configs = callee.arguments[1].properties
                            inputElement = arguments[0]

                          }
                        }
                      })

                      if (inputName) {
                        let initConfig = configs.find(config => config.key.name == 'initialValue')
                        let ruleConfig = configs.find(config => config.key.name == 'rules')
                        if (initConfig) {
                          initValueList.push({name: inputName, value: initConfig.value})
                        }
                        let nameAttribute = t.jsxAttribute(t.jsxIdentifier('name'), t.stringLiteral(inputName))

                        let newAttributes = [nameAttribute]
                        if (ruleConfig) {
                          let ruleAttribute = t.jsxAttribute(
                            t.jsxIdentifier('rules'),
                            t.jsxExpressionContainer(ruleConfig.value)
                          )
                          newAttributes.push(ruleAttribute)
                        }
                        path2.replaceWith(
                          t.jsxElement(
                            t.jsxOpeningElement(t.jsxIdentifier('FormItem'), [...newAttributes, ...attributes]),
                            t.jsxClosingElement(t.jsxIdentifier('FormItem')),
                            [inputElement],
                            false
                          )
                        )
                        converted = true
                      }
                    } //end JSXElement FormItem
                  }
                }
              })
              if (initValueList.length > 0) {
                converted = true
                path1.traverse({
                  JSXElement(pathSkip) {
                    pathSkip.skip()
                  },
                  JSXOpeningElement(path9) {
                    let node9 = path9.node
                    let attributes = node9.attributes
                    let hasFormAttribute = attributes.some(attr => attr.name.name == 'form')
                    let hasInitValueAttribute = attributes.some(attr => attr.name.name == 'initialValues')
                    if (!hasFormAttribute) {
                      node9.attributes.unshift(t.jsxAttribute(
                        t.jsxIdentifier('form'),
                        t.jsxExpressionContainer(t.nullLiteral())
                      ))
                    }
                    if (!hasInitValueAttribute) {
                      node9.attributes.unshift(t.jsxAttribute(
                        t.jsxIdentifier('initialValues'),
                        t.jsxExpressionContainer(t.objectExpression(initValueList.map(init => {
                          return t.objectProperty(t.identifier(init.name), init.value)
                        })))
                      ))
                    }
                    path9.skip()
                  }
                })
              }
            } // end JSXElement Form
          }
        }
      })
    }
  }, filePath)
  if (converted) {
    return newCode
  }
  return null
}
