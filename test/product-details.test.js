const chai = require('chai')
const expect = chai.expect
const ProductDetails = require('../models/product-details.js')

describe('ProductDetails class', function () {
  const productData = require('./mockApiResponses/product-1391191.json')
  const productDetails = new ProductDetails(productData)

  it('has a productId', function () {
    expect(productDetails.productId).to.equal('1391191')
  })
})
