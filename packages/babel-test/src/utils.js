const fs = require('fs')
const path = require('path')

const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const t = require('@babel/types')
const template = require('@babel/template').default
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

const traverseAndSelect = (dir) => (pathInfoList) => (callback) => {
  reserveFile(dir, (filePath) => {
    let list = pathInfoList.filter(item => filePath.indexOf(item.path) != -1)
    if (list.length == 0) {
      return
    }
    if (list.length == 1) {
      let namespace = list[0].ns
      // console.log(path, ' --- ', namespace)
      const code = fs.readFileSync(filePath).toString()
      let convertedCode = callback(code, namespace, filePath)
      console.log(3)
      if (convertedCode != code) {
        fs.writeFileSync(filePath, convertedCode, {})
        console.log(filePath, '  --converted')
      }
    } else {
      console.log('多个模式匹配： ' + filePath)
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
  return recast.print(ast, {wrapColumn: 180}).code
}

function getAstBody(code) {
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
  return ast.program.body
}

function restNameAst(name) {
  return t.objectProperty(t.identifier(name), t.identifier(name), false, true)
}

function restObj(keys) {
  return t.objectPattern(keys.map(key => restNameAst(key)))
}

function isModuleImported(rootPath, moduleName, searchType = 'import') {
  let isImported = false
  if (searchType == 'import' || searchType == 'all') {
    rootPath.traverse({
      ImportSpecifier(importPath) {
        if (importPath.node.imported.name == moduleName) {
          isImported = true
        }
      }
    })
  }
  if (searchType == 'importDefault' || searchType == 'all') {
    rootPath.traverse({
      ImportDefaultSpecifier(importPath) {
        if (importPath.node.local.name == moduleName) {
          isImported = true
        }
      }
    })
  }

  return isImported
}

function addImportItem(rootPath, importStr) {
  let body = rootPath.node.body
  let index = body.findIndex(statement => statement.type != 'ImportDeclaration')
  body.splice(index, -1, template.ast(importStr))
}

function sepLine(dir, sub) {
  return `${path.sep}${dir}${path.sep}${sub || ''}`
}

function putObjAst(typeName, payloadExpression) {
  return t.objectExpression([
    t.objectProperty(t.identifier('type'), t.stringLiteral(typeName)),
    t.objectProperty(t.identifier('payload'), payloadExpression),
  ])
}

module.exports = {
  reserveFile,
  traverseAndSelect,
  convertCodeUseAst,
  getAstBody,
  restNameAst,
  restObj,
  isModuleImported,
  addImportItem,
  putObjAst,
  sepLine
}
