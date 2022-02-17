const fs = require('fs')
const JsonWebsocketClient = require('./Client')


let conn = new JsonWebsocketClient('wss:noloss-bsc.kakifi.com:8887')

conn.addWatch('wsOnlineList', null, (data) => {
  let listStr = fs.readFileSync('./list.txt').toString()

  let oldList = listStr.split('\n').filter(item => item != '')
  data.forEach(newItem => {
    if (newItem.address && newItem.version.indexOf('two') != -1 && oldList.find(item => item.indexOf(newItem.address) != -1) == undefined) {
      oldList.push(`${newItem.address} ${newItem.datetime}`)
      listStr += `${newItem.address} ${newItem.datetime} ${newItem.zone || ''} ${newItem.ip || ''}\n`
    }
  })
  fs.writeFileSync('./list.txt', listStr)
  // console.log(data)
})
