


let moment = require('moment')

let d = moment().subtract(6, 'days').format('YYYY-MM-DD')
console.log(d)

let d1 = moment(d  + ' 00:00:00' + '+09:00')

console.log(d1)

