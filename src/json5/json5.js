let json5 = require('json5')

let r = json5.stringify({
  a: '1',
  b: '2'
}, (value, a,b)=> {
  console.log(value,a, b)
  return 1
})

console.log(r)