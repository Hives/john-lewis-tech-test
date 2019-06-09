const chai = require('chai')
const request = require('supertest')
const cheerio = require('cheerio')
const nock = require('nock')

const expect = chai.expect

const app = require('../app.js')
const agent = request.agent(app)

let $

describe('product details page', function () {
  before(function (done) {
    nock('https://api.johnlewis.com/v1/products')
      .get('/2135702?key=Wu1Xqn3vNrd1p7hqkvB6hEu0G9OrsYGb')
      .reply(200, require('./mockApiResponses/product-2135702.json'))

    agent.get('/product/2135702')
      .end(function (err, res) {
        $ = cheerio.load(res.text)
        done()
      })
  })

  it('"/product/:productID" route returns productId\'s details page', function () {
    const heading = $('h1')
    console.log($)
    expect(heading.text()).to.contain('Hotpoint LTB4B019 Aquarius Integrated Dishwasher, White')
  })

  describe('a particular product page', function () {
    let productElement
    let productHtml

    before(function () {
      productElement = $('.standard-product-container')
      productHtml = productElement.html()
    })

    it('displays the product image', function () {
      const firstImage = productElement.find('img')
      expect(firstImage.attr('src')).to.equal('//johnlewis.scene7.com/is/image/JohnLewis/234676712?')
    })

    it('displays the product price', function () {
      expect(productHtml).to.contain('219.00')
    })

    it('displays the special offer details', function () {
      expect(productHtml).to.contain('Receive a 100 day money back guarantee')
    })

    it('displays the guarantee details', function () {
      expect(productHtml).to.contain('2 year guarantee included')
    })

    it('displays the product code', function () {
      expect(productHtml).to.contain('88702102')
    })

    describe('product information', function () {
      it('displays the product information', function () {
        expect(productHtml).to.contain('the Hotpoint LTB4B019 integrated dishwasher is a value packed washing machine')
      })

      it('the html in the product info is not escaped', function () {
        const productInfoHtml = productElement.find('.product-information').text()
        expect(productInfoHtml).not.to.contain('<p>')
      })
    })

    describe('attributes', function () {
      it('displays the product\'s first attribute', function () {
        expect(productHtml).to.contain('Eligible for International Delivery')
        expect(productHtml).to.contain('No')
      })

      it('displays the product\'s last attribute', function () {
        expect(productHtml).to.contain('Estimated Annual Water Consumption')
        expect(productHtml).to.contain('3080L')
      })
    })

    it('has a back button', function () {
      const backButton = $('a.back-button')
      expect(backButton.attr('href')).to.equal('/dishwashers')
    })
  })

  after(function(done) {
    app.server.close()
    done()
  })
})

describe('if the api returns an error', function () {
  before(function(done) {
    nock('https://api.johnlewis.com/v1/products')
      .get('/2135702?key=Wu1Xqn3vNrd1p7hqkvB6hEu0G9OrsYGb')
      .replyWithError('Something went wrong with the api request')

    agent.get('/product/2135702')
      .end(function (err, res) {
        $ = cheerio.load(res.text)
        done()
      })
  })

  it('displays an error message', function () {
    expect($.text()).to.contain('Something went wrong with the api request')
  })

  after(function(done) {
    app.server.close()
    done()
  })
})
