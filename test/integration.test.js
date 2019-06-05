const chai = require('chai')
const expect = chai.expect
const request = require('supertest')

const app = require('../app.js')
const agent = request.agent(app)

describe('Test the "dishwashers" results page', () => {
  it('"/dishwashers" route exists', (done) => {
    agent.get('/dishwashers')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        done()
      })
  })
})
