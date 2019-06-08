const chai = require('chai')
const request = require('supertest')
const cheerio = require('cheerio')
const nock = require('nock')

const expect = chai.expect

const app = require('../app.js')
const agent = request.agent(app)

nock('https://api.johnlewis.com/v1/products')
  .get('/2135702?key=Wu1Xqn3vNrd1p7hqkvB6hEu0G9OrsYGb')
  .reply(200, require('./mockApiResponses/product-2135702.json'))

describe('product details page', function () {
  let $

  before(function (done) {
    agent.get('/product/2135702')
      .end(function (err, res) {
        $ = cheerio.load(res.text)
        done()
      })
  })

  it('"/product/:productID" route returns productId\'s details page', function () {
    const heading = $('h1')
    expect(heading.text()).to.contain("Hotpoint LTB4B019 Aquarius Integrated Dishwasher, White")
  })

  describe('a particular product page', function () {
    let productElement

    before(function () {
      productElement = $('.standard-product-container')
    })

    it('displays the product image', function () {
      const firstImage = productElement.find('img')
      expect(firstImage.attr('src')).to.equal("//johnlewis.scene7.com/is/image/JohnLewis/234676712?")
    })
  })

  // image
  // price
  // special offer details (present/not present)
  // guarantee information (present/not present?)
  // product information
  // product code
  // attributes
})
