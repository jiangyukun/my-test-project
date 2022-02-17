import * as moment from 'moment'
import {periodWaitingSecond, roundCount, roundSeconds} from '../core/config'

class SquidGameCore {
  timestamp
  period = null
  periodStartTime
  round = null
  roundStartTime
  periodAddressInfoList = []
  periodRoundPriceList = []
  addressTicketList = []
  waitSeconds = periodWaitingSecond
  started = false
  currentPrice

  constructor() {
    this.timestamp = Math.floor(moment().valueOf() / 1000)
    this.toNextPeriod()
    this.tick()
  }

  getCurrentPrice() {
    if (this.currentPrice) {
      let d = Math.floor(Math.random() * 100)
      this.currentPrice = this.currentPrice + 0.0005 * (d % 2 == 0 ? 1 : -1)
    } else {
      this.currentPrice = 2.0123
    }
  }

  getPeriodAddressInfoList(period) {
    return this.periodAddressInfoList.find(item => item.period == period).addressInfoList
  }

  getAddressInfo(period, address) {
    let addressInfoList = this.getPeriodAddressInfoList(period)
    let match = addressInfoList.find(item => item.address == address)
    return match
  }

  getAddressFireInfo(period, round, address) {
    let match = this.getAddressInfo(period, address)
    if (match) {
      if (!match.rounds[round]) {
        match.rounds[round] = {call: 0, put: 0}
      }
      return match.rounds[round]
    }
    return {call: 0, put: 0}
  }

  getPriceInfo(period, round) {
    let periodPrice = this.periodRoundPriceList.find(item => item.period == period)
    let roundInfo = periodPrice.rounds[round]
    if (!roundInfo) {
      roundInfo = {startPrice: null, closePrice: null}
      periodPrice.rounds[round] = roundInfo
    }
    return roundInfo
  }

  tick() {
    setInterval(() => {
      this.getCurrentPrice()
      this.timestamp += 1
      this.waitSeconds -= 1

      if (this.waitSeconds >= 0) {
      }

      if (this.waitSeconds < 0 && !this.started) {
        this.onStart()
      }
      if (this.timestamp > this.roundStartTime + roundSeconds) {
        this.toNextRound()
      }
      if (this.round !== null) {
        this.handleCurrentRound()
      }
    }, 1000)
  }

  onStart() {
    this.started = true
    this.toNextRound()
  }

  toNextRound() {
    if (this.round !== null) {
      let priceInfo = this.getPriceInfo(this.period, this.round)
      priceInfo.closePrice = this.currentPrice
      this.settle()
    }
    if (this.round === null) {
      this.round = 0
    } else {
      this.round++
    }
    let priceInfo = this.getPriceInfo(this.period, this.round)
    priceInfo.startPrice = this.currentPrice
    this.roundStartTime = this.timestamp
    if (this.round == roundCount) {
      this.toNextPeriod()
    }
  }

  toNextPeriod() {
    this.waitSeconds = periodWaitingSecond
    if (this.period === null) {
      this.period = 0
    } else {
      this.period++
    }
    this.round = null
    this.started = false
    this.periodStartTime = this.timestamp
    this.periodAddressInfoList.push({
      period: this.period,
      addressInfoList: []
    })
    this.periodRoundPriceList.push({
      period: this.period,
      rounds: []
    })
  }

  buyTicket(address) {
    let match = this.addressTicketList.find(item => item.address == address)
    if (!match) {
      match = {address, total: 0}
      this.addressTicketList.push(match)
    }
    match.total++
  }

  useTicket(address) {
    if (this.started) {
      throw new Error('use ticket error')
    }
    let matchTicket = this.addressTicketList.find(item => item.address == address)
    if (!matchTicket) {
      throw new Error('buy ticket first')
    } else {
      if (matchTicket.total <= 0) {
        throw new Error('buy ticket first')
      } else {
        matchTicket.total--
      }
    }
    let addressInfoList = this.getPeriodAddressInfoList(this.period)
    let match = addressInfoList.find(item => item.address == address)
    if (match) {
      throw new Error('already use ticket')
    } else {
      addressInfoList.push({
        address,
        rounds: [],
        total: Math.random() > 0.5 ? 32 : 16
      })
    }
  }

  fire(address, call) {
    let roundInfo = this.getAddressFireInfo(this.period, this.round, address)
    let addressInfo = this.getAddressInfo(this.period, address)
    if (!roundInfo) {

    }
    if (roundInfo.call !== 0 || roundInfo.put !== 0) {
      throw new Error('already fired')
    }
    if (call > roundInfo.total || call < 0) {
      throw new Error('call count overflow')
    }
    roundInfo.call = call
    roundInfo.put = addressInfo.total - call
  }

  settle() {
    let addressInfoList = this.getPeriodAddressInfoList(this.period)
    addressInfoList.forEach(addressInfo => {
      let roundInfo = this.getAddressFireInfo(this.period, this.round, addressInfo.address)
      let priceInfo = this.getPriceInfo(this.period, this.round)
      if (priceInfo.closePrice > priceInfo.startPrice) {
        addressInfo.total = roundInfo.call
      } else {
        addressInfo.total = roundInfo.put
      }
    })
  }

  getCurrentPeriodRound() {
    return {
      period: this.period,
      round: this.round
    }
  }

  getCurrentChip(address) {
    let addressInfo = this.getAddressInfo(this.period, address)
    if (addressInfo) {
      return addressInfo.total
    }
    return 0
  }

  /**
   * 获取当前用户可获得奖金  (当前用户筹码/总筹码)*总奖金
   *
   * @param address 用户地址
   * @returns 可获得奖金数
   */
  getBonus(address: string) {
    let totalBonus = this.getPeriodBonus(this.period)
    let userChip = this.getCurrentChip(address)
    let addressInfoList = this.getPeriodAddressInfoList(this.period)
    // 把infoList中所有的筹码数加起来
    let totalChip = Array.isArray(addressInfoList) ? addressInfoList.reduce((pre, current) => pre + current.total, 0) : NaN

    return (userChip / totalChip) * totalBonus
  }

  getPeriodBonus(period) {
    return 50
  }

  handleCurrentRound() {

  }
}

export default SquidGameCore
