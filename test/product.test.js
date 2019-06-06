const chai = require('chai')
const expect = chai.expect
const Product = require('../models/product.js')

describe('Product model', function() {
  const productData = require('./mockApiResponses/dishwashers.json').products
  let product = new Product(productData[0])
  it('has a productId', function() {
    expect(product.productId).to.equal('1391191')
  })
})
