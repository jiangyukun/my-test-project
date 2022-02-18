import {ethers, providers, Contract} from 'ethers'
import ticketAbi from '../abi/iTicketABI.json'
import ticketInfoAbi from '../abi/ticketInfo.json'
import squidAbi from '../abi/kakiSquidGame.json'
import tokenAbi from '../abi/tokenABI.json'

import mockProvider from '../mock/MockProvider'
import {currentEnv, rpcUrl, squidAddress, ticketAddress, ticketInfoAddress, twoAddress} from './config'

let provider = new providers.JsonRpcProvider({url: rpcUrl})
// let wallet = new ethers.Wallet('', provider)

let ticketContract
let ticketInfoContract
let squidContract
let twoContract

if (currentEnv == 'dev') {
  ticketContract = mockProvider
  ticketInfoContract = mockProvider
  squidContract = mockProvider
  twoContract = mockProvider
} else {
  ticketContract = new Contract(ticketAddress, ticketAbi, provider)
  ticketInfoContract = new Contract(ticketInfoAddress, ticketInfoAbi, provider)
  squidContract = new Contract(squidAddress, squidAbi, provider)
  twoContract = new Contract(twoAddress, tokenAbi, provider)
}

export {
  provider,
  ticketContract,
  ticketInfoContract,
  squidContract,
  twoContract
}
