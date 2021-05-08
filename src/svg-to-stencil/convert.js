let sax = require('sax')

function generateShape(name, content) {
  function handleWidth(originalWidth = 0) {
    return (originalWidth / width).toFixed(2)
  }

  function handleHeight(originalHeight = 0) {
    return (originalHeight / height).toFixed(2)
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
      let attr = tag.attributes
      let r = handleWidth(attr.r)
      result += `//path\n`
      result += `c.begin()\n`
      result += `c.path11('${attr.d}')\n`
      result += `c.stroke()\n`
      result += `c.close()\n`
    }
    if (tag.name == 'rect') {
      let attr = tag.attributes
      result += `//rect\n`
      result += `c.begin()\n`
      result += `c.rect(x + w * ${handleWidth(attr.x)}, y + h * ${handleHeight(attr.y)}, w * ${handleWidth(attr.width)}, h * ${handleHeight(attr.height)})\n`
      result += `c.close()\n`
      result += `c.stroke()\n`
    }
    if (tag.name == 'line') {
      let attr = tag.attributes
      result += `//line\n`
      result += `c.begin()\n`
      result += `c.moveTo(x + w * ${handleWidth(attr.x1)}, y + h * ${handleHeight(attr.y1 || 0)})\n`
      result += `c.lineTo(x + w * ${handleWidth(attr.x2)}, y + h * ${handleHeight(attr.y2)})\n`
      result += `c.close()\n`
      result += `c.stroke()\n`
    }
    if (tag.name == 'circle') {
      let attr = tag.attributes
      let rx = handleWidth(attr.r)
      let ry = handleHeight(attr.r)
      result += `//circle\n`
      result += `c.begin()\n`
      result += `c.ellipse(x + w * ${handleWidth(attr.cx - attr.r)}, y + h * ${handleHeight((attr.cy - attr.r) || 0)}, w * ${2 * rx}, h * ${2 * ry})\n`
      result += `c.stroke()\n`
      result += `c.close()\n`
    }
    if (tag.name == 'polygon') {
      let parts = tag.attributes.points.split(' ')
      result += `//polygon\n`
      result += `c.begin()\n`
      for (let i = 0; i < parts.length; i += 2) {
        if (i == 0) {
          result += `c.moveTo(x + w * ${handleWidth(parts[i])}, y + h * ${handleHeight(parts[i + 1])})\n`
        } else {
          result += `c.lineTo(x + w * ${handleWidth(parts[i])}, y + h * ${handleHeight(parts[i + 1])})\n`
        }
      }
      result += `c.stroke()\n`
      result += `c.close()\n`
    }
    if (tag.name == 'polyline') {
      let parts = tag.attributes.points.split(' ')
      result += `//polyline\n`
      result += `c.begin()\n`
      for (let i = 0; i < parts.length; i += 2) {
        if (i == 0) {
          result += `c.moveTo(x + w * ${handleWidth(parts[i])}, y + h * ${handleHeight(parts[i + 1])})\n`
        } else {
          result += `c.lineTo(x + w * ${handleWidth(parts[i])}, y + h * ${handleHeight(parts[i + 1])})\n`
        }
      }
      result += `c.stroke()\n`
      result += `c.close()\n`
    }
  }
  parser.write(content).end()

  return `
import mxShape from '../js-es6/shape/mxShape'

export default class ${name} extends mxShape {

  paintVertexShape = function (c, x, y, w, h) {
  ${result}
  }
}


`
}

module.exports = generateShape
