const ChainNetwork = require('../core/ChainNetwork')
const noLossAbi = require('../block-chain/abi/KakiNLOABI.json')
const {noLossAddress} = require('../constants')

let maxFailureCount = 1
let currentCount = 0

const chainNetwork = new ChainNetwork(['a', 'b', 'c'], noLossAbi, noLossAddress, (provider, wrapProvider) => {
  /*provider.getBlock1 = (number) => {
    if(currentCount >= maxFailureCount) {
      return provider.getBlock(number)
    }
    currentCount++
    throw new Error('limit error')
  }*/
  provider.getBlock2 = wrapProvider('getBlock')
})

chainNetwork.provider.getBlock2(2089285).then(res => {
  console.log(res)
}).catch(e=> {
  console.log(e.message)
})
