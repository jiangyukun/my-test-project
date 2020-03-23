let apn = require('apn')

let options = {
  token: {
    key: '.p8',
    keyId: '',
    teamId: ''
  },
  production: false
}

let apnProvider = new apn.Provider(options)

let note = new apn.Notification()

note.expiry = Math.floor(Date.now() / 1000) + 3600
note.badge = 3
note.sound = 'ping.aiff'
note.alert = 'You have a new message'
note.payload = {'messageFrom': 'John Appleseed'}
note.topic = ''

apnProvider.send(note, '').then((result) => {
  console.log(result)
})
