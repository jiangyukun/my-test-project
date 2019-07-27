

let a = {
    x: {
        name: 1
    }
}

let a1 = Object.freeze(a.x)

a.x.name = 2


console.log(a.x.name);
