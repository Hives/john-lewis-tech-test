const apiQuery = {
  productsApi: 'https://api.johnlewis.com/v1/products',

  key: 'Wu1Xqn3vNrd1p7hqkvB6hEu0G9OrsYGb',

  construct: function (opts) {
    let params = opts.parameters || {}
    params.key = params.key || this.key

    const query = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&')

    return `${this.productsApi}/${opts.stub}?${query}`
  }
}

module.exports = apiQuery
