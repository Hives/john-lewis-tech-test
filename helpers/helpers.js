const helpers = {
  mockApiDataIfNoDataReturned: function(data) {
    if (process.env.NODE_ENV != "test") {
      if (data.body.products === undefined) {
        console.log("The API didn't return any data, so we'll use the saved data")
        data.body = require('../test/mockApiResponses/dishwashers.json')
      } else {
        console.log("Using the API response data")
      }
    }
    return data
  }
}

module.exports = helpers
