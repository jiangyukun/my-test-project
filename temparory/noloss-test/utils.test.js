const {getConnection} = require('../block-chain/utils')
const {initConnection} = require('../block-chain/utils')
const {dbConfig} = require('../constants')


initConnection(dbConfig)
let conn = getConnection()
conn.ping((err, data) => {
  console.log(err, data)
})
console.log(1)