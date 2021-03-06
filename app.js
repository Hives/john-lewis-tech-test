const express = require('express')
const exphbs = require('express-handlebars')
const request = require('request')

const ProductList = require('./models/product-list.js')
const ProductDetails = require('./models/product-details.js')

const apiQuery = require('./helpers/api-query.js')
const mockApiDataIfNoDataReturned = require('./helpers/api-workaround.js')

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/dishwashers', (req, res) => {
  const queryUrl = apiQuery.construct({
    stub: 'search',
    parameters: {
      q: 'dishwasher',
      pageSize: 20
    }
  })

  request(queryUrl, { json: true }, (err, apiResponse, body) => {
    if (err) {
      res.render('error', { errorMessage: err })
      return
    }

    // Sometimes the API wouldn't return any data, so I put this here...
    body = mockApiDataIfNoDataReturned(body, queryUrl, 'dishwashers.json')

    const productList = new ProductList(body)
    res.render('product-grid', {
      title: 'Dishwashers',
      items: productList.items
    })
  })
})

app.get('/product/:productId', (req, res) => {
  const productId = req.params.productId
  const queryUrl = apiQuery.construct({
    stub: productId
  })

  request(queryUrl, { json: true }, (err, apiResponse, body) => {
    if (err) {
      res.render('error', { errorMessage: err })
      return
    }

    // Sometimes the API wouldn't return any data, so I put this here...
    body = mockApiDataIfNoDataReturned(body, queryUrl, `product-${productId}.json`)

    const productDetails = new ProductDetails(body)
    res.render('product-details', {
      product: productDetails
    })
  })
})

app.server = app.listen(3000, () => {
  if (process.env.NODE_ENV !== 'test') {
    console.log('Listening on port 3000')
  }
})

module.exports = app
