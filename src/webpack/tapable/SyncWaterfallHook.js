const {SyncWaterfallHook} = require("tapable")

let factory = new SyncWaterfallHook(['factory'])


factory.tap('test', (factor) => (result, callback) => {

    callback(22)

})

let xx = factory.call(null)

xx(1, (r) => {
    console.log(r);
})

// console.log(xx());
