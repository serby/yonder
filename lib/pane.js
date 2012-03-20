var _ = require('underscore')
  , events = require('events');

module.exports.createPane = function(options) {

  options = _.extend({ url: '/yonder' }, options);
  var self = new events.EventEmitter();

  self.url = options.url;

  function set(data) {
    self.url = data.url;
    self.refresh = data.refresh;
    self.html = data.html;
    self.emit('set', self);
  }

  Object.defineProperty(self, 'set', { value: set });

  return self;
};