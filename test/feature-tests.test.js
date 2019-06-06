const chai = require('chai')
const request = require('supertest')
const cheerio = require('cheerio')

const expect = chai.expect

const app = require('../app.js')
const agent = request.agent(app)

describe('Test the "dishwashers" results page', () => {
  it('"/dishwashers" route returns the product listing page', (done) => {
    agent.get('/dishwashers')
      .end((err, res) => {
        const $ = cheerio.load(res.text)
        const heading = $('h1')
        expect(heading.text()).to.contain('Dishwashers')
        done()
      })
  })
})
