var _ = require('lodash')
  , events = require('events');

module.exports.createPane = function(options) {

  options = _.extend({ url: '/yonder' }, options);
  var self = new events.EventEmitter();

  function set(data) {
    self.url = data.url;
    if (data.refresh) {
      self.refresh = data.refresh;
    }

    if (data.html) {
      self.html = data.html;
    }

    self.emit('set', self);
  }

  Object.defineProperty(self, 'set', { value: set });

  set(options);

  return self;
};