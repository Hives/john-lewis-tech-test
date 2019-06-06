class ProductList {
  constructor (data, productSummaryConstructor = require('./product-summary.js')) {
    this.productSummaryConstructor = productSummaryConstructor
    this.items = data.products.map(
      productData => new this.productSummaryConstructor(productData)
    )
  }
}

module.exports = ProductList
