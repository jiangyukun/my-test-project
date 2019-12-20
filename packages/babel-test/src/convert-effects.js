const template = require('@babel/template').default
const t = require('@babel/types')

const fs = require('fs')
const path = require('path')
const {reserveFile, convertCodeUseAst, restObj} = require('./utils')

function addSeparateLine(dir, sub) {
  return `${path.sep}${dir}${path.sep}${sub || ''}`
}

let pathNS = [
  {path: addSeparateLine('models', 'customer-list.ts'), ns: 'c_list'},
  {path: addSeparateLine('models', 'customer-station-list.ts'), ns: 'c_station_list'},

  {path: addSeparateLine('models', 'batch-addition.ts'), ns: 'r_e_batch_addition'},
  {path: addSeparateLine('models', 'data-item-view.ts'), ns: 'r_e_data_item'},
  {path: addSeparateLine('models', 'parameter-library.ts'), ns: 'r_e_parameter_library'},
  {path: addSeparateLine('models', 'rights-equipment-list.ts'), ns: 'r_e_equipment_list'},

  {path: addSeparateLine('rights-menu', 'model.ts'), ns: 'r_m'},

  {path: addSeparateLine('models', 'menu-select.ts'), ns: 'r_o_menu_select'},
  {path: addSeparateLine('models', 'rights-role-list.ts'), ns: 'r_o_role_list'},

  {path: addSeparateLine('models', 'rights-station.ts'), ns: 'r_u_station'},
  {path: addSeparateLine('models', 'rights-user-list.tsx'), ns: 'r_u_user_list'}
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
  let needImport = false, isImported = false

  let convertCode = convertCodeUseAst(code, {
    Program(rootPath) {
      rootPath.traverse({
        ObjectProperty(objectPath) {
          let keyName = objectPath.node.key.name
          if (keyName === 'effects') {
            objectPath.traverse({
              ObjectMethod(methodPath) {
                if (methodPath.node.async) {
                  let node = methodPath.node
                  node.async = false
                  node.generator = true
                  let param1 = restObj(['payload'])
                  let param2 = restObj(['call', 'put', 'select', 'take'])

                  if (node.params.length == 0) {
                    node.params.push(param1)
                    node.params.push(param2)
                  } else if (node.params.length == 1) {
                    console.log(`effects ${node.key.name} 已有1个参数`)
                    node.params.push(param2)
                  } else {
                    console.log(`effects ${node.key.name} 已有2个参数`)
                  }
                  methodPath.traverse({
                    AwaitExpression(awaitPath) {
                      awaitPath.replaceWith(t.yieldExpression(awaitPath.node.argument))
                    }
                  })
                }
              }
            })
          }
        }
      })

      rootPath.traverse({
        ImportSpecifier(importPath) {
          if (importPath.node.imported.name == namespace) {
            isImported = true
          }
        }
      })
      if (needImport) {
        if (isImported) {
          console.log(inputPath, namespace, '已经导入')
        } else {
          let body = rootPath.node.body
          let relativePath = path.relative(inputPath, path.join(projectPath, 'src/pages/constants')).replace(/\\/g, '/').substring(3)
          let index = body.findIndex(statement => statement.type != 'ImportDeclaration')
          body.splice(index, -1, template.ast(`\nimport {${namespace}} from '${relativePath}'`))
        }
      }
    }
  })
  fs.writeFile(inputPath, convertCode, {}, () => null)
}
