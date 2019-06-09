const chai = require('chai')
const expect = chai.expect
const ProductDetails = require('../models/product-details.js')

describe('ProductDetails class', function () {
  const productData = require('./mockApiResponses/product-2135702.json')
  const productDetails = new ProductDetails(productData)

  it('has a productId', function () {
    expect(productDetails.productId).to.equal('2135702')
  })

  it('has a title', function () {
    expect(productDetails.title).to.equal('Hotpoint LTB4B019 Aquarius Integrated Dishwasher, White')
  })

  it('has a price', function () {
    expect(productDetails.price).to.equal('219.00')
  })

  // need to also deal with the case where for example
  // data.price.now == { then: 100, now, 80 }

  it('has an array of images', function () {
    expect(productDetails.images.length).to.equal(9)
    expect(productDetails.images[8]).equal('//johnlewis.scene7.com/is/image/JohnLewis/234676712alt7?')
  })

  it('has a product code', function () {
    expect(productDetails.code).to.equal('88702102')
  })

  it('has some product information', function () {
    expect(productDetails.productInformation).to.contain('the Hotpoint LTB4B019 integrated dishwasher is a value packed washing machine')
  })

  it('has special offer info', function () {
    expect(productDetails.displaySpecialOffer).to.equal('Receive a 100 day money back guarantee')
  })
  // also need at test for when special offer info is empty?

  it('has an array of additional services', function () {
    expect(productDetails.includedServices.length).to.equal(1)
    expect(productDetails.includedServices[0]).to.equal('2 year guarantee included')
  })

  it('has an array of attributes', function () {
    expect(productDetails.attributes.length).to.equal(31)
  })

  describe('.attributes', function () {
    it('have a name', function () {
      expect(productDetails.attributes[1].name).to.equal('Dimensions')
    })

    it('have a value', function () {
      expect(productDetails.attributes[1].value).to.equal('H82 x W59.5 x D57 cm')
    })

    it('if the value is "YES" in the api response, then it should appear as "Yes"', function () {
      expect(productDetails.attributes[12].value).to.equal('Yes')
    })

    it('if the value is "NO" in the api response, then it should appear as "No"', function () {
      expect(productDetails.attributes[0].value).to.equal('No')
    })
  })

  describe('some items have a discounted price', function () {
    it('these ones should also have a price when converted to a ProductSummary', function () {
      const productDataDiscounted = productData
      productDataDiscounted.price = {
          now: { from: '120', to: '100' }
      }
      const productDetailsDiscounted = new ProductDetails(productDataDiscounted)
      expect(productDetailsDiscounted.price).to.equal('100')
    })
  })
})
