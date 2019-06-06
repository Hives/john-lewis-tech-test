const chai = require('chai')
const expect = chai.expect
const ProductSummary = require('../models/product-summary.js')

describe('ProductSummary class', function () {
  const productData = require('./mockApiResponses/dishwashers.json').products
  const productSummary = new ProductSummary(productData[0])
  console.log(productData[3])

  it('has a productId', function () {
    expect(productSummary.productId).to.equal('1391191')
  })

  it('has a title', function () {
    expect(productSummary.title).to.equal('Indesit DIF 04B1 Ecotime Fully Integrated Dishwasher, White')
  })

  it('has a price', function () {
    expect(productSummary.price).to.equal('219.00')
  })

  it('has an image url', function () {
    expect(productSummary.image).to.equal('//johnlewis.scene7.com/is/image/JohnLewis/233326789?')
  })

  describe('some items have a discounted price', function () {
    it('these ones should also have a price when converted to a ProductSummary', function () {
      const productData = {
        price: {
          now: { from: '120', to: '100' }
        }
      }
      const productSummary = new ProductSummary(productData)
      expect(productSummary.price).to.equal('100')
    })
  })
})
