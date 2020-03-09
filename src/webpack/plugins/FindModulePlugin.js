const path = require('path')
const fs = require('fs')
const {reserveFile} = require('../../../utils/fileUtil')

module.exports = class FindModulePlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    const context = compiler.context
    let files = []
    const dir = path.join(context, this.options.subDir)
    if(!fs.existsSync(dir)) {
      console.log(`${dir} 目录找不到`)
    }
    reserveFile(dir, (pathName) => {
      files.push(pathName)
    })
    compiler.hooks.compilation.tap('FindModulePlugin', (compilation) => {
      compilation.hooks.finishModules.tap('FindModulePlugin', (modules) => {
        modules.forEach(module => {
          if (module.userRequest.indexOf('node_modules') == -1) {
            let index = files.indexOf(module.userRequest)
            if (index != -1) {
              files[index] = null
            }
          }
        })
        compilation.warnings.push(new Error(`未使用的模块：\n${files.filter(item => item != null).join('\n')}`))
      })

    })
  }
}
