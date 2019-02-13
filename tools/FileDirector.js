let fs = require('fs')

class FileDirector {
    constructor() {
        this.header = ''
        this.body = ''
        this.footer = ''
    }

    build(fileBuilder) {
        this.header = fileBuilder.buildHeader()
        this.body = fileBuilder.buildBody()
        this.footer = fileBuilder.buildFooter()
    }

    getResult() {
        return this.header + this.body + this.footer
    }

    write(path) {
        let result = this.getResult()
        fs.writeFile(path, result, (err, fd) => {
            if (err) {
                throw err
            } else {
                // console.log(options.filename + 'modal写入完成')
            }
        })
    }
}

module.exports = FileDirector
