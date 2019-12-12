function* a() {
    let r = yield 3
    console.log(5);
    return 2
}

let generator = a()
let r = generator.next()
console.log(r);
console.log(generator.next());
