let axios = require('axios')
let moment = require('moment')
let notify = require('./notify-service')


axios.defaults.withCredentials = true

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
    headers: {
      Cookie: 'JSESSIONID=0000wUxcIQfCgKONuNN0Fndia5f:1ci430u0n',
      Accept: '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'User-Agent': 'BOCMBCI/3.0.1 CFNetwork/1121.2.2 Darwin/19.3.0',
      'Accept-Language': 'zh-cn',
      'Content-Length': 579,
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'bfw-ctrl': 'json',
      'secfactor': 'auk',
      'Connection': 'keep-alive',
      'Host': 'ccsa.ebsnew.boc.cn'
    }
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

setInterval(() => {
  // let weekday = moment().weekday()
  // let hour = moment().hour()
  //
  // if (weekday == 5 && hour > 5) {
  //   return
  // }
  // if (weekday == 6) {
  //   return
  // }
  // if (weekday == 0 && hour < 7) {
  //   return
  // }

  fetchData()
}, 60 * 1000)
