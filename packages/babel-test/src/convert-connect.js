const template = require('@babel/template').default
const t = require('@babel/types')

const fs = require('fs')
const path = require('path')
const {addImportItem} = require('./utils')
const {isModuleImported} = require('./utils')
const {reserveFile, convertCodeUseAst} = require('./utils')

function addSeparateLine(dir) {
  return `${path.sep}${dir}${path.sep}`
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
  {path: addSeparateLine('rights-user-list'), ns: 'r_u_user_list'}
]

const projectPath = 'D:\\2019\\Porjects\\ems2.0-mm-view'

reserveFile(path.join(projectPath, 'src/pages'), (path) => {
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
  let needImport = false, newFunctionCallIndex = -1, newFunctionArg1

  let convertCode = convertCodeUseAst(code, {
    Program(rootPath) {
      rootPath.traverse({
        CallExpression(path) {
          let functionName = path.node.callee.name
          if (functionName == 'connect') {
            needImport = true
            let parentPath = path.parentPath
            let currentPath = path
            while (parentPath.type != 'Program') {
              currentPath = parentPath
              parentPath = parentPath.parentPath
            }
            let rootPath1 = parentPath
            newFunctionCallIndex = rootPath1.node.body.indexOf(currentPath.node)
            newFunctionArg1 = path.node.arguments[0]
            path.node.arguments[0] = t.identifier('mapStateToProps')
          }
        }
      })
      if (newFunctionCallIndex != -1) {
        let body = rootPath.node.body
        let functionVariable = t.variableDeclaration('const',
          [
            t.variableDeclarator(t.identifier('mapStateToProps'), t.callExpression(t.identifier('mapModelState'), [t.identifier(namespace), newFunctionArg1]))
          ]
        )
        body.splice(newFunctionCallIndex, -1, functionVariable)
      }
      if (needImport) {
        let isImported = isModuleImported(rootPath, 'mapModelState')
        if (!isImported) {
          let relativePath = path.relative(inputPath, path.join(projectPath, 'src/pages/umi.helper')).replace(/\\/g, '/').substring(3)
          addImportItem(rootPath, `\nimport {mapModelState} from '${relativePath}'`)
        }
      }
    }
  })
  fs.writeFile(inputPath, convertCode, {}, () => null)
}
