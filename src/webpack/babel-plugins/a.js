const t = require('@babel/types')

let fileUId = 10
const fileAndIdList = []

// babel 插件格式
function setDataClickId(api, options) {
  //配置文件中传入的options
  const clickElements = options.clickElements
  //visitor模式匹配对应的ast语法结构
  return {
    visitor: {
      Program(path) {
        let moduleName = this.file.opts.filename
        let currentFileId
        const match = fileAndIdList.find(item => item.filepath == moduleName)
        if (match) {
          currentFileId = match.fileId
        } else {
          currentFileId = fileUId++
          fileAndIdList.push({
            filepath: moduleName,
            fileId: currentFileId
          })
        }
        let clickUId = 1

        // 遍历ast树，找到jsx元素，判断是否需要添加click id
        // click id生成规则 每个文件有一个唯一id，每个文件内需要添加click id属性的自增
        path.traverse({
          JSXOpeningElement(jsxPath) {
            let node = jsxPath.node
            const match = clickElements.find(ele => ele === node.name.name)
            if (!match) {
              return
            }
            if (!node.attributes) {
              node.attributes = []
            }
            for (let attr of node.attributes) {
              if (attr.name.name == 'data-clickId') {
                return
              }
            }
            // let buttonTxt = generator(node).code
            node.attributes.push(
              t.jsxAttribute(t.jsxIdentifier('data-clickId'), t.stringLiteral(currentFileId + clickUId.toString().padStart(2, '0')))
            )
            clickUId++
          }
        })
      }
    }
  }
}

module.exports = setDataClickId
