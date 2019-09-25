let recast = require('recast')

let ast = recast.parse(`
async function x() {
  let a: any = await b()
}
`, {
    parser: require('recast/parsers/typescript')
})

recast.visit(ast, {
    visitAssignmentPattern(path) {
        console.log(1);
        return false
    }
})
