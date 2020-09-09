let path = require('path')
let less = require('less')
let fileUtils = require('../../utils/fileUtil')
let utils = require('../../utils/utils')
let Visitor = less.visitors.Visitor

let filePath = path.join(__dirname, 'test.less')
let content = fileUtils.getFileContent(filePath)

less.parse(content, {}).then(res => {
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


  let d = new less.ParseTree(res, {files: []})

  // console.log(d.toCSS({}).css)

  let css = print(res)
  console.log(css)
})


function print(root) {
  let str = ''
  str += printRuleset(root, -1)
  return str
}

function printRuleset(node, level) {
  let space = utils.range(level).map(() => '  ').join('')
  let str = space
  if (node.selectors) {
    for (let s of node.selectors) {
      str += s.elements.map(item => {
        return item.value
      }).join(' ')
    }
    str += ' {\n'
  }

  for (let rule of node.rules) {
    if (rule.type == 'Declaration') {
      str += printDeclaration(rule, level)
    } else if (rule.type == 'Ruleset') {
      str += printRuleset(rule, level + 1)
    } else {
      throw new Error('unknown ')
    }
  }
  if (node.selectors) {
    str += space + '}\n'
  }
  return str
}

function printDeclaration(node, level) {
  let space = utils.range(level + 1).map(() => '  ').join('')
  let key, value
  if (typeof node.name == 'string') {
    key = node.name
    value = handleValue(node.value)
  } else if (node.name[0].type == 'Keyword') {
    key = node.name[0].value
    value = handleValue(node.value)
  } else {
    throw new Error(`unknown ${node.type}`)
  }
  return space + key + ': ' + value + ';\n'
}

function handleValue(node) {
  if (node.type == 'Anonymous') {
    return node.value
  } else if (node.type == 'Value') {
    let v1 = node.value[0]
    if (v1.type == 'Expression') {
      let v = v1.value[0]
      if (v.type == 'Operation') {
        return printOperation(v)
      } else if (v.type == 'Quoted') {
        return `~"${v.value}"`
      } else if (v.type == 'Variable') {
        return v.name
      } else if (v.type == 'Keyword') {
        return v.value
      } else if (v.type == 'Color') {
        return v.value
      } else if (v.type == 'Call') {
        let arg = v.args[0]
        if (arg.type == 'Quoted') {
          return `call(${v.args[0].value})`
        } else if (arg.type == 'Operation') {
          return printOperation(arg)
        } else if (arg.type == 'Variable') {
          return arg.name
        }
      }
    } else if (v1.type == 'Anonymous') {
      return v1.name
    }
  }
  throw new Error('unknown')
}

function printOperation(node) {
  let {operands} = node
  let handle = (item) => {
    if (item.type == 'Variable') {
      return item.name
    }
    if (item.type == 'Dimension') {
      return item.value
    }
  }
  return `${handle(operands[0])} ${node.op} ${handle(operands[1])}`
}