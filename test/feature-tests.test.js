const chai = require('chai')
const request = require('supertest')
const cheerio = require('cheerio')
const nock = require('nock')

const expect = chai.expect

const app = require('../app.js')
const agent = request.agent(app)

nock('https://api.johnlewis.com/v1/products')
  .get('/search?q=dishwasher&key=Wu1Xqn3vNrd1p7hqkvB6hEu0G9OrsYGb&pageSize=20')
  .reply(200, require('./mockApiResponses/dishwashers.json'))

describe('"dishwashers" results page', function () {
  let $

  before(function (done) {
    agent.get('/dishwashers')
      .end(function (err, res) {
        $ = cheerio.load(res.text)
        done()
      })
  })

  it('"/dishwashers" route returns the dishwashers product grid page', function () {
    const heading = $('h1')
    expect(heading.text()).to.contain('Dishwashers')
  })

  describe('"/dishwashers" route displays details of a dishwasher', function () {
    let productElement
    let productHtml

    before(function () {
      const productId = "1391191"
      productElement = $(`[data-product-id=${productId}]`)
      productHtml = productElement.html()
    })

    it('contains an element with a particular data-product-id attribute', function () {
      expect(productElement.length).to.equal(1)
    })

    it('displays the product title', function () {
      expect(productHtml).to.contain('Indesit DIF 04B1 Ecotime Fully Integrated Dishwasher, White')
    })

    it('displays the product price', function () {
      expect(productHtml).to.contain('219.00')
    })

    it('displays the product image', function () {
      const imageElement = productElement.find('img')
      expect(imageElement.attr('src')).to.equal('//johnlewis.scene7.com/is/image/JohnLewis/233326789?')
    })
  })
})
