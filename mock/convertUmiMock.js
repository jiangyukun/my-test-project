const data = require('./api-data')

const convertData = data.list.map(item => {
  const {url, data} = item
  const parts = url.split('|')
  if (!parts[1]) {
    parts[1] = 'get'
  }
  return {
    key: parts[1].toUpperCase() + ' /api2' + parts[0],
    data
  }
})

let mockItem = convertData.map(item => {
  return JSON.stringify(item.key) + ': ' + JSON.stringify({
    errorMsg: '',
    errorCode: 0,
    results: item.data
  }) + ','
})

console.log(`
export default {
${mockItem.join('\n')}
}
`)
