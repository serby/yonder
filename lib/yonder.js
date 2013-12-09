var yindow = require('./yindow')
  , events = require('events')
  , _ = require('lodash')

module.exports.createYonder = function(yonder) {

  // Tolerant of arrays of yonders, objects, or undefined
  if (!Array.isArray(yonder)) yonder = _.extend({}, yonder);

  var yindows = {}
    , self = new events.EventEmitter();

  function addYindow(yindow) {
    yindows[yindow.name] = yindow;
    self.emit('change');
    return yindow;
  }

  function toArray() {
    return Object.keys(yindows).map(function (yindow) {
      return yindows[yindow]
    });
  }

  function find(name) {
    return yindows[name];
  }

  function getNextName() {
    return 'y' + (Object.keys(yindows).length + 1);
  }

  function createYindow(options) {
    if (typeof options === 'undefined') options = { name: getNextName() }

    return addYindow(yindow.createYindow(options));
  }

  if (yonder.container) {
    createYindow(yonder);
  } else if (Array.isArray(yonder)) {
    yonder.map(createYindow)
  }

  self.createYindow = createYindow;
  self.find = find;
  self.toArray = toArray;

  return self;
};