let xxx = Object.create(function () {
    console.log(1)
})

function b() {
    return 111
}


// console.log(eval(''))


let p = new Proxy({a: 1}, {
    get:()=> {
        console.log(22);
    }
})


let p1 = new Proxy(p, {
    get: (obj, key, target)=> {
        return obj[key]
    }
})


console.log(p1.a);