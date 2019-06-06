const express = require('express')
const exphbs = require('express-handlebars')
const request = require('request')

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.get('/dishwashers', (req, res) => {
  // res.send("hello")
  const searchTerm = 'dishwasher'
  const apiKey = 'Wu1Xqn3vNrd1p7hqkvB6hEu0G9OrsYGb'
  const numResults = 20
  const url = `https://api.johnlewis.com/v1/products/search?q=${searchTerm}&key=${apiKey}&pageSize=${numResults}`

  request(url, { json: true }, (err, apiResponse, body) => {
    if (err) { return console.log(err) }
    const productList = apiResponse.body.products
    res.render('dishwashers', { productList: productList } )
  })
})

module.exports = app
