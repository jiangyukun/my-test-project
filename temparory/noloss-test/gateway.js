let Web3 = require('web3')

const gatewayAbi = require('../block-chain/abi/gateway')

let web3_l2 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.arbitrum.io/rpc'))

const TaskManager = require('../block-chain/TaskManager')


const bridgeTask = new TaskManager(web3_l2, gatewayAbi, '0x195C107F3F75c4C93Eba7d9a1312F19305d6375f'.toUpperCase())

bridgeTask.start({
  startBlockNumber: async () => {
    return 334786
  },
  endBlockNumber: 334787,
  handleNewLogData: async (logList) => {
    // console.log(logList)
  },
  handleLogItem: async (blockNumber, datetime, eventType, data) => {
    console.log(datetime, eventType, data)
  }
})
