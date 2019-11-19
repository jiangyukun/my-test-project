let path = require('path')
let fork = require('child_process').fork

process.env.a = 'a'
let child = fork(path.join(__dirname, './t.js'))

// console.log(child);


child.on('message', (data) => {
    console.log(data);
    console.log(process.env.a);
})

// setTimeout(() => {
//
// }, 100 * 1000)
