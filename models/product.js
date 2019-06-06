class Product {
  constructor (data) {
    this.productId = data.productId
    this.title = data.title
    this.price = data.price.now
    this.image = data.image
  }
}

module.exports = Product
