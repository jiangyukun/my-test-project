const fs = require('fs')
const path = require('path')
let mkdirp = require('mkdirp')

function getFileContent(path) {
  return fs.readFileSync(path).toString()
}

function writeCodeToFile(distPath, code) {
  if (!code) {
    return
  }
  let distDir = distPath.substring(0, distPath.lastIndexOf('/') + 1)
  mkdirp(distDir, () => {
    fs.writeFileSync(distPath, code)
  })
}

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

function getFileName(filePath) {
  let baseName = path.basename(filePath)
  return baseName.substring(0, baseName.indexOf(path.extname(filePath)))
}

function checkFileExist(filePath, extensions) {
  if (fs.existsSync(filePath)) {
    return true
  }
  for (let ext of extensions) {
    if (fs.existsSync(filePath + ext)) {
      return true
    }
  }
  return false
}

module.exports = {
  getFileContent,
  writeCodeToFile,
  reserveFile,
  getFileName,
  checkFileExist
}
