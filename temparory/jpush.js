let {JPushAsync} = require('jpush-async')
var client = JPushAsync.buildClient('4681c35ce0451169c4f4d592', '691d5b75137030b60de9a1b5')

async function push(message) {
  client.push().setPlatform('ios')
    .setAudience(JPushAsync.alias('jiangyu'))
    .setNotification('Hi', JPushAsync.ios(message, 'happy', 5))
    .setMessage(message)
    .setOptions(null, 60, null, false)
    .send()
    .then(function (result) {
      console.log(result)
    }).catch(function (err) {
    console.log(err)
  })

}

module.exports = push
