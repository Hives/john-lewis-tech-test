function mockApiDataIfNoDataReturned (body, queryUrl, file) {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`Made a GET request to ${queryUrl}`)
    if (body === undefined || body.crumbs === undefined) {
      console.log("The API didn't return any data, so we'll use the saved data")
      body = require(`../test/mockApiResponses/${file}`)
    } else {
      console.log('Using the API response data')
    }
  }
  return body
}

module.exports = mockApiDataIfNoDataReturned
