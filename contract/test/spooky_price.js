const {ethers, providers} = require('ethers')
const {Contract} = require('ethers')

const tokenAbi = require('../js/abi/tokenABI.json')
const {BigNumber} = require('ethers')

const rpcUrl = 'https://rpcapi.fantom.network'
const p = new providers.JsonRpcProvider({url: rpcUrl, timeout: 30 * 1000})
const wftmAddress = '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83'
const usdcAddress = '0x04068da6c83afcfa0e13ba15a6696662335d5b75'
const ftmlpAddress = '0x2b4c76d0dc16be1c31d4c1dc53bf9b45987fc75c'

const wftmContract = new Contract(wftmAddress, tokenAbi, p)
const usdcContract = new Contract(usdcAddress, tokenAbi, p)

async function start() {
  let ftmTotal = await wftmContract.balanceOf(ftmlpAddress)
  let usdcTotal = await usdcContract.balanceOf(ftmlpAddress)

  usdcTotal = usdcTotal.mul(BigNumber.from('1000000000000000000')).div(BigNumber.from('1000000'))
  // console.log(ftmTotal, usdcTotal)

  let result = BigNumber.from(10**4).mul(usdcTotal).div(ftmTotal)
  console.log(result.toNumber())

}

start().catch(e => {
  console.log(e)
})
