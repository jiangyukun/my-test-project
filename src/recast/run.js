let recast = require('recast')


recast.run((ast, printSource)=> {
    console.log(printSource(ast));
})