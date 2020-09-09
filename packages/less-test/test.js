let less = require('less')

let Visitor = less.visitors.Visitor

less.parse(`
    @xxx: #fff;
    .b{
        line-height: @xxx;
        .d {
            width: 40px;
        }
    }
    .c {
        font-size: 14px;
    }
    :global(.dark-theme) .a {}
    :global(.dark-theme), .b {}
`, {}).then(res => {
  let list = []
  new Visitor({
    visitDeclaration(node) {
      if (typeof node.name == 'string') {
        return
      }
      if (node.value instanceof less.tree.Value) {
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
          color: '#fff',
          selectors
        })
      }
    }
  }).visit(res)

  new Visitor({
    visitRuleset(node) {
      if (node.root) {
        list.forEach(item => {
          let elements = [less.element('', ':global'), less.element('', '(.dark-theme)')]

          item.selectors.forEach(item=> {
            elements.push(...item.elements)
          })
          let darkSelectors = less.selector(elements)
          node.rules.push(
            less.ruleset(
              [darkSelectors],
              [
                less.declaration([less.keyword(item.name)], less.anonymous('55px'))
              ]
            )
          )
        })
      }
    }
  }).visit(res)

  let d = new less.ParseTree(res, {files: []})

  console.log(d.toCSS({}).css)
})
