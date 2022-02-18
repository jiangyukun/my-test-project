const fs = require('fs')
const path = require('path')
const {reserveFile} = require('./fileUtil')

const traverseAndSelect = (dir, match) => (callback) => {
  reserveFile(dir, (filePath) => {
    const result = match(filePath)
    if (result) {
      const code = fs.readFileSync(filePath).toString()
      let convertedCode = callback(code, filePath)
      if (convertedCode == null) {
        return
      }
      if (convertedCode != code) {
        fs.writeFileSync(filePath, convertedCode, {})
        // console.log(filePath, '  --converted')
      }
    }
  })
}

function getDefaultMatch(filePath) {
  if (['.ts', '.tsx', '.js', '.jsx'].find(suffix => endWith(filePath, suffix)) === undefined) {
    return null
  }
  return true
}

function sepLine(dir, sub) {
  return `${path.sep}${dir}${path.sep}${sub || ''}`
}

function wrap(doConvert, getMatch) {
  return function (dir) {
    traverseAndSelect(dir, getMatch ? getMatch : getDefaultMatch)((code, namespace, filePath) => {
      return doConvert(code, namespace, filePath)
    })
  }
}

function bootstrap(doConvert, getMatch) {
  return function (dir) {
    traverseAndSelect(dir, getMatch || getDefaultMatch)((code, filePath) => {
      return doConvert(code, filePath)
    })
  }
}

function getTsxMatch(subPages) {
  return (filePath)=>{
    if (subPages.length && subPages.find(pagePath => filePath.indexOf(pagePath) != -1) == undefined) {
      return null
    }
    if (filePath.indexOf('.tsx') == -1) {
      return null
    }
    return getDefaultMatch(filePath)
  }
}

function endWith(str, substr) {
  let index = str.lastIndexOf(substr)
  return index + substr.length == str.length
}

function range(num) {
  if (num <= 0) {
    return []
  }
  let list = []
  for (let i = 0; i < num; i++) {
    list.push(i)
  }
  return list
}

module.exports = {
  wrap,
  bootstrap,
  traverseAndSelect,
  getDefaultMatch,
  sepLine,
  getTsxMatch,
  endWith,
  range
}
