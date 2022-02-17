import {APP} from '../core/types'
import {squidContract} from '../core/ethers'

export function fetchGlobalProcess(period, round) {
  let type
  if (round == 0) {
    type = APP.fetchGlobalProcess1
  }
  if (round == 1) {
    type = APP.fetchGlobalProcess2
  }
  if (round == 2) {
    type = APP.fetchGlobalProcess3
  }
  if (round == 3) {
    type = APP.fetchGlobalProcess4
  }
  if (round == 4) {
    type = APP.fetchGlobalProcess5
  }
  return {
    type,
    effects: async () => {
      let res = await Promise.all([
        await squidContract.getTotalCall(period, round),
        await squidContract.getTotalPut(period, round),
        await squidContract.getRoundPrice(period, round),
      ])
      let totalCall = res[0]
      let totalPut = res[1]
      let startPrice = res[2][0]
      let endPrice = res[2][1]
      return {
        call: totalCall.toNumber(),
        put: totalPut.toNumber(),
        startPrice: startPrice.toNumber() / 100 || null,
        closePrice: endPrice.toNumber() / 100 || null
      }
    }
  }
}

export function fetchMyProcess(period, round, actionType?) {
  let type
  if (round == 0) {
    type = APP.fetchMyProcess1
  }
  if (round == 1) {
    type = APP.fetchMyProcess2
  }
  if (round == 2) {
    type = APP.fetchMyProcess3
  }
  if (round == 3) {
    type = APP.fetchMyProcess4
  }
  if (round == 4) {
    type = APP.fetchMyProcess5
  }
  return {
    type: actionType || type,
    effects: async () => {
      let res = await Promise.all([
        await squidContract.getMyCall(period, round),
        await squidContract.getMyPut(period, round),
        await squidContract.getRoundPrice(period, round),
      ])
      let totalCall = res[0]
      let totalPut = res[1]
      let startPrice = res[2][0]
      let endPrice = res[2][1]

      return {
        call: totalCall.toNumber(),
        put: totalPut.toNumber(),
        startPrice: startPrice.toNumber() / 100 || null,
        closePrice: endPrice.toNumber() / 100 || null
      }
    }
  }
}
