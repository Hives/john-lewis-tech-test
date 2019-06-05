const chai = require('chai')
const expect = chai.expect
const request = require('supertest')

const app = require('../app.js')
const agent = request.agent(app)

describe('Test the root route', () => {
  it('"/" route exists', (done) => {
    agent.get('/')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        done()
      })
  })
})
