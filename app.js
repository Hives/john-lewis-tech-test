const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.get('/dishwashers', (req, res) => {
  res.render('dishwashers')
})

module.exports = app
