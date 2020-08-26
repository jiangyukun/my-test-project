const fs = require('fs')
const path = require('path')

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
    if (['.ts', '.tsx', '.js', '.jsx'].find(suffix=> filePath.indexOf(suffix) != -1) === undefined) {
      return null
    }
    let list = pathInfoList.filter(item => filePath.indexOf(item.path) != -1)
    if (list.length == 0) {
      return
    }
    if (list.length == 1) {
      return list[0].ns
    } else {
      console.log('多个模式匹配： ' + filePath)
    }
    return null
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


module.exports = {
  wrap,
  bootstrap,
  traverseAndSelect,
  getDefaultMatch,
  sepLine,
  getTsxMatch
}
