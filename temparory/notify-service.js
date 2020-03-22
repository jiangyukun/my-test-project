let moment = require('moment')
let push = require('./jpush')


class BaseTimeStrategy {
  constructor(seconds) {
    this.previousSeconds = moment().valueOf()
    this.seconds = seconds
  }

  check(priceList) {
    let now = priceList.get(priceList.length() - 1).seconds
    if (now - this.previousSeconds > this.seconds) {
      this.previousSeconds = moment().valueOf()
      return true
    }
    return false
  }
}

//定时推送
class TimeStrategy extends BaseTimeStrategy {
  constructor(type, seconds) {
    super(seconds)
    this.type = type
  }

  getContent(priceList) {
    if (this.check(priceList)) {
      const price = priceList.get(priceList.length() - 1).price
      return `定时通知: ${this.type}: ${price.sellRate}, ${price.buyRate}`
    }
    return null
  }
}

class MultiTimeStrategy extends BaseTimeStrategy {
  constructor(seconds) {
    super(seconds)
  }

  getContent(pricePtList, pricePdList, priceAuList) {
    if (!this.check(pricePtList)) {
      return null
    }
    const pricePt = pricePtList.get(pricePtList.length() - 1).price
    const pricePd = pricePdList.get(pricePdList.length() - 1).price
    const priceAu = priceAuList.get(priceAuList.length() - 1).price
    return `定时通知: 铂金: ${pricePt.buyRate}, ${pricePt.sellRate}` + '\n' +
      `定时通知: 钯金: ${pricePd.buyRate}, ${pricePd.sellRate}` + '\n' +
      `定时通知: 黄金: ${priceAu.buyRate}, ${priceAu.sellRate}`
  }
}

//价格差
class DiffStrategy {
  constructor(type, diff, diffSeconds) {
    this.type = type
    this.diff = diff
    this.diffSeconds = diffSeconds
    this.previousSeconds = moment().valueOf()
  }

  getNearestIndex(priceList) {
    let nearestSecondsIndex
    let seconds = moment().valueOf() - this.diffSeconds
    for (let i = priceList.length() - 1; i >= 0; i--) {
      let price = priceList.get(i)
      if (price.seconds < seconds && price.seconds > this.previousSeconds) {
        nearestSecondsIndex = i
        break
      }
    }
    return nearestSecondsIndex
  }

  check(priceList) {
    if (priceList.length() < 2) {
      return false
    }
    let nearestSecondsIndex = this.getNearestIndex(priceList)
    if (nearestSecondsIndex != undefined) {
      if (Math.abs(priceList.get(priceList.length() - 1).price.sellRate - priceList.get(nearestSecondsIndex).price.sellRate) > this.diff) {
        return true
      }
    }
    return false
  }

  getContent(priceList) {
    if (this.check(priceList)) {
      const price = priceList.get(priceList.length() - 1).price
      let nearestSecondsIndex = this.getNearestIndex(priceList)
      this.previousSeconds = moment().valueOf()
      let nearestPrice = priceList.get(nearestSecondsIndex).price
      let diff = (price.sellRate - nearestPrice.sellRate).toFixed(1)
      return `价格差：${diff} ,${this.type}: ${price.buyRate}, 之前：${nearestPrice.buyRate}`
    }
    return null
  }
}

// let timeStrategyPt = new TimeStrategy('铂金', 10 * 60 * 1000)
// let timeStrategyPd = new TimeStrategy('钯金', 10 * 60 * 1000)
// let timeStrategyAu = new TimeStrategy('黄金', 10 * 60 * 1000)
let timeStrategy = new MultiTimeStrategy(30 * 60 * 1000)

let diffStrategyPt = new DiffStrategy('铂金', 1, 60 * 1000)
let diffStrategyPd = new DiffStrategy('钯金', 3, 60 * 1000)
let diffStrategyAu = new DiffStrategy('黄金', 1.5, 60 * 1000)

module.exports = function notify(pricePt, pricePd, priceAu) {
  let timeContent = timeStrategy.getContent(pricePt, pricePd, priceAu)

  if (timeContent) {
    push(timeContent)
  }

  let diffPtContent = diffStrategyPt.getContent(pricePt)
  if (diffPtContent) {
    push(diffPtContent)
  }

  let diffPdContent = diffStrategyPd.getContent(pricePd)
  if (diffPdContent) {
    push(diffPdContent)
  }

  let diffAuContent = diffStrategyAu.getContent(priceAu)
  if (diffAuContent) {
    push(diffAuContent)
  }
}
