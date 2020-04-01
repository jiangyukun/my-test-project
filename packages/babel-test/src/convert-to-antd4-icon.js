const t = require('@babel/types')
const {isModuleImported} = require('../../../utils/astUtil')
const {addImportItem} = require('../../../utils/astUtil')
const {wrap, convertCodeUseAst} = require('./utils')

module.exports = wrap(convertFile)

function convertFile(code, namespace, filePath) {
  let converted = false
  let iconTypeList = []
  let newCode = convertCodeUseAst(code, {
    Program(rootPath) {
      rootPath.traverse({
        JSXOpeningElement(path1) {
          let newTagName = null, attributes = []
          let node1 = path1.node
          if (node1.name) {
            let tagName = node1.name.name
            if (tagName == 'Icon') {
              attributes = [...node1.attributes]
              if (attributes) {
                let typeValue
                let themeValue
                path1.traverse({
                  JSXAttribute(path2) {
                    let node2 = path2.node
                    if (node2.name.name == 'type') {
                      if (node2.value.type == 'StringLiteral') {
                        typeValue = node2.value.value
                          path2.remove()
                      }
                    }
                    if (node2.name.name == 'theme') {
                      themeValue = node2.value.value
                      path2.remove()
                    }
                  }
                })
                if (typeValue == null) {
                  return
                }
                let typeValue1 = typeValue
                  .replace(/^\w/, (w) => w.toUpperCase())
                  .replace(/-\w/g, (w) => w.toUpperCase())
                  .replace(/-/g, '')

                let theme = 'Outlined'
                if (themeValue == 'filled') {
                  theme = 'Filled'
                }
                if (themeValue == 'twoTone') {
                  theme = 'TwoTone'
                }
                newTagName = typeValue1 + theme

                if (iconTypeList.indexOf(newTagName) == -1) {
                  iconTypeList.push(newTagName)
                }
                converted = true
              }
            }
          }
          if (newTagName) {
            let attributes1 = attributes.filter(attr => {
              let name = attr.name.name
              return name != 'type' && name != 'theme'
            })

            path1.replaceWith(
              t.jsxOpeningElement(t.jsxIdentifier(newTagName), attributes1, node1.selfClosing)
            )
          }
        }
      })
      for (let iconType of iconTypeList) {
        let isImported = isModuleImported(rootPath, iconType)
        if (!isImported) {
          if (iconType.indexOf('Wanke') != -1) {
            addImportItem(rootPath, `\nimport {${iconType}} from 'wanke-gui/lib/icon/icons'`)
          } else {
            console.log(iconType)
          }
        }
      }
    }
  }, filePath)
  if (converted) {
    return newCode
  }
  return null
}
