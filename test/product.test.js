const chai = require('chai')
const expect = chai.expect
const Product = require('../models/product.js')

describe('Product model', function () {
  const productData = require('./mockApiResponses/dishwashers.json').products
  const product = new Product(productData[0])

  it('has a productId', function () {
    expect(product.productId).to.equal('1391191')
  })

  it('has a title', function () {
    expect(product.title).to.equal('Indesit DIF 04B1 Ecotime Fully Integrated Dishwasher, White')
  })

  it('has a price', function () {
    expect(product.price).to.equal('219.00')
  })

  it('has an image url', function () {
    expect(product.image).to.equal('//johnlewis.scene7.com/is/image/JohnLewis/233326789?')
  })
})
