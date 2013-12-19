var _ = require('lodash')
  , yindow = require('./yindow');

module.exports.createYonder = function(yonder) {

  yonder = _.extend({}, yonder);

  var yindows = {}
    , self = {};

  function addYindow(yindow) {
    return yindows[yindow.name] = yindow;
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
  }

  self.createYindow = createYindow;
  self.find = find;
  self.yindows = yindows;

  return self;
};