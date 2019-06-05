const chai = require('chai')
const expect = chai.expect
const request = require('supertest')

const app = require('../app.js')
const agent = request.agent(app)

describe('Test the "dishwashers" results page', () => {
  it('"/dishwashers" route returns the product listing page', (done) => {
    agent.get('/dishwashers')
      .end((err, res) => {
        expect(res.text).to.contain('<h1>Dishwashers</h1>')
        done()
      })
  })
})
