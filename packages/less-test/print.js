let utils = require('../../utils/utils')

function print(root) {
  let str = ''
  str += printRuleset(root, -1)
  return str
}

function printRuleset(node, level) {
  let space = utils.range(level).map(() => '  ').join('')
  let str = space
  if (node.selectors) {
    node.selectors.forEach((s, index) => {
      if (index != 0) {
        str += ', '
      }
      s.elements.forEach((ele, index2) => {
        if (index2 == 0) {
          str += ele.value
        } else {
          str += ele.combinator.value + ele.value
        }
      })
    })
    str += ' {\n'
  }

  for (let rule of node.rules) {
    if (rule.type == 'Declaration') {
      str += printDeclaration(rule, level)
    } else if (rule.type == 'Ruleset') {
      str += printRuleset(rule, level + 1)
    } else if (rule.type == 'Comment') {
      str += printComment(rule, level + 1)
    } else if (rule.type == 'AtRule') {
      str += rule.name
      str += rule.rules.map(item => printRuleset(item)).join('')
    } else if (rule.type == 'MixinDefinition') {

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
    if (!value) {
      console.log(value)
    }
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
      return v1.value.map(item => handleExpressionHandler(item)).join(' ')
    } else if (v1.type == 'Anonymous') {
      return v1.value
    }
  }
  throw new Error('unknown')
}

function handleExpressionHandler(node) {
  if (node.type == 'Operation') {
    return printOperation(node)
  } else if (node.type == 'Quoted') {
    return `~"${node.value}"`
  } else if (node.type == 'Variable') {
    return node.name
  } else if (node.type == 'Keyword') {
    return node.value
  } else if (node.type == 'Color') {
    return node.value
  } else if (node.type == 'Call') {
    if (node.name) {
      return handleCall(node)
    }
    let arg = node.args[0]
    if (arg.type == 'Quoted') {
      return `calc(~"${node.args[0].value}")`
    } else if (arg.type == 'Operation') {
      return `calc(${printOperation(arg)})`
    } else if (arg.type == 'Variable') {
      return `calc(${arg.name})`
    }
  } else if (node.type == 'Dimension') {
    return node.value + node.unit.backupUnit || ''
  } else if (node.type == 'Url') {
    return `"${node.value.value}"`
  }
  throw new Error('unknown')
}

function handleCall(node) {
  return `${node.name}(${node.args.map(d => d.value).join(', ')})`
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
    if (item.type == 'Operation') {
      return printOperation(item)
    }
    throw new Error('unknown')
  }
  return `${handle(operands[0])} ${node.op} ${handle(operands[1])}`
}

function printComment(node, level) {
  let space = utils.range(level + 1).map(() => '  ').join('')
  return space + node.value
}

module.exports = print