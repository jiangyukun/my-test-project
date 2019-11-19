
let a = 1
let b = 2

let f = new Function('console.log(223)')
f()

let result = eval('let c = a+ b;console.log(c)')


let c = Object.freeze({})

c.a = 1

c.b = 2

if (a == null) {

}