const {SyncHook} = require("tapable")

let hook = new SyncHook([])

hook.tap('test', () => {
    console.log(1)
})

hook.tap('test', () => {
    console.log(2)
})

hook.call()
