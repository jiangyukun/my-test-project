const express = require('express')
let app = express()
let Router = express.Router


let router = new Router()

router.get('/b', (req, res) => {
  res.json({
    a: 1
  })
})

app.get('/', (req, res, next) => {
  console.log('23');
})
app.use('/a', router)

app.listen(9999)
