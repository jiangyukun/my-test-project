let Web3 = require('web3')

const {oracleAddress_2} = require('../constants')
const priceAbi = require('../block-chain/abi/OracleABI.json')

let web3_l2 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.arbitrum.io/rpc'))

const TaskManager = require('../block-chain/TaskManager')


const btcPriceTask = new TaskManager(web3_l2, priceAbi, oracleAddress_2.toUpperCase())

btcPriceTask.start({
  startBlockNumber: async () => {
    return 833000
  },
  endBlockNumber: null,
  realtime: true,
  handleNewLogData: async (logList) => {
    // console.log(logList)
  },
  handleLogItem: async (blockNumber, datetime, eventType, data) => {
    console.log(datetime, eventType, data)
  }
})
