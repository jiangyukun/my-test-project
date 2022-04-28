

let reg = /address=(\w+)(&zone=(.+))?/


let d = /address=(\w+)(&zone=(.+))?/.exec('address=242&zone=+800')
console.log(d)
