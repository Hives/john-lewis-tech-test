const express = require('express')
const exphbs = require('express-handlebars')
const request = require('request')
const helpers = require('./helpers/helpers.js')
const ProductList = require('./models/product-list.js')
const apiQuery = require('./helpers/api-query.js')

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.get('/dishwashers', (req, res) => {
  const queryUrl = apiQuery.construct({
    stub: 'search',
    parameters: {
      q: 'dishwasher',
      pageSize: 20
    }
  })

  request(queryUrl, { json: true }, (err, apiResponse, body) => {
    if (err) { return console.log(err) }

    // Sometimes the API wouldn't return any data, so I put this here...
    apiResponse = helpers.mockApiDataIfNoDataReturned(apiResponse)

    const productList = new ProductList(apiResponse.body)
    res.render('product-grid', {
      title: 'Dishwashers',
      items: productList.items
    })
  })
})

module.exports = app
