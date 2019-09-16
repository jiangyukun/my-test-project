let recast = require('recast')

let ast = recast.parse(`

interface A {
    name: string
}
`, {
    parser: require('recast/parsers/typescript')
})

recast.visit(ast, {
    visitTSInterfaceDeclaration(path) {
        console.log(1);
        return false
    }
})
