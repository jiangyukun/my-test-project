const {AsyncSeriesHook} = require("tapable")

let hook = new AsyncSeriesHook(['factory'])

hook.tapAsync('test', (d, callback) => {
    console.log(d);
    setTimeout(() => {
        callback()
    }, 1000)
})

hook.tapAsync('test', (d, callback) => {
    callback(55)
})

// hook.intercept({
//     register(tap) {
//         console.log(tap);
//         return tap
//     }
// })

hook.callAsync(122, (r) => {
    console.log(r);
    return r
})
