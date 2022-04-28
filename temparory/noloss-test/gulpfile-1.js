let gulp = require('gulp')

const BlockFirstTask = require('./block-chain/BlockFirstTask')
const {noLossAddress} = require('./constants')
const noLossAbi = require('./block-chain/abi/KakiNLOABI.json')
const ChainNetwork = require('./core/ChainNetwork')
const {infuraArbitrumKey4} = require('./constants')
const {commonWrapNolossContract} = require('./block-chain/utils')
const {commonWrapProvider} = require('./block-chain/utils')
const {infuraArbitrumKey3} = require('./constants')
const {infuraArbitrumKey2} = require('./constants')
const {infuraArbitrumKey1} = require('./constants')

let infuraPrefix = 'https://arbitrum-rinkeby.infura.io/v3/'
const urls = [
  infuraPrefix + infuraArbitrumKey1,

]

const chainNetworkNoloss = new ChainNetwork(urls, noLossAbi, noLossAddress, commonWrapProvider, commonWrapNolossContract)
const arbitrumTask = new BlockFirstTask('noloss', chainNetworkNoloss)

//l2
gulp.task('syncArbitrumData', async (callback) => {
  await arbitrumTask.start({
    startBlockNumber: async () => {
      return 2145320
    },
    endBlockNumber: 2145320,
    onlyLocal: false,
    realtime: false,
    resetDatabase: true,
    handleNewLogData: async (logList) => {
      // console.log(logList)
    },
    getLocalList: async () => {
      return []
    },
    handleLogItem: async (blockNumber, datetime, eventType, data) => {
      console.log(blockNumber, eventType, datetime)
      /*if (eventType == 'BattleDamage') {
        console.log(data.isChapterEnd)
      }
      if (eventType == 'AddLoot') {
        console.log('AddLoot')
      }*/
    }
  })
  callback()
})

gulp.task('default', gulp.series('syncArbitrumData'))
