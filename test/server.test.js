var request = require('request')
  , async = require('async');

function nullFn() {}

var nullLogger = {
  info: nullFn,
  warn: nullFn,
  error: nullFn,
  log: nullFn,
  verbose: nullFn
};

describe('server', function() {

  describe('GET /', function() {
    it('should redirect to y1', function(done) {
      var server = require('../expressServer').createServer({ logger: nullLogger })
        , i = 0
        , paths = [];

      server.start();

      async.until(function() {
        return i === 5;
      }, function(callback) {
        i++;
        request('http://localhost:4031/', function (error, response, body) {
          response.statusCode.should.equal(200);
          paths.push(response.request.path);
          callback();
        });
      }, function() {
        paths.should.eql(['/y1', '/y2', '/y3', '/y4', '/y5']);
        done();
      });
    });
  });

});