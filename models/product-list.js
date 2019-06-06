class ProductList {
  constructor (data, ProductSummary = require('./product-summary.js')) {
    this.ProductSummary = ProductSummary
    this.items = data.products.map(
      productData => new this.ProductSummary(productData)
    )
  }
}

module.exports = ProductList
