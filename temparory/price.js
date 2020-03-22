let axios = require('axios')
let moment = require('moment')
let notify = require('./notify-service')


axios.defaults.withCredentials = true

let json = null

class List {
  constructor(size) {
    this.size = size || 2880
    this.list = []
  }

  push(item) {
    if (this.list.length > this.size) {
      this.list = this.list.slice(this.list.length - this.size)
    }
    this.list.push(item)
  }

  get(i) {
    return this.list[i]
  }

  length() {
    return this.list.length
  }
}

const listPt = new List()
const listPd = new List()
const listAu = new List()

function fetchData() {
  axios.post('', `json=${json}`, {

  }).then(res => {
    let list = res.data.result

    listPt.push({
      seconds: moment().valueOf(),
      price: {
        sellRate: list[2].sellRate,
        buyRate: list[2].buyRate
      }
    })

    listPd.push({
      seconds: moment().valueOf(),
      price: {
        sellRate: list[3].sellRate,
        buyRate: list[3].buyRate
      }
    })
    listAu.push({
      seconds: moment().valueOf(),
      price: {
        sellRate: list[0].sellRate,
        buyRate: list[0].buyRate
      }
    })
    notify(listPt, listPd, listAu)
  })
}


// let mockList = new List(100)
//
// function mock() {
//   mockList.push({
//     seconds: moment().valueOf(),
//     price: {
//       sellRate: (Math.random() * 300).toFixed(2),
//       buyRate: (Math.random() * 300).toFixed(2)
//     }
//   })
//   notify(mockList, mockList, mockList)
// }
//
// setInterval(() => {
//   mock()
// }, 1000)

function start() {
  let time = moment()
  let weekday = time.weekday()
  let hour = time.hour()
  let minute = time.minute()

  if (weekday == 6 && hour > 5) {
    return
  }
  if (weekday == 0) {
    return
  }
  if (weekday == 1 && hour < 6) {
    return
  }
  if (weekday == 1 && hour == 6 && minute < 50) {
    return
  }

  fetchData()
}

setInterval(() => {
  start()
}, 60 * 1000)

start()