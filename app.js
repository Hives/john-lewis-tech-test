const express = require('express')

const app = express()

app.get('/dishwashers', (req, res) => {
  res.send('Dishwashers')
})

module.exports = app
