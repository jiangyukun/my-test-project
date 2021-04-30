const http = require('http')
let app =http.createServer((req, res)=> {
  console.log(1);
  res.end('aa')
})
app.listen(9999)
