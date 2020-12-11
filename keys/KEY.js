const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const config = require('./config')

let passphrase = config.key

if (!passphrase) {
  throw new Error('enter passphrase')
}

function generateKeys() {
  const {publicKey, privateKey} = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase,
    },
  })
  fs.writeFileSync('private.cer', privateKey)
  fs.writeFileSync('public.cer', publicKey)
}

function encrypt(plain, pathToPublicKey) {
  const publicKey = fs.readFileSync(path.resolve(__dirname, pathToPublicKey), 'utf8')
  const buffer = Buffer.from(plain, 'utf8')
  return crypto.publicEncrypt(publicKey, buffer).toString('base64')
}

function decrypt(cipher, pathToPrivateKey) {
  const privateKey = fs.readFileSync(path.resolve(__dirname, pathToPrivateKey), 'utf8')
  const buffer = Buffer.from(cipher, 'base64')
  const plain = crypto.privateDecrypt({
    key: privateKey.toString(),
    passphrase
  }, buffer)
  return plain.toString('utf8')
}

module.exports = {
  generateKeys,
  encrypt,
  decrypt,
}

let txt = fs.readFileSync('key-data.txt').toString()

let content = `

`
try {
  let txt1 = decrypt(txt, 'private.cer')
  console.log(txt1)
} catch (e) {

}

if (/\w+/.test(content)) {
  let t = encrypt(content, 'public.cer')
  fs.writeFileSync('key-data.txt', t)
}
