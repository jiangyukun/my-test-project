// const t = require('@babel/types')
// const generator = require('@babel/generator').default


function exportFile(api, options) {
  return {
    visitor: {
      Program(path) {

        let moduleName = this.file.opts.filename
        console.log(moduleName)

      },
      ClassDeclaration(path) {
        let node =path.node
      },
      ClassMethod(path) {
        let node =path.node

        let name = node.key.name
        if (name == 'getColumns') {
          console.log(2)
        }
      }
    }
  }
}

module.exports = exportFile
