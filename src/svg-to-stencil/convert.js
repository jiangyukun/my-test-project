let sax = require('sax')


function generateShape(name, content) {
  function handleWidth(originalWidth) {
    return (originalWidth * scale).toFixed(1)
  }

  function handleHeight(originalHeight) {
    return (originalHeight * scale).toFixed(1)
  }

  let parser = sax.parser(true)

  let result = ''
  let width, height, scale
  let hasPath = false

  parser.onopentag = (tag) => {
    if (tag.name == 'svg') {
      if (tag.attributes.width) {
        width = Number(tag.attributes.width)
        height = Number(tag.attributes.height)
        scale = 100 / Number(tag.attributes.width)
      } else {
        let parts = tag.attributes.viewBox.split(' ')
        width = Number(parts[2])
        height = Number(parts[3])
        scale = 100 / width
      }
    }
    if (tag.name == 'path') {
      hasPath = true
      let d = tag.attributes.d
      let list = d.split(/(?=[A-Z])/)

      result += '<path>\n'
      list.forEach(item => {
        let type = item[0]
        let p = item.substring(1)
        let ps = p.split(/(\s+|,)/).filter(item => item != '' && item != ' ' && item != ',')

        let pathItem = ''
        if (type == 'M') {
          pathItem = `<move x="${handleWidth(ps[0])}" y="${handleHeight(ps[1])}"/>`
        } else if (type == 'C') {
          pathItem = `<curve x1="${handleWidth(ps[0])}" y1="${handleHeight(ps[1])}" x2="${handleWidth(ps[2])}" y2="${handleHeight(ps[3])}" x3="${handleWidth(ps[4])}" y3="${handleHeight(ps[5])}"/>`
        } else if (type == 'Z') {
          pathItem = '<close/>'
        } else if (type == 'L') {
          pathItem = `<line x="${handleWidth(ps[0])}" y="${handleHeight(ps[1])}"/>`
        } else {
          throw new Error('unknown type: ' + type)
        }
        result += pathItem + '\n'
      })
      result += '\n</path>'
    }
    if (tag.name == 'rect') {
      let attr = tag.attributes
      let pathItem = `<rect h="${handleHeight(attr.height)}" w="${handleWidth(attr.width)}" x="${handleWidth(attr.x)}" y="${handleHeight(attr.y)}"/>`
      result += pathItem + '\n'
    }
    if (tag.name == 'line') {
      let attr = tag.attributes
      let pathItem = `<move x="${handleWidth(attr.x1)}" y="${handleHeight(attr.y1 || 0)}"/><line x="${handleWidth(attr.x2)}" y="${handleHeight(attr.y2)}"/><close/>`
      result += pathItem + '\n'
    }
    if (tag.name == 'circle') {
      let attr = tag.attributes
      let r = handleWidth(attr.r)
      let cx = attr.cx
      let cy = attr.cy
      let pathItem = `
<move x="${handleWidth(attr.cx)}" y="${handleHeight(attr.cy || 0)}"/>
<arc rx="${r}" ry="${r}" x-axis-rotation="0" large-arc-flag="1" sweep-flag="0" x="${2*r}" y="0"/>
<arc rx="${r}" ry="${r}" x-axis-rotation="0" large-arc-flag="1" sweep-flag="0" x="${-2*r}" y="0"/>
<close/>
`
      result += pathItem + '\n'
    }
  }
  parser.write(content).end()

  if (!hasPath ) {
    result = '<path>\n' + result + '</path>'
  }

  result = `
<shape name="${name}" aspect="variable" strokewidth="inherit" h="${Math.ceil(height * scale)}" w="100">
  <background>
    ${result}
  </background>
  <foreground>
    <fillstroke/>
  </foreground>
</shape>
`
  return result
}

module.exports = generateShape
