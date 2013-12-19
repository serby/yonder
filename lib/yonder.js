var _ = require('underscore')
  , yindow = require('./yindow')
  , events = require('events');

module.exports.createYonder = function(options) {

  options = _.extend({}, options);

  var yindows = {}
    , self = new events.EventEmitter();

  function addYindow(yindow) {
    self.emit('add', yindow);
    return yindows[yindow.name] = yindow;
  }

  function find(name) {
    return yindows[name];
  }

  function getNextName() {
    return 'y' + (Object.keys(yindows).length + 1);
  }

  function createYindow(name) {
    return addYindow(yindow.createYindow({ name: name || getNextName() }));
  }

  self.createYindow = createYindow;
  self.find = find;
  self.yindows = yindows;

  return self;
};