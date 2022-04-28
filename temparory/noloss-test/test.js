

let fs = require('fs')
let {ethers} = require('ethers')

const {noLossAddress} = require('../constants')
const {queryOne} = require('../block-chain/sqlUtil')
const {initConnection} = require('../block-chain/utils')
const noLossAbi = require('../block-chain/abi/KakiNLOABI.json')
const {getTokenDisplay} = require('../block-chain/utils')

let provider_l2 = new ethers.providers.JsonRpcProvider('https://rinkeby.arbitrum.io/rpc')


let noloss = new ethers.Contract(noLossAddress, noLossAbi, provider_l2)

let conn = initConnection()

async function start() {
  let data = await queryOne(conn, fs.readFileSync('./money.sql').toString())

  let unclaimed = await noloss.poolInterest()
  unclaimed = Number(getTokenDisplay(unclaimed))

  console.log('interest', data.interest)
  console.log('claimed', data.memberClaimed)
  console.log('unclaimed', unclaimed)
  console.log('claimed + unclaimed', data.memberClaimed + unclaimed)
  console.log('team total', data.teamTotal)
}

start()
