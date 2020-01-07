const data = require('./api-data')

let convertData = data.list.filter(item => item.url == '/enums|get').map(item => {
  const {param, data} = item

  return {
    resource: param.resource,
    data: data.results
  }
})



let list = []

console.log(`
module.exports = ${JSON.stringify(convertData)}
`)
