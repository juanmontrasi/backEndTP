const express = require('express')
const app = express()
const port = 3000
const User = require('../models/User.js');

let user = new User('1', 'Fred Flintstone', 'Stone house in Bedrock city', 'Minorista', 'Consumidor final');

app.get('/', (req, res) => {
  res.send('Hello '+ user.getUserName())
})

app.listen(port, () => {
  console.log(`This app is listening on port 3000 ${port}`)
})
