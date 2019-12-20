const fs = require('fs')
const path = require('path')
const t = require('@babel/types')
const {isModuleImported} = require('./utils')
const template = require('@babel/template').default
const {reserveFile, convertCodeUseAst, putObjAst, addImportItem, sepLine} = require('./utils')

let pathNS = [
  {path: sepLine('models', 'customer-list.ts'), ns: 'c_list'},
  {path: sepLine('models', 'customer-station-list.ts'), ns: 'c_station_list'},

  {path: sepLine('models', 'batch-addition.ts'), ns: 'r_e_batch_addition'},
  {path: sepLine('models', 'data-item-view.ts'), ns: 'r_e_data_item'},
  {path: sepLine('models', 'parameter-library.ts'), ns: 'r_e_parameter_library'},
  {path: sepLine('models', 'rights-equipment-list.ts'), ns: 'r_e_equipment_list'},

  {path: sepLine('rights-menu', 'model.ts'), ns: 'r_m'},

  {path: sepLine('models', 'menu-select.ts'), ns: 'r_o_menu_select'},
  {path: sepLine('models', 'rights-role-list.ts'), ns: 'r_o_role_list'},

  {path: sepLine('models', 'rights-station.ts'), ns: 'r_u_station'},
  {path: sepLine('models', 'rights-user-list.tsx'), ns: 'r_u_user_list'}
]

const projectPath = 'D:\\2019\\Porjects\\ems2.0-mm-view'

reserveFile(path.join(projectPath, 'src/pages'), (path) => {
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
  console.log(inputPath)
  const code = fs.readFileSync(inputPath).toString()
  let needDeclareVariable =false

  let convertCode = convertCodeUseAst(code, {
    Program(rootPath) {
      rootPath.traverse({
        ObjectProperty(objectPath) {
          let keyName = objectPath.node.key.name
          if (keyName === 'effects') {
            objectPath.traverse({
              CallExpression(callPath) {
                const node = callPath.node
                if (node.callee.type == 'MemberExpression') {
                  const {object, property} = node.callee
                  if (object.type == 'ThisExpression' && property.name == 'updateQuery') {
                    needDeclareVariable = true
                    let putAst = t.callExpression(t.identifier('updateQuery'), [t.identifier('select'), t.identifier('put'), node.arguments[0]])
                    callPath.replaceWith(putAst)
                  }
                }
              }
            })
          }
        }
      })
      if (needDeclareVariable) {
          addImportItem(rootPath, `\nconst updateQuery = getUpdateQuery(${namespace})`)
      }
    }
  })
  fs.writeFile(inputPath, convertCode, {}, () => null)
}
