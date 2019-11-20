/**
 * 遇到第一个有返回值的就结束，不执行后面的函数
 */

const {SyncBailHook} = require("tapable")

let hook = new SyncBailHook([])

hook.tap('test', () => {
    console.log(1)
    return 22
})

hook.tap('test', () => {
    console.log(2)
    return 234
})

let r = hook.call()
console.log(r);
