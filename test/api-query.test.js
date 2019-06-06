const chai = require('chai')
const expect = chai.expect
const apiQuery = require('../helpers/api-query.js')

describe('apiQuery object', function () {
  describe('.construct method', function () {
    it('can construct the URL for a product search query', function () {
      url = apiQuery.construct({
        stub: "search",
        parameters: {
          searchTerm: "dishwasher",
          key: "Wu1Xqn3vNrd1p7hqkvB6hEu0G9OrsYGb",
          pageSize: 20
        }
      })
      expect(url).to.equal("https://api.johnlewis.com/v1/products/search?q=dishwasher&key=Wu1Xqn3vNrd1p7hqkvB6hEu0G9OrsYGb&pageSize=20")
    })
  })
})
