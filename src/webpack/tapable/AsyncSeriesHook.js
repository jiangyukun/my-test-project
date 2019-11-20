const {AsyncSeriesHook} = require("tapable")

let hook = new AsyncSeriesHook(['factory'])

hook.tapAsync('test', (d, callback) => {
    setTimeout(() => {
        callback()
    }, 1000)
})

hook.tapAsync('test', (d, callback) => {
    callback(55)
})

hook.tapPromise('test', (d,) => {
    return Promise.resolve(333)
})

hook.intercept({
    register(tap) {
        console.log(tap);
        return tap
    }
})

hook.callAsync(122, (r) => {
    return r
})
