let path = require('path')
let less = require('less')
let fileUtils = require('../../utils/fileUtil')
let print = require('./print')

const {srcRoot, projectRoot} = require('../babel-test/src/constants')
const {bootstrap, sepLine, getTsxMatch} = require('../../utils/utils')

let Visitor = less.visitors.Visitor

function convertFile(code, filePath) {
  less.parse(code, {}).then(res => {
    let list = []
    new Visitor({
      visitDeclaration(node) {
        if (typeof node.name == 'string') {
          return
        }
        if (node.value instanceof less.tree.Value) {
          let v = node.value.value[0].value[0]
          if (v instanceof less.tree.Variable) {
            let selectors = []
            let p = node.parent
            while (p) {
              if (p.selectors) {
                selectors.unshift(...p.selectors)
              }
              p = p.parent
            }
            list.push({
              name: node.name[0].value,
              value: node.value.value[0].value,
              selectors
            })
          }
        }
      }
    }).visit(res)

    new Visitor({
      visitRuleset(node) {
        if (node.root) {
          list.forEach(item => {
            let elements = [less.element('', ':global'), less.element('', '(.dark-theme)')]

            item.selectors.forEach(item => {
              elements.push(...item.elements)
            })
            let darkSelectors = less.selector(elements)
            node.rules.push(
              less.ruleset(
                [darkSelectors],
                [
                  less.declaration([less.keyword(item.name)], item.value[0].name)
                ]
              )
            )
          })
        }
      }
    }).visit(res)

    let css = print(res)
    fileUtils.writeCodeToFile(filePath, css)
  })
}

let handle = bootstrap(convertFile, filePath => filePath.indexOf('.less') != -1)

handle(srcRoot)