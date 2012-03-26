var request = require('request')
  , async = require('async');

describe('server', function() {

  describe('GET /', function() {
    it('should redirect to y1', function(done) {
      require('../server');
      var i = 0
        , paths = [];
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