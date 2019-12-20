const fs = require('fs')
const path = require('path')

const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const t = require('@babel/types')
const recast = require('recast')

function reserveFile(dir, callback) {
  let list = fs.readdirSync(dir)
  list.forEach(function (fileName) {
    let filePath = path.join(dir, fileName)
    let stat = fs.statSync(filePath)
    if (stat && stat.isDirectory()) {
      // 递归子文件夹
      reserveFile(filePath, callback)
    } else {
      callback(filePath)
    }
  })
}

function convertCodeUseAst(code, visitor) {
  const ast = recast.parse(code, {
    parser: {
      parse(source) {
        return parser.parse(source, {
          sourceType: 'module',
          plugins: ['jsx', 'typescript'],
          tokens: true
        })
      }
    }
  })
  traverse(ast, visitor)
  return recast.print(ast, {}).code
}

function restNameAst(name) {
  return t.objectProperty(t.identifier(name), t.identifier(name), false, true)
}

function restObj(keys) {
  return t.objectPattern(keys.map(key => restNameAst(key)))
}

module.exports = {
  reserveFile, convertCodeUseAst, restNameAst, restObj
}
