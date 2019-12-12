const {AsyncSeriesWaterfallHook} = require("tapable")

let factory = new AsyncSeriesWaterfallHook(['factory'])


factory.tapAsync('test', (result, callback) => {
    console.log(1);
    setTimeout(()=> {

        callback(22)
    }, 100)

})

factory.tapAsync('test', (result, callback) => {
    console.log(2);
    callback(33)

})

let xx = factory.callAsync({}, (r) => {
    console.log(r);
})
