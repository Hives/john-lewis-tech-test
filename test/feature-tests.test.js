const chai = require('chai')
const request = require('supertest')
const cheerio = require('cheerio')

const expect = chai.expect

const app = require('../app.js')
const agent = request.agent(app)

describe('Test the "dishwashers" results page', function () {
  let $

  before(function (done) {
    agent.get('/dishwashers')
      .end(function (err, res) {
        $ = cheerio.load(res.text)
        done()
      })
  })

  it('"/dishwashers" route returns the product listing page', function () {
    const heading = $('h1')
    expect(heading.text()).to.contain('Dishwashers')
  })

  describe('"/dishwashers" route contains details of dishwashers', function () {
    it('contains an element with a particular data-product-id attribute', function () {
      const productId = 1391191
      const productElement = $(`[data-product-id=${productId}]`)
      expect(productElement.length).to.equal(1)
    })
  })
})
