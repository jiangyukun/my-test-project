const {SyncWaterfallHook} = require("tapable")


let factory = new SyncWaterfallHook(['factory'])

factory.tap('test', () => () => {
    console.log(1)
})

factory.tap('test', (before) => () => {
    before()
    console.log(2)
})

let xx = factory.call()

xx()

