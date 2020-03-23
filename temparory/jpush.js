let axios = require('axios')

function send(message) {
  axios.post('http://localhost:8880/send', {
    deviceToken: '3853987f81e4c53fd2bf710fdb300a086fc5afc5fa9768f24d4ea811b9e5892d',
    message
  })
}

module.exports = send
