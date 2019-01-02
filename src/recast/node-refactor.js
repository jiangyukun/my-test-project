let recast = require('recast')


let code = `
if (a.data.Success && a.data.Data) {
    let a = 1
}
console.log(3)
`

let builders = recast.types.builders
// console.log(builders);
let {ifStatement, blockStatement, expressionStatement, callExpression, memberExpression} = builders

let ast = recast.parse(code)

recast.visit(ast, {
    visitIfStatement(path) {
        let old = path.value
        let ifStr = recast.print(path.value).code
        if (ifStr.indexOf('data.Success') != -1 && ifStr.indexOf('data.Data') != -1) {
            let alternate = blockStatement([])
            let log = recast.parse('console.log(\'error\')').program.body[0]
            if (old.alternate) {
                alternate = old.alternate
                // alternate.push(expressionStatement(callExpression(memberExpression())))
                alternate.body.push(log)
            } else {
                alternate.body.push(log)
            }
            let t = ifStatement(old.test, old.consequent, alternate)
            path.replace(t)
            return false
        }
        // this.traverse(path)
        // this.visit(path, {
        //     visitMemberExpression(childPath) {
        //         this.visit(childPath, {
        //             visitMemberExpression(childPath1) {
        //                 let name = childPath1.value.property.name
        //                 if (name === 'Success') {
        //
        //                 }
        //                 return false
        //             }
        //         })
        //     }
        // })
    }
})

console.log(recast.print(ast).code)
