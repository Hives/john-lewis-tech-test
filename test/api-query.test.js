const chai = require('chai')
const expect = chai.expect
const apiQuery = require('../helpers/api-query.js')

describe('apiQuery object', function () {
  const key = apiQuery.key

  describe('.construct method', function () {
    it('can construct the URL for a product search query', function () {
      const url = apiQuery.construct({
        stub: 'search',
        parameters: {
          q: 'dishwasher',
          pageSize: 20
        }
      })
      expect(url).to.equal(`https://api.johnlewis.com/v1/products/search?key=${key}&pageSize=20&q=dishwasher`)
    })

    it('can construct the URL for a product details query', function () {
      const url = apiQuery.construct({
        stub: '123456'
      })
      expect(url).to.equal(`https://api.johnlewis.com/v1/products/123456?key=${key}`)
    })
  })
})
