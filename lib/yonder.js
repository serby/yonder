var yindow = require('./yindow');

module.exports.createYonder = function(yonder) {

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
  } else if (Array.isArray(yonder)) {
    yonder.map(createYindow)
  }

  self.createYindow = createYindow;
  self.find = find;

  return self;
};