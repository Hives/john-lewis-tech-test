const chai = require('chai')
const expect = chai.expect
const ProductList = require('../models/product-list.js')

describe('ProductList class', function () {
  it('converts api data into a list of ProductSummaries', function () {
    class ProductSummaryMock {
      constructor (data) {
        this.mockProperty = data.mockProperty
      }
    }
    const mockData = {
      products: [
        { mockProperty: 'first item' },
        { mockProperty: 'second item' }
      ]
    }
    const productList = new ProductList(mockData, ProductSummaryMock)
    expect(productList.items[0].mockProperty).to.equal('first item')
    expect(productList.items[1].mockProperty).to.equal('second item')
  })
})
