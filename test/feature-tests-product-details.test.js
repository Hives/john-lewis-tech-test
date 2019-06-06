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

  it('exists', function (done) {
    agent.get('/product?productId=1391191')
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        done()
      })
  })


})
