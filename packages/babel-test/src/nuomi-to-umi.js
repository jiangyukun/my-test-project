const babel = require('@babel/core')
const template = require('@babel/template').default
const t = require('@babel/types')

const fs = require('fs')
const path = require('path')
const reserveFile = require('./utils')

// let input = 'D:/2019/Porjects/ems2.0-mm-view/src/pages/rights-equipment/data-item-view/DataItemView.tsx'

function addSeparateLine(dir) {
  return `\\${dir}\\`
}

let pathNS = [
  {path: addSeparateLine('customerList'), ns: 'c_list'},
  {path: 'StationInfo.tsx', ns: 'c_station_list'},

  {path: addSeparateLine('batch-addition'), ns: 'r_e_batch_addition'},
  {path: addSeparateLine('data-item-view'), ns: 'r_e_data_item'},
  {path: addSeparateLine('parameter-library'), ns: 'r_e_parameter_library'},
  {path: addSeparateLine('rights-equipment-list'), ns: 'r_e_equipment_list'},

  {path: addSeparateLine('rights-menu'), ns: 'r_m'},

  {path: 'MenuSelect.tsx', ns: 'r_o_menu_select'},
  {path: addSeparateLine('rights-role-list'), ns: 'r_o_role_list'},

  {path: addSeparateLine('rights-station'), ns: 'r_u_station'},
  {path: addSeparateLine('rights-user-list'), ns: 'r_u_user_list'},
]

reserveFile('D:\\2019\\Porjects\\ems2.0-mm-view\\src\\pages', (path) => {
  if (!path.endsWith('.tsx')) {
    return
  }
  let list = pathNS.filter(item => path.indexOf(item.path) != -1)
  if (list.length == 0) {
    return
  }
  if (list.length == 1) {
    let namespace = list[0].ns
    // console.log(path, ' --- ', namespace)
    convertFile(path, namespace)
  } else {
    console.log('多个模式匹配： ' + path)
  }
})

function convertFile(inputPath, namespace) {
  const code = fs.readFileSync(inputPath).toString()
  let needImportNs = false
  let isImported = false
  let result = babel.transformSync(code, {
    filename: inputPath,
    plugins: [plugin1],
    presets: ['@babel/preset-typescript'],
    retainLines: true
  })
  fs.writeFile(inputPath, result.code, {}, () => null)

  function plugin1() {
    return {
      visitor: {
        Program(rootPath) {
          rootPath.traverse({
            CallExpression(path) {
              let functionName = path.node.callee.name
              if (functionName == 'dispatch') {
                path.traverse({
                  ObjectProperty(propertyPath) {
                    let keyName = propertyPath.node.key.name
                    let valueType = propertyPath.node.value.type
                    if (keyName == 'type') {
                      if (valueType == 'StringLiteral') {
                        let typeValue = propertyPath.node.value.value
                        // dispatch 当前模块
                        if (typeValue.indexOf('/') == -1) {
                          needImportNs = true
                          let getActionTypeAst = template.ast(`getActionType(${namespace}, '${typeValue}')`)
                          propertyPath.node.value = getActionTypeAst.expression
                        } else {
                          path.addComment(t.addComment(path.node, 'leading', ' todo', true))
                        }
                      }
                    }
                  }
                })
              }
            }
          })
          if (needImportNs) {
            rootPath.traverse({
              ImportSpecifier(importPath) {
                if (importPath.node.imported.name == namespace) {
                  isImported = true
                }
              }
            })
          }
          if (needImportNs) {
            if (isImported) {
              console.log(inputPath, namespace, '已经导入')
              return
            }
            let body = rootPath.node.body
            let relativePath = path.relative(inputPath, 'D:\\2019\\Porjects\\ems2.0-mm-view\\src\\pages\\constants').replace(/\\/g, '/').substring(3)
            let index = body.findIndex(statement => statement.type != 'ImportDeclaration')
            body.splice(index, -1, template.ast(`import {${namespace}} from '${relativePath}'`))
          }
        }
      }
    }
  }
}
