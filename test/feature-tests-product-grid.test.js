const chai = require('chai')
const request = require('supertest')
const cheerio = require('cheerio')
const nock = require('nock')

const expect = chai.expect

const app = require('../app.js')
const agent = request.agent(app)

describe('"dishwashers" results page', function () {
  describe('if the api sends a good response', function () {
    let $

    before(function (done) {
      nock('https://api.johnlewis.com/v1/products')
        .get('/search?key=Wu1Xqn3vNrd1p7hqkvB6hEu0G9OrsYGb&pageSize=20&q=dishwasher')
        .reply(200, require('./mockApiResponses/dishwashers.json'))

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
        const productId = '1391191'
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

      it('the image links to the product details page', function () {
        const link = productElement.find('a.image-frame')
        expect(link.attr('href')).to.equal('/product/1391191')
      })
    })

    after(function (done) {
      app.server.close()
      done()
    })
  })

  describe('if the api returns an error', function () {
    let response

    before(function (done) {
      nock('https://api.johnlewis.com/v1/products')
        .get('/search?key=Wu1Xqn3vNrd1p7hqkvB6hEu0G9OrsYGb&pageSize=20&q=dishwasher')
        .replyWithError('Something went wrong with the api request')

      agent.get('/dishwashers')
        .end(function (err, res) {
          response = res.text
          done()
        })
    })

    it('displays an error message', function () {
      expect(response).to.contain('Something went wrong with the api request')
    })

    after(function (done) {
      app.server.close()
      done()
    })
  })
})
