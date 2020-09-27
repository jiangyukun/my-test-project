let axios = require('axios')
let wanke = require('wanke-bff-share').default
const {analogsModels} = wanke.models

const host = 'http://120.24.46.152:9999/'
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0MDkzODEiLCJmaXJtSWQiOjQwNTUsInJvbGVJZCI6NDA1NiwiZXhwIjoxNjAyMDM5NTc2LCJ1c2VyTmFtZSI6InhpZ2VzaSIsInVzZXJJZCI6NDA5MzgxfQ.QKSbMbj9gNvgvxohl_8yW50oiIf-5DLgwI26NbY5Na3RDJjgTMdEGamFvMEQ46v8P-AeAjQnJBrN-GZwOotklqhgyg3llCTjYKmSgKR4JXlRE-60aVDMEZiHoqt5It9BO6T7TlpCE13RgkanJkD81-m06N9eVQlQcCR-CEYQsLjD0PmMvMa4TJXS1tvhprMjjBkCjZAl2OwWeVo-_DaF9HZhiB4y8kgguQfsuLVNqtz-xODcM7kE7TZjNMF_8OoAvtOKRwxXVzrelbzFsLDSGMPLE2y_cI4AhRjvux8hkIcQj45u9vf3i-UXy_tVAPOIvILd9IhJ6hEvpmgh0Guopg'


let _req = {
  _apiBaseUrl: host,
  _token: token,
  _language: 'zh',
  _translation: {
  }
}

async function fetchPointNumber() {
  try {
    let res = await analogsModels.getAnalogsByIdAndType(_req, {
      deviceId: 347755,
      typeName: 'ChargeDay,ChargeMonth',
      terminalName: 'default'
    })

    console.log(res)
  } catch(e) {
    console.error(e)
  }


  axios.get(`${host}/ems-device/analogs/byDevAndType?deviceId=347755&typeName=ChargeDay&terminalName=default`, {
    headers: {
      'Access-Token': token
    }
  }).then(res => {
    console.log(res.data.results)
    let list = res.data.results
    list.forEach(item=> {
      fetchHistory(item.pointNumber)
      fetchRealtime(item.pointNumber)
    })
  })
}

function fetchHistory(pointNumber) {
  let dtime = '2020-09-01 00:00:00,2020-09-27 23:59:59'
  axios.get(`${host}/ems-meas-history/measurements?pointNumber=${pointNumber}&dtime=${dtime}`, {
    headers: {
      'Access-Token': token
    }
  }).then(res => {
    console.log('fetchHistory', res.data.results)
  })
}


function fetchRealtime(pointNumber) {
  axios.get(`${host}/ems-meas-realtime/measurements/realtime?pointNumber=${pointNumber}`, {
    headers: {
      'Access-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0MDkzODEiLCJmaXJtSWQiOjQwNTUsInJvbGVJZCI6NDA1NiwiZXhwIjoxNjAyMDM5NTc2LCJ1c2VyTmFtZSI6InhpZ2VzaSIsInVzZXJJZCI6NDA5MzgxfQ.QKSbMbj9gNvgvxohl_8yW50oiIf-5DLgwI26NbY5Na3RDJjgTMdEGamFvMEQ46v8P-AeAjQnJBrN-GZwOotklqhgyg3llCTjYKmSgKR4JXlRE-60aVDMEZiHoqt5It9BO6T7TlpCE13RgkanJkD81-m06N9eVQlQcCR-CEYQsLjD0PmMvMa4TJXS1tvhprMjjBkCjZAl2OwWeVo-_DaF9HZhiB4y8kgguQfsuLVNqtz-xODcM7kE7TZjNMF_8OoAvtOKRwxXVzrelbzFsLDSGMPLE2y_cI4AhRjvux8hkIcQj45u9vf3i-UXy_tVAPOIvILd9IhJ6hEvpmgh0Guopg'
    }
  }).then(res => {
    console.log('fetchRealtime', res.data.results)
  })
}

fetchPointNumber()

// fetchRealtime('111010000500175')
