class ProductDetails {
  constructor (data) {
    this.productId = data.productId
    this.title = data.title
    this.price = data.price.now
    this.images = data.media.images.urls
    this.code = data.code
    this.productInformation = data.details.productInformation
    this.displaySpecialOffer = data.displaySpecialOffer
    this.includedServices = data.additionalServices.includedServices
    this.attributes = data.details.features[0].attributes
  }
}

module.exports = ProductDetails
