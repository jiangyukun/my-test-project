function mat(v1, v2) {
  let result = []
  v1.forEach((v1Row) => {
    let row = []
    if (v1Row.length != v2.length) {
      console.log('error')
    }
    for (let j = 0; j < v1Row.length; j++) {
      let d = 0
      v1Row.forEach((v1Item, index) => {
        d += v1Item * v2[index][j]
      })
      row.push(d)
    }
    result.push(row)
  })
  return result
}

function matMulti(...args) {
  if (args.length == 1) {
    return args[0]
  }
  let start = args[0]
  let r
  for (let i = 1; i < args.length; i++) {
    r = mat(start, args[i])
    start = r
  }
  return r
}

let deg = 90 / 180 * Math.PI
let c = Math.cos(deg)
let s = Math.sin(deg)
let dx = 0.5
let dy = 0.5

let m1 = [
  [1, 0, 0],
  [0, 1, 0],
  [-dx, -dy, 1]
]

let m2 = [
  [1, 0, 0],
  [0, 1, 0],
  [dx, dy, 1]
]


let rotate = [
  [c, s, 0],
  [-s, c, 0],
  [0, 0, 1],
]
let d = [[1, 1, 1]]



// let rrr = matMulti(m1, rotate, d)
let r1 = matMulti(d, m1, rotate, m2)

