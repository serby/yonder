var _ = require('underscore')
  , events = require('events');

module.exports.createPane = function(options) {

  options = _.extend({}, options);
  var self = new events.EventEmitter();

  function set(url, refresh) {
    self.url = url;
    self.refresh = refresh;
    self.emit('set', self);
  }
  self.set = set;

  return self;
};