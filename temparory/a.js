

let a  = new Map()

a.set(null, 2)
a.set(null, 3)
a.set(undefined, 3)
a.set(0, 4)

console.log(a.get(null))
