let utils = require('../utils/fileUtil')
let {convertCodeUseAst} = require('../utils/astUtil')

let projectPrefix = 'E:\\Project2021\\node-red\\packages\\node_modules\\'

utils.reserveFile(projectPrefix, (filePath) => {
  if (filePath.indexOf('.json') != -1) {
    return
  }
  if (filePath.indexOf('.js') == -1) {
    return
  }
  if (filePath.indexOf('vendor') != -1) {
    return
  }
  if (filePath.indexOf('public') != -1) {
    return
  }
  let str = utils.getFileContent(filePath)

  try {
    convertCodeUseAst(str, {
      CallExpression(path) {
        let callee = path.node.callee
        if (callee.type == 'MemberExpression') {
          if (callee.property.type == 'Identifier' && callee.property.name == 'delete') {
            let url = path.node.arguments[0]
            if (!url) {
              return
            }
            if (url.type == 'StringLiteral') {
              if (url.value[0] == '/') {
                log(url.value, filePath);
              }
            } else if (url.type == 'RegExpLiteral') {
              if (url.pattern[0] == '/') {
                log(url.pattern, filePath);
              }
            } else if (url.type == 'Identifier') {
              // console.log('Identifier:  ' + url.name);
            } else {
              // console.log(3);
            }

          }
        }
      }
    }, filePath)
  } catch (e) {

  }

})

function log(url, filePath) {
  console.log(url.padEnd(40, ' ') + filePath.substring(projectPrefix.length))
}