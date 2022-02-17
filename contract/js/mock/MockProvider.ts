import {BigNumber} from 'ethers'
import moment from 'moment'
import SquidGameCore from './SquidGameCore'
import {toTokenValue} from '../util'
import store from '../createStore'
import {APP} from '../core/types'
import {wsUpdateType} from '../middleware/websocket'
import {currentEnv, periodSeconds, roundCount} from '../core/config'

function sleep(timeout) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })
}

function getDateTime(time) {
  let d = moment('2021-11-01 ' + time).valueOf()
  return d
}

class MockProvider {
  address = '0xd7dFC7e4249c40f9915E64b3D343FEC00BA525eC'
  hash
  squidGame: SquidGameCore
  callStatic

  constructor() {
    let squidGame = new SquidGameCore()
    this.squidGame = squidGame

    this.callStatic = {
      getUserBonus: async () => {
        let data = squidGame.getBonus(this.address)
        return toTokenValue(data)
      }
    }
    this.bBoxOpen().then(() => {
      // this.startGame(1).then(() => {
      //
      // })
    })
  }

  async request() {
    return ['0xd7dFC7e4249c40f9915E64b3D343FEC00BA525eC']
  }

  on(name, callback) {
  }

  async api(url, options) {
    if (url == '/second-price-history') {
      return [
        {'id': 304948, 'price': 2.1235, 'datetime': getDateTime('12:00:25')},
        {'id': 304947, 'price': 2.1233, 'datetime': getDateTime('12:00:20')},
        {'id': 304946, 'price': 2.1238, 'datetime': getDateTime('12:00:15')},
        {'id': 304945, 'price': 2.1234, 'datetime': getDateTime('12:00:10')},
        {'id': 304944, 'price': 2.1236, 'datetime': getDateTime('12:00:05')},
      ]
    }
    if (url == '/squid/period-multiple') {
      return {multiple: 2, historyMultiple: 1}
    }
  }

  socket(type) {
    if (type == 'wsServerTimestamp') {
      store.dispatch({
        type: wsUpdateType(APP.wsServerTimestamp),
        data: this.squidGame.timestamp
      })
    }
    if (type == 'FTMBinancePrice') {
      setInterval(() => {
        store.dispatch({
          type: wsUpdateType(APP.wsPrice),
          data: {
            price: this.squidGame.currentPrice,
            time: this.squidGame.timestamp
          }
        })
      }, 1000)
    }
  }

  getSigner() {
    return this
  }

  connect() {
    return this
  }

  async allowance(from, to) {
    return toTokenValue(100)
  }

  async approve(address, value) {
    return this
  }

  async isApprovedForAll(address, value) {
    return false
  }

  async setApprovalForAll(address, value) {
    return this
  }

  async wait() {
    await sleep(200)
    this.hash = Math.random() * 100
    return this
  }

  async balanceOf(address) {
    return toTokenValue(2220)
  }

  async tokensOfOwner(address) {
    let match = this.squidGame.addressTicketList.find(item => item.address == address)
    if (match) {
      return [BigNumber.from(1)]
    }
    return []
  }

  async getTicketInfo(tokenId) {
    return {
      ticketType: BigNumber.from(2)
    }
  }

  async claim() {
    return this
  }

  async bBoxOpen(ticketNum?, option?) {
    this.squidGame.buyTicket(this.address)
    await sleep(500)
    return this
  }

  async startGame(tokenId) {
    this.squidGame.useTicket(this.address)
    await sleep(500)
    return this
  }

  async placeBet(call) {
    this.squidGame.fire(this.address, call)
    await sleep(1000)
    return this
  }

  async getCurrentChapterRound() {
    let data = this.squidGame.getCurrentPeriodRound()
    return [BigNumber.from(data.period), BigNumber.from(data.round ?? roundCount)]
  }

  async getRoundChip() {
    let data = this.squidGame.getCurrentChip(this.address)
    return BigNumber.from(data)
  }

  async initChipOfOwner(address, chapter) {
    let data = this.squidGame.getAddressInfo(this.squidGame.period, address)
    return BigNumber.from(data ? 16 : 0)
  }

  async _nextGameTime() {
    let started = this.squidGame.started
    let data = this.squidGame.periodStartTime
    if (!started) {
      return BigNumber.from(data + this.squidGame.waitSeconds)
    } else {
      return BigNumber.from(data + periodSeconds)
    }
  }

  async _lastRoundStartTime(chapter, round) {
    let data = this.squidGame.roundStartTime
    return BigNumber.from(data)
  }

  async getTotalBonus(period) {
    let data = this.squidGame.getPeriodBonus(period)
    return toTokenValue(data)
  }

  async isInAddressList(address) {
    return false
  }

  async getClaimLimit(address) {
    return BigNumber.from(1)
  }

  async getUserTokenInfo(address) {
    let ticketInfo = this.squidGame.addressTicketList.find(item => item.address == address)
    if (ticketInfo) {
      let list = []
      for (let i = 1; i <= ticketInfo.total; i++) {
        list.push({isDrop: Math.random() > 0.5, tokenId: BigNumber.from(1)})
      }
      return list
    }
    return []
  }

  async _joinNum(period) {
    return BigNumber.from(this.squidGame.getPeriodAddressInfoList(this.squidGame.period).length)
  }

  async getTotalCall(period, round) {
    let data = this.squidGame.getAddressFireInfo(period, round, this.address)
    if (data) {
      return BigNumber.from(data.call)
    }
    return BigNumber.from(0)
  }

  async getTotalPut(period, round) {
    let data = this.squidGame.getAddressFireInfo(period, round, this.address)
    if (data) {
      return BigNumber.from(data.put)
    }
    return BigNumber.from(0)
  }

  async getRoundPrice(period, round) {
    let data = this.squidGame.getPriceInfo(period, round)
    if (data) {
      return [BigNumber.from(Math.floor(data.startPrice * 10000) | 0), BigNumber.from(Math.floor(data.closePrice * 10000) || 0)]
    }
    return BigNumber.from(0)
  }

  async getMyCall(period, round) {
    let data = this.squidGame.getAddressFireInfo(period, round, this.address)
    if (data) {
      return BigNumber.from(data.call)
    }
    return BigNumber.from(0)
  }

  async getMyPut(period, round) {
    let data = this.squidGame.getAddressFireInfo(period, round, this.address)
    if (data) {
      return BigNumber.from(data.put)
    }
    return BigNumber.from(0)
  }
}

let mockProvider
if (currentEnv == 'dev') {
  mockProvider = new MockProvider()
}

export default mockProvider
