class ProductDetails {
  constructor (data) {
    this.productId = data.productId
    this.title = data.title
    this.price = data.price.now.to || data.price.now
    this.images = data.media.images.urls
    this.code = data.code
    this.productInformation = data.details.productInformation
    this.displaySpecialOffer = data.displaySpecialOffer
    this.includedServices = data.additionalServices.includedServices
    this.attributes = data.details.features[0].attributes.map(a => {
      a.value = a.value === 'YES' ? 'Yes' : a.value
      a.value = a.value === 'NO' ? 'No' : a.value
      return a
    })
  }
}

module.exports = ProductDetails
