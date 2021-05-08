let sax = require('sax')

function generateShape(name, content) {
  function w(originalWidth = 0) {
    return `x + w * ${w1(originalWidth)}`
  }

  function h(originalHeight = 0) {
    return `y + h * ${h1(originalHeight)}`
  }
  function w2(originalWidth = 0) {
    return `w * ${w1(originalWidth)}`
  }

  function h2(originalHeight = 0) {
    return `h * ${h1(originalHeight)}`
  }

  function w1(originalWidth = 0) {
    return (originalWidth / width).toFixed(2)
  }

  function h1(originalHeight = 0) {
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
      let parts = splitS(attr.d)
      result += `//path\n`
      result += `c.begin()\n`
      let lastX, lastY
      parts.forEach(part => {
        let type = part[0]
        let info = part.substring(1) || ''
        let p = info.split(/[, -]/)

        if (type == 'M') {
          lastX = Number(p[0])
          lastY = Number(p[1])
          result += `c.moveTo(${w(lastX)},  ${h(lastY)})\n`
        }
        if (type == 'V') {
          let p = Number(info)
          result += `c.lineTo(${w(lastX)}, ${h(p)})\n`
          lastY = p
        }
        if (type == 'H') {
          let p = Number(info)
          result += `c.lineTo(${w(p)}, ${h(lastY)})\n`
          lastX = p
        }
        if (type == 'm') {
          lastX += Number(p[0])
          lastY += Number(p[1])
          result += `c.moveTo1(w * ${w1(Number(p[0]))}, h * ${h1(Number(p[1]))})\n`
        }
        if (type == 'Z') {
          result += `c.close()\n`
        }
        if (type == 'S') {
          if (p[4]) {
            result += `c.smoothCurveTo(${w(Number(p[0]))}, ${h(Number(p[1]))}, ${w(Number(p[2]))}, ${h(Number(p[3]))}, ${w(Number(p[4]))}, ${h(Number(p[5]))})\n`
          } else {
            result += `c.smoothCurveTo(${w(Number(p[0]))}, ${h(Number(p[1]))}, ${w(Number(p[2]))}, ${h(Number(p[3]))})\n`
          }
        }
        if (type == 's') {
          if (p[4]) {
            result += `c.smoothCurveTo1(${w2(Number(p[0]))}, ${h2(Number(p[1]))}, ${w2(Number(p[2]))}, ${h2(Number(p[3]))}, ${w2(Number(p[4]))}, ${h2(Number(p[5]))})\n`
          } else {
            result += `c.smoothCurveTo1(${w2(Number(p[0]))}, ${h2(Number(p[1]))}, ${w2(Number(p[2]))}, ${h2(Number(p[3]))})\n`
          }
        }
      })
      result += `c.stroke()\n`
    }
    if (tag.name == 'rect') {
      let attr = tag.attributes
      result += `//rect\n`
      result += `c.begin()\n`
      result += `c.rect(${w(attr.x)}, ${h(attr.y)}, w * ${w1(attr.width)}, h * ${h1(attr.height)})\n`
      result += `c.stroke()\n`
    }
    if (tag.name == 'line') {
      let attr = tag.attributes
      result += `//line\n`
      result += `c.begin()\n`
      result += `c.moveTo(${w(attr.x1)}, ${h(attr.y1 || 0)})\n`
      result += `c.lineTo(${w(attr.x2)}, ${h(attr.y2)})\n`
      result += `c.stroke()\n`
      result += `c.close()\n`
    }
    if (tag.name == 'circle') {
      let attr = tag.attributes
      let rx = w1(attr.r)
      let ry = h1(attr.r)
      result += `//circle\n`
      result += `c.begin()\n`
      result += `c.ellipse(${w(attr.cx - attr.r)}, ${h((attr.cy - attr.r) || 0)}, w * ${2 * rx}, h * ${2 * ry})\n`
      result += `c.stroke()\n`
    }
    if (tag.name == 'polygon') {
      let parts = tag.attributes.points.split(' ')
      result += `//polygon\n`
      result += `c.begin()\n`
      for (let i = 0; i < parts.length; i += 2) {
        if (i == 0) {
          result += `c.moveTo(${w(parts[i])},${h(parts[i + 1])})\n`
        } else {
          result += `c.lineTo(${w(parts[i])}, ${h(parts[i + 1])})\n`
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
          result += `c.moveTo(${w(parts[i])}, ${h(parts[i + 1])})\n`
        } else {
          result += `c.lineTo(${w(parts[i])}, ${h(parts[i + 1])})\n`
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

function splitS(str) {
  let list = []
  let sub = ''
  for (let i = 0; i < str.length; i++) {
    let l = str[i]
    if ((l >= 'a' && l <= 'z') || (l >= 'A' && l <= 'Z')) {
      if (sub != '') {
        list.push(sub)
      }
      sub = l
    } else {
      sub += l
    }
  }
  if (sub != '') {
    list.push(sub)
  }
  return list
}
