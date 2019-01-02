let recast = require('recast')

let {callExpression, memberExpression, identifier} = recast.types.builders

let code = `
let a = require('abc')
let obj = {
    getName: function() {
    }
}
function print() {}

print();
obj.getName()
obj.getName
`

let ast = recast.parse(code)
let moduleNeeded = false

recast.visit(ast, {
    visitCallExpression(path) {
        let value = path.value
        let callee = path.value.callee
        if (callee.type !== 'MemberExpression') {
            return false
        }
        if (callee.property.name === 'getName') {
            let newExp = callExpression(memberExpression(identifier('utils'), identifier('getFirstImage')), [])
            path.replace(newExp)
            moduleNeeded = true
        }
        return false
    }
})
if (moduleNeeded) {
    ast.program.body.unshift(recast.parse('let utils = require(\'utils\')').program.body[0])
}
console.log(recast.print(ast).code);
