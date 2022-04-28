

let axios = require('axios')

let url = 'https://oapi.dingtalk.com/robot/send?access_token=7e78ef0b081f32f1e3139ac61f7c695cf8c96bab6333598a2cbf95fcd0d904e4'


axios.post(url, {
  msgtype: 'text',
  text: {
    content: 'hahaha'
  }
}, {
  headers: {
    'Content-Type': 'application/json'
  }
}).then(data=> {
  console.log(data)
}).catch(e=> {
  console.log(e)
})

