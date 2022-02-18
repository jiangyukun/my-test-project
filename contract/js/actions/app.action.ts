import {APP} from '../core/types'
import {provider, squidContract, ticketContract, ticketInfoContract, twoContract} from '../core/ethers'
import {getTokenValue, toTokenValue} from '../util'
import {squidAddress, ticketAddress} from '../core/config'

export function startWsType(actionType, wsType, data?) {
  let once = false
  if (data && data.once) {
    once = true
  }
  return {
    type: actionType,
    wsType,
    data,
    once
  }
}

export function buyTicket(address) {
  return {
    type: APP.buyTicket,
    effects: async () => {
      let d = await twoContract.allowance(address, ticketAddress)
      if (getTokenValue(d) == 0 || getTokenValue(d) < 10000) {
        let tx = await twoContract.approve(ticketAddress, toTokenValue(1000000))
        await tx.wait()
      }
      let tx = await ticketContract.bBoxOpen(1, {gasLimit: 600000})
      await tx.wait()
      return tx.hash
    }
  }
}

export function fetchTicketInfo(address) {
  return {
    type: APP.fetchTicketInfo,
    effects: async () => {
      return await ticketInfoContract.tokensOfOwner(address)
    }
  }
}

export function useTicket(address, tokenID) {
  return {
    type: APP.useTicket,
    effects: async () => {
      let d = await ticketInfoContract.isApprovedForAll(address, squidAddress)
      if (!d) {
        let tx = await ticketInfoContract.setApprovalForAll(squidAddress, true)
        await tx.wait()
      }
      let tx = await squidContract.startGame(tokenID)
      await tx.wait()
      return tx.hash
    }
  }
}

export function placeBet(call) {
  return {
    type: APP.placeBet,
    effects: async () => {
      let gasPrice = await provider.getGasPrice()
      let tx = await squidContract.placeBet(call, {gasLimit: 800000, gasPrice: gasPrice.mul(15).div(10)})
      await tx.wait()
      return tx.hash
    }
  }
}

export function fetchCurrentChapterRound() {
  return {
    type: APP.fetchCurrentChapterRound,
    effects: async () => {
      let currentChapterRound = await squidContract.getCurrentChapterRound()
      let round = currentChapterRound[1].toNumber()
      if (round >= 5) {
        round = null
      }
      return {
        period: currentChapterRound[0].toNumber(),
        round
      }
    }
  }
}

export function fetchRoundChip() {
  return {
    type: APP.fetchRoundChip,
    effects: async () => {
      // 返回自己可以用的筹码
      let myChip = await squidContract.getRoundChip()
      return myChip.toNumber()
    }
  }
}

export function fetchRoundStartTime(chapter, round) {
  return {
    type: APP.fetchRoundStartTime,
    effects: async () => {
      let time = await squidContract._lastRoundStartTime(chapter, round)
      return time.toNumber()
    }
  }
}

export function fetchRoundStartChips(chapter, address) {
  return {
    type: APP.fetchRoundStartChips,
    effects: async () => {
      // 返回自己可以用的筹码
      let startRoundChip = await squidContract.initChipOfOwner(address, chapter)
      return startRoundChip.toNumber()
    }
  }
}

export function fetchUserBonus() {
  return {
    type: APP.fetchUserBonus,
    effects: async () => {
      let data = await squidContract.callStatic.getUserBonus()
      return getTokenValue(data)
    }
  }
}

export function claimBonus() {
  return {
    type: APP.claimBonus,
    effects: async () => {
      let tx = await squidContract.claim()
      await tx.wait()
    }
  }
}

export function fetchTotalBonus(chapter) {
  return {
    type: APP.fetchTotalBonus,
    effects: async () => {
      let data = await squidContract.getTotalBonus(chapter)
      return getTokenValue(data)
    }
  }
}

export function fetchNextGameTime() {
  return {
    type: APP.fetch_nextGameTime,
    effects: async () => {
      let time = await squidContract._nextGameTime()
      return time.toNumber()
    }
  }
}
