const {SyncWaterfallHook} = require("tapable")


let factory = new SyncWaterfallHook(['factory'])

factory.tap('test', (before) => (r) => {
    return r + 1
})

factory.tap('test', (before) => () => {
    let t = before(334)
    return t
})

let xx = factory.call()

console.log(xx());
