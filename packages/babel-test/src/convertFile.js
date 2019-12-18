var babel = require("@babel/core");
const path = require('path')
const fs = require('fs')


let input = path.join(__dirname, '../inputs/input1.js')
babel.transformFile(input, {plugins: [plugin1]}, (err, result) => {
    if (err) {
        throw err
    }
    console.log(result);
    fs.writeFileSync(input, result.code)
})

const t = require('@babel/types')
const generator = require('@babel/generator').default


function plugin1() {
    return {
        visitor: {
            FunctionDeclaration(path) {
                console.log(1);
                path.replaceWith(t.arrowFunctionExpression([], t.numericLiteral(1)))
            }
        }
    }
}
