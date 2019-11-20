const {AsyncParallelHook} = require("tapable")

let hook = new AsyncParallelHook(['factory'])

hook.tapAsync('test', (d, callback) => {
    setTimeout(() => {
        console.log(1);
        callback(33)
    }, 500)
})

hook.tapAsync('test', (d, callback) => {
    console.log(2);
    callback(55)
})

hook.tapPromise('test', (d,) => {
    console.log(3);
    return Promise.resolve(333)
})

hook.callAsync(122, (r) => {
    console.log(r);
    return r
})
