let moment = require('moment')
let push = require('./jpush')

function isNight(now) {
  let hour = moment(now).hour()
  let minute = moment(now).minute()
  if (hour < 6) {
    return true
  }
  if (hour == 6 && minute < 30) {
    return true
  }
  return false
}

class BaseTimeStrategy {
  constructor(seconds) {
    this.previousSeconds = moment().valueOf()
    this.seconds = seconds
  }

  check(priceList) {
    let now = priceList.get(priceList.length() - 1).seconds
    if (isNight(now)) {
      return false
    }
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
      return `${this.type}: ${price.sellRate}, ${price.buyRate}`
    }
    return null
  }
}

class MultiTimeStrategy extends BaseTimeStrategy {
  constructor(seconds) {
    super(seconds)
  }

  getContent(pricePtList, pricePdList, priceAuList) {
    if (!this.check(pricePtList) && pricePtList.length() > 1) {
      return null
    }
    const pricePt = pricePtList.get(pricePtList.length() - 1).price
    const pricePd = pricePdList.get(pricePdList.length() - 1).price
    const priceAu = priceAuList.get(priceAuList.length() - 1).price
    return `铂金: ${pricePt.buyRate}, ${pricePt.sellRate}` + '\n' +
      `钯金: ${pricePd.buyRate}, ${pricePd.sellRate}` + '\n' +
      `黄金: ${priceAu.buyRate}, ${priceAu.sellRate}`
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
      const lastItem = priceList.get(priceList.length() - 1)
      let diff = this.diff
      if (isNight(lastItem.seconds)) {
        diff = diff * 1.5
      }
      if (Math.abs(lastItem.price.sellRate - priceList.get(nearestSecondsIndex).price.sellRate) > diff) {
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
      return `价格浮动：${diff} ,${this.type}: ${price.buyRate}, ${parseInt(this.diffSeconds / 1000)}秒前：${nearestPrice.buyRate}`
    }
    return null
  }
}

let timeStrategy = new MultiTimeStrategy(30 * 60 * 1000)

const oneMinute = 60 * 1000

let diffStrategyList = [
  new DiffStrategy('铂金', 1.0, oneMinute),
  new DiffStrategy('铂金', 1.2, 2 * oneMinute),
  new DiffStrategy('铂金', 2, 5 * oneMinute),
  new DiffStrategy('铂金', 3.5, 30 * oneMinute),
  new DiffStrategy('铂金', 4.5, 60 * oneMinute),

  new DiffStrategy('钯金', 2.2, oneMinute),
  new DiffStrategy('钯金', 3.0, 2 * oneMinute),
  new DiffStrategy('钯金', 4.0, 5 * oneMinute),
  new DiffStrategy('钯金', 8.0, 30 * oneMinute),
  new DiffStrategy('钯金', 10, 60 * oneMinute),

  new DiffStrategy('黄金', 1.0, oneMinute),
  new DiffStrategy('黄金', 1.3, 2 * oneMinute),
  new DiffStrategy('黄金', 1.6, 5 * oneMinute),
  new DiffStrategy('黄金', 2.2, 30 * oneMinute),
  new DiffStrategy('黄金', 3.0, 60 * oneMinute)
]

module.exports = function notify(pricePt, pricePd, priceAu) {
  let timeContent = timeStrategy.getContent(pricePt, pricePd, priceAu)

  if (timeContent) {
    push(timeContent)
  }

  diffStrategyList.forEach(diffStrategy => {
    let diffContent = diffStrategy.getContent(pricePt)
    if (diffContent) {
      push(diffContent)
    }
  })
}
