function* a() {
    yield 2
    yield* "324"
}


let a1 = a()


let uu = {}

uu[Symbol.iterator] = function () {
    return {
        next: () => {
            return {value: 1, done: true}
        }
    }
}


for (let x of uu) {
    console.log(x);
}


