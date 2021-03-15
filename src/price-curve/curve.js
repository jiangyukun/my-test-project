let moment = require('moment')

let price = {
    "id": 480676,
    "effectiveDate": "2021-01-28 16:00:00",
    "failureDate": "9999-01-01 00:00:00",
    "electricityPriceDetails": [{
        "id": 480696,
        "type": "Multiple",
        "sn": 1,
        "months": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        "dealers": [{"id": 434208, "name": "Grid", "title": "电网", "sn": 1, "activity": true}],
        "energyUnits": null,
        "priceDetails": [{
            "id": 480755,
            "price": 3.654,
            "timeRange": ["02:00:00-12:00:00", "16:00:00-22:00:00", "00:00:00-02:00:00"],
            "priceRate": {"id": 3840, "name": "Sharp", "title": "尖峰", "sn": 1, "activity": true}
        }, {
            "id": 480288,
            "price": 2.354,
            "timeRange": ["12:00:00-16:00:00", "22:00:00-00:00:00"],
            "priceRate": {"id": 3841, "name": "Peak", "title": "高峰", "sn": 2, "activity": true}
        }],
        "realTimePrice": null
    }]
}

let commandList = [{
    "id": 479994,
    "startTime": "00:00",
    "endTime": "12:00",
    "activePower": 500,
    "soc": 99,
    "chargeCurrentLimit": null,
    "chargeVoltage": null,
    "dischargeCurrent": null,
    "dischargeEndVoltage": null,
    "controlCommand": {"id": 450150, "name": "Charge", "title": "充电", "sn": 1, "activity": true},
    "controlMode": {"id": 450172, "name": "Power", "title": "功率", "sn": 1, "activity": true},
    "endControlParam": {"id": 450153, "name": "SOC", "title": "SOC", "sn": 1, "activity": true},
    "energyUnitId": null
}, {
    "id": 480092,
    "startTime": "13:00",
    "endTime": "18:00",
    "activePower": null,
    "soc": 99,
    "chargeCurrentLimit": 500,
    "chargeVoltage": 500,
    "dischargeCurrent": null,
    "dischargeEndVoltage": null,
    "controlCommand": {"id": 450151, "name": "Discharge", "title": "放电", "sn": 2, "activity": true},
    "controlMode": {"id": 450173, "name": "Current/Voltage", "title": "电流/电压", "sn": 2, "activity": true},
    "endControlParam": {"id": 450153, "name": "SOC", "title": "SOC", "sn": 1, "activity": true},
    "energyUnitId": null
}, {
    "id": 479877,
    "startTime": "18:00",
    "endTime": "20:00",
    "activePower": null,
    "soc": null,
    "chargeCurrentLimit": null,
    "chargeVoltage": null,
    "dischargeCurrent": null,
    "dischargeEndVoltage": null,
    "controlCommand": {"id": 450152, "name": "Storage", "title": "蓄电", "sn": 3, "activity": true},
    "controlMode": null,
    "endControlParam": null,
    "energyUnitId": null
}, {
    "id": 479995,
    "startTime": "20:00",
    "endTime": "22:00",
    "activePower": 500,
    "soc": 99,
    "chargeCurrentLimit": null,
    "chargeVoltage": null,
    "dischargeCurrent": null,
    "dischargeEndVoltage": null,
    "controlCommand": {"id": 450151, "name": "Discharge", "title": "放电", "sn": 2, "activity": true},
    "controlMode": {"id": 450172, "name": "Power", "title": "功率", "sn": 1, "activity": true},
    "endControlParam": {"id": 450153, "name": "SOC", "title": "SOC", "sn": 1, "activity": true},
    "energyUnitId": null
}]

function separateMonthDay(startMonthDay, endMonthDay) {
    let monthRange = [moment(startMonthDay, 'MM-DD').month() + 1, moment(endMonthDay, 'MM-DD').month() + 1]
    // console.log(monthRange);
    let priceMonthRange = price.electricityPriceDetails.map(item => {
        return item.months
    })
    // console.log(priceMonthRange);

    let start = monthRange[0]
    let end = monthRange[1]
    let index = -1
    let nextIndex = -1
    let result = []

    for (let i = start; i <= end; i++) {
        nextIndex = priceMonthRange.findIndex(item => item.indexOf(i) != -1)
        if (i == start || nextIndex == index) {
            if (i == end) {
                result.push([`0${start}-01`, endMonthDay, index])
            }
            index = nextIndex
            continue
        } else {
            if (start == monthRange[0]) {
                result.push([startMonthDay, `0${i - 1}-31`, index])
            } else {
                result.push([`0${start}-01`, `0${i - 1}-31`, index])
            }
            index = nextIndex
            start = i
        }
        // console.log(i, index);
    }
    // console.log(index, nextIndex);
    // console.log(result);
    return result
}

function findPrice(monthIndex, minutes) {
    let monthInfo = price.electricityPriceDetails[monthIndex].priceDetails
    let priceTimeList = Object.keys(monthInfo).map(key => {
        return {timeRange: monthInfo[key].timeRange, price: monthInfo[key].price}
    })
    let match = priceTimeList.find(item => {
        return item.timeRange.find(range => {
            let parts = range.split('-')
            let start = moment(parts[0], 'HH:mm:ss').hour() * 60 + moment(parts[0], 'HH:mm:ss').minute()
            let end = moment(parts[1], 'HH:mm:ss').hour() * 60 + moment(parts[1], 'HH:mm:ss').minute()
            if (minutes >= start && minutes <= end) {
                return true
            }
        }) != undefined
    })
    if (match) {
        return match.price
    }
    console.log(`未找到对应的：${minutes}`);
    return null
}

let monthDayList = separateMonthDay('01-10', '11-25')

let chartDataX = []
let chartDataY = []
monthDayList.forEach(item => {
    for (let i = 0; i < 1440; i++) {
        let matchCommand = commandList.find(command => {
            let start = moment(command.startTime, 'HH:mm').hour() * 60 + moment(command.startTime, 'HH:mm').minute()
            let end = moment(command.endTime, 'HH:mm').hour() * 60 + moment(command.endTime, 'HH:mm').minute()
            if (i >= start && i <= end) {
                return true
            }
        })
        chartDataX.push(`2020-01-01 ${Math.floor(i / 60).toString().padStart(2, '0')}:${(i % 60).toString().padStart(2, '0')}:00`)
        if (matchCommand) {
            chartDataY.push(findPrice(item[2], i))
        } else {
            chartDataY.push(null)
        }
    }
})

console.log(chartDataX);
console.log(chartDataY);