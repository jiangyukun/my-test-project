const data = require('./api-data')

let convertData = data.list.map(item => {
  const {url, data} = item
  if (url == '/enums|get') {
    return
  }
  const parts = url.split('|')
  if (!parts[1]) {
    return null
  }
  return {
    key: parts[1].toUpperCase() + ' /mock' + parts[0],
    data
  }
})

convertData = convertData.filter(item => item != null)

let apis = []
let keyList = []
convertData.forEach((item) => {
  if (keyList.indexOf(item.key) == -1) {
    apis.push(JSON.stringify(item.key) + ': ' + JSON.stringify(item.data) + ',')
  }
  keyList.push(item.key)
})

console.log(`
export default {
'GET /mock/enums': (req, res) => {
    let resource = req.query.resource
    let list = require('./enums')
    let match = list.find(item => item.resource == resource)

    res.json({
      errorCode: 0,
      errorMsg: '',
      results: match ? match.data : []
    })
  },
${apis.join('\n')}
}
`)
