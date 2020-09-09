const path = require('path')
const t = require('@babel/types')
const {sepLine} = require('./utils')
const {srcRoot} = require('./constants')

const {bootstrap} = require('./utils')
const {convertCodeUseAst} = require('../../../utils/astUtil')
const {checkFileExist} = require('../../../utils/fileUtil')

function convertFile(code, namespace, filePath) {
  let converted = false

  let resultCode = convertCodeUseAst(code, {
    ImportDeclaration(importPath) {
      let source = importPath.node.source
      let value = source.value
      if (value[0] == '.') {

        let from = path.resolve(filePath, '../', value)
        if (!checkFileExist(from, ['.ts', '.tsx', '.js', '.jsx'])) {
          // console.log(`${from} 不存在`)
          from = path.resolve(filePath, '../', value.replace('../', ''))
          if (!checkFileExist(from, ['.ts', '.tsx', '.js', '.jsx'])) {
            console.error(`${from} 还是不存在`)
            from = path.resolve(filePath, '../../', value)

          } else {
            // console.log(`${from} 在上一层找到`)
            source.value = source.value.replace('../', '')
            converted = true
          }
        }
      }
    }
  })
  if (converted) {
    return resultCode
  }

  return null
}

let handle = bootstrap(convertFile)

handle(srcRoot, [
  {path: sepLine('storage-station-monitor'), ns: 'empty'},
  {path: sepLine('storage-operation-day-report'), ns: 'empty'},
  {path: sepLine('common-fee-query'), ns: 'empty'},
  {path: sepLine('storage-operation-indicator-config'), ns: 'empty'},
  {path: sepLine('common-maintenance-abnormal-warning'), ns: 'empty'},
  {path: sepLine('common-maintenance-alarm-notification'), ns: 'empty'},
  {path: sepLine('common-maintenance-check-abnormal'), ns: 'empty'},
  {path: sepLine('common-maintenance-defect-record'), ns: 'empty'},
  {path: sepLine('common-maintenance-dispatch'), ns: 'empty'},
  {path: sepLine('common-maintenance-electric-difference'), ns: 'empty'},
  {path: sepLine('common-maintenance-operation-deal'), ns: 'empty'},
  {path: sepLine('common-maintenance-run-record'), ns: 'empty'},
  {path: sepLine('storage-topic-abnormal'), ns: 'empty'},
  {path: sepLine('storage-topic-battery'), ns: 'empty'},
  {path: sepLine('storage-topic-benefit'), ns: 'empty'},
  {path: sepLine('storage-topic-demo'), ns: 'empty'},
  {path: sepLine('storage-topic-income'), ns: 'empty'},
  {path: sepLine('storage-topic-overview'), ns: 'empty'},
  {path: sepLine('storage-topic-power-quality'), ns: 'empty'},
  {path: sepLine('common-maintenance-workspace'), ns: 'empty'},

])
