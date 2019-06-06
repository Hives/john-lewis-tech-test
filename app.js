const express = require('express')
const exphbs = require('express-handlebars')
const request = require('request')
const Product = require('./models/product.js')

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.get('/dishwashers', (req, res) => {
  const searchTerm = 'dishwasher'
  const apiKey = 'Wu1Xqn3vNrd1p7hqkvB6hEu0G9OrsYGb'
  const numResults = 20
  const apiUrl = `https://api.johnlewis.com/v1/products/search?q=${searchTerm}&key=${apiKey}&pageSize=${numResults}`

  request(apiUrl, { json: true }, (err, apiResponse, body) => {
    if (err) { return console.log(err) }
    const productList = apiResponse.body.products.map(
      productData => new Product(productData)
    )
    res.render('dishwashers', { productList: productList })
  })
})

module.exports = app
