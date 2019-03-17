let generateCode = require('./index')

run()
setInterval(() => {
    run()
}, 1000 * 1000)


function run() {
    console.log('generate code');
    generateCode()
    console.log('生成完成');
}
