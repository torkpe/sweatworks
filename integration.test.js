const request = require('supertest');
const { Lambda } = require('aws-sdk')

const lambda = new Lambda({
  apiVersion: '2015-03-31',
  // endpoint needs to be set only if it deviates from the default, e.g. in a dev environment
  // process.env.SOME_VARIABLE could be set in e.g. serverless.yml for provider.environment or function.environment
  endpoint: 'http://localhost:3002'
});
// const expect = require('chai').expect;
const getSlsOfflinePort = 3005;

describe('getAsyncConcat', function getAsyncConcatTest() {

  it('ok', function it(done) {
    request(`http://localhost:${getSlsOfflinePort}`)
      .get(`/get-authors`)
      .expect(200)
      .end(function (error, result) {
        if (error) {
          return done(error);
        }

        console.log(result)

        // expect(result.body.result).to.deep.eq("it works");
        done();
      });
  });

});