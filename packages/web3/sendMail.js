const nodemailer = require('nodemailer')

function sendMail(message) {
  const smtpTransport = nodemailer.createTransport({
    host: 'smtp.qq.com',
    secureConnection: true,
    secure: true,
    port: 465,
    auth: {
      user: '191295604@qq.com',
      pass: '',
    }
  })

  smtpTransport.sendMail({
    from: '191295604@qq.com',
    to: '248523234@qq.com',
    subject: 'important',
    html: message
  }, function (err, res) {
    if (err) {
      console.log('error: ', err)
    }
  })
}

module.exports = sendMail
