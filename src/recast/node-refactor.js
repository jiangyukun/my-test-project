let recast = require('recast')

let builders = recast.types.builders
let {ifStatement, blockStatement, expressionStatement, callExpression, memberExpression} = builders

module.exports = function handleError(code) {
    let ast = recast.parse(code)
    recast.visit(ast, {
        visitIfStatement(path) {
            let old = path.value
            let ifStr = recast.print(path.value).code
            if (ifStr.indexOf('data.Success') != -1 && ifStr.indexOf('data.Data') != -1) {
                let alternate = blockStatement([])
                let log = recast.parse('console.log(\'add by recast!!!\')').program.body[0]
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
            this.traverse(path)
        }
    })
    return recast.print(ast).code
}
