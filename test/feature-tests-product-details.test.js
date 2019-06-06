const chai = require('chai')
const request = require('supertest')
const cheerio = require('cheerio')
const nock = require('nock')

const expect = chai.expect

const app = require('../app.js')
const agent = request.agent(app)

nock('https://api.johnlewis.com/v1/products')
  .get('/1391191?key=Wu1Xqn3vNrd1p7hqkvB6hEu0G9OrsYGb')
  .reply(200, require('./mockApiResponses/product-1391191.json'))

describe('product details page', function () {
  let $

  before(function (done) {
    agent.get('/product/1391191')
      .end(function (err, res) {
        $ = cheerio.load(res.text)
        done()
      })
  })

  it('"/product/:productID" route returns productId\'s details page', function () {
    const heading = $('h1')
    expect(heading.text()).to.contain('Indesit DIF 04B1 Ecotime Fully Integrated Dishwasher, White')
  })
})
