// console.log(process.env)

setInterval(() => {
    console.log(process.env.a);
    process.env.a = 'b'
    process.send({from: 't.js'})
}, 1000)

