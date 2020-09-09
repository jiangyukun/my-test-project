const fs = require('fs')
const path = require('path')
const {reserveFile} = require('./fileUtil')

const traverseAndSelect = (dir, match) => (callback) => {
  reserveFile(dir, (filePath) => {
    const result = match(filePath)
    if (result) {
      const namespace = result
      const code = fs.readFileSync(filePath).toString()
      let convertedCode = callback(code, namespace, filePath)
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

function getDefaultMatch(pathInfoList) {
  return function (filePath) {
    if (['.ts', '.tsx', '.js', '.jsx'].find(suffix => endWith(filePath, suffix)) === undefined) {
      return null
    }
    let list = pathInfoList.filter(item => filePath.indexOf(item.path) != -1)
    if (list.length == 0) {
      return
    }
    if (list.length == 1) {
      return list[0].ns
    }
    // console.log('多个模式匹配： ' + filePath)
    return list[0].ns
  }
}

function sepLine(dir, sub) {
  return `${path.sep}${dir}${path.sep}${sub || ''}`
}

function wrap(doConvert, getMatch) {
  return function (dir, pathInfo) {
    traverseAndSelect(dir, getMatch ? getMatch(pathInfo) : getDefaultMatch(pathInfo))((code, namespace, filePath) => {
      return doConvert(code, namespace, filePath)
    })
  }
}

function bootstrap(doConvert, getMatch) {
  return function (dir, pathInfo) {
    traverseAndSelect(dir, getMatch ? getMatch(pathInfo) : getDefaultMatch(pathInfo))((code, namespace, filePath) => {
      return doConvert(code, namespace, filePath)
    })
  }
}


function getTsxMatch(pathInfoList) {
  const defaultMatch = getDefaultMatch(pathInfoList)
  return function (filePath) {
    if (filePath.indexOf('.tsx') == -1) {
      return null
    }
    return defaultMatch(filePath)
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
