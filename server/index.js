var express = require('express')
var app = express()

app.get('/api', function (req, res) {
  res.send('Hello World!')
})
app.listen(3001, function () {
  console.log('App listening on the port 3001')
})
