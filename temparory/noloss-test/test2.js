let {ethers} = require('ethers')


let provider_l2 = new ethers.providers.JsonRpcProvider('https://rinkeby.arbitrum.io/rpc')

async function start() {
  let d = await provider_l2.getBlock(1417875)
  console.log(d)
}

start()