const fs = require('fs')
const moment = require('moment')
const {ethers, providers} = require('ethers')
const {Contract} = require('ethers')

const newAddressList = require('./result.json')
let listStr = fs.readFileSync('./list.txt').toString()
let tokenAbi = require('../js/abi/tokenABI.json')
const {listTaskWithRetry} = require('../js/util')
const {getTokenValue} = require('../js/util')

let twoAddress = '0x2A93a76b799fAe50ff4853fE74E31e2aBe92F300'
// let addressList = listStr.split('\r\n').filter(item => item != '')
let addressList = newAddressList.map(item=>item.address)
console.log(addressList.length)

let rpcUrl = 'https://rpcapi.fantom.network'
let p = new providers.JsonRpcProvider({url: rpcUrl, timeout: 30 * 1000})
let wallet = new ethers.Wallet('e8979721de28055575b999cdc5c2c6d744d31f78ef27e6b57e6f5e70ba06eeb3', p)

let twoContract = new Contract(twoAddress, tokenAbi, wallet)

async function start() {
  let list = []
  listTaskWithRetry('get', addressList, {
    async doRequest(item) {
      let data = await twoContract.balanceOf(item)
      return {
        address: item,
        value: getTokenValue(data)
      }
    },
    onSuccess(address, item) {
      list.push(item)
    },
    onComplete() {
      let result = list.filter(item => item.value != 0).sort((a, b) => {
        return a.value > b.value ? -1 : 1
      })
      console.log(result)
      let filename = `./result${moment().format('MMDD-HH-mm')}.json`
      fs.writeFileSync(filename, JSON.stringify(result))
    }
  })
}

start().catch(e => {
  console.log(e)
})
