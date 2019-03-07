let recast = require('recast')
let acorn = require('acorn-object-spread')
let importMeta = require('acorn-import-meta')

let {callExpression, memberExpression, identifier} = recast.types.builders

let code = `
import a from './a'
let b = [...a]
`

let ast = recast.parse(code, {
    parser: {
        parse(source) {
            return acorn.Parser.extend(importMeta).parse(code, {
                plugins: {objectSpread: true}
            })
        }
    }
})
