let recast = require('recast')
let handleError = require('./node-refactor')

recast.run((ast, printSource)=> {
    let result = handleError(recast.print(ast).code)
    console.log(result);
})