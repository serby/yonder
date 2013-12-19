var yindow = require('./yindow')
  , events = require('events')
  , _ = require('lodash')

module.exports.createYonder = function(opts) {

  var options = _.extend({}, opts)

  var yindows = {}
    , self = new events.EventEmitter()

  function addYindow(yindow) {
    self.emit('add', yindow)
    return yindows[yindow.name] = yindow
  }

  function toArray() {
    return Object.keys(yindows).map(function (yindow) {
      return yindows[yindow]
    })
  }

  function find(name) {
    return yindows[name]
  }

  function getNextName() {
    return 'y' + (Object.keys(yindows).length + 1)
  }

  function createYindow(options) {
    if (typeof options === 'undefined') options = { name: getNextName() }

    return addYindow(yindow.createYindow(options))
  }

  function deleteYindow(name) {
    delete yindows[name]
  }

  // Moved to load function for easy
  function load(yonder) {
    // Tolerant of arrays of yonders, objects, or undefined
    if (!Array.isArray(yonder)) yonder = _.extend({}, yonder)

    if (yonder.container) {
      createYindow(yonder)
    } else if (Array.isArray(yonder)) {
      yonder.map(createYindow)
    }
  }

  self.createYindow = createYindow
  self.deleteYindow = deleteYindow
  self.find = find
  self.toArray = toArray
  self.load = load

  return self
}
