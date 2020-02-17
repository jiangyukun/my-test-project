const recast = require('recast')
let fs = require('fs')
let path = require('path')

const {getTsxMatch} = require('./utils')
const {wrap, convertCodeUseAst} = require('./utils')

module.exports = wrap(convertFile, getTsxMatch)

let fileIndex = 1

function convertFile(code, namespace, filePath) {
  return convertCodeUseAst(code, {
    Program(rootPath) {
      rootPath.traverse({
        VariableDeclarator(objectPath) {
          let node = objectPath.node
          if (node.id.name == 'columns') {
            let fileName = `List${fileIndex++}`
            let str = getFileContent(fileName, recast.print(node.init, {wrapColumn: 180}).code)
            objectPath.remove()

            let listFilePath = filePath.substring(0, filePath.lastIndexOf(path.sep))
            fs.writeFileSync(listFilePath + path.sep + fileName + '.tsx', str)
            console.log(str)
            console.log('--- --- --- ')

          }
        }
      })
    }
  })
}


function getFileContent(fileName, columns) {
  return `
import React from 'react'
import { ColumnProps } from 'antd/lib/table'
import PageTable, { PageTableProps } from '../../../components/PageTable'

interface Props extends PageTableProps {
  edit: (record) => void
  del: (record) => void
}

class ${fileName} extends PageTable<Props> {
  getColumns(): ColumnProps<any>[] {
    return ${columns}
  }
}

export default ${fileName}
`
}
