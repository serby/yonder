var _ = require('lodash')
  , events = require('events')
  , noop = function() {}
  , nullLogger = {
    debug: noop
  }
function Pane(yindow, options) {
  events.EventEmitter.call(this)
  this.options = _.extend(
    { url: '/yonder'
    , logger: nullLogger
    }, options)
  this.yindow = yindow

  // how often the pane refreshes. Default is never.
  this.refresh = 0

  this.url = ''
  this.html = ''

  yindow.emit('paneAdded', this)
}

Pane.prototype = Object.create(events.EventEmitter.prototype)

Pane.prototype.setContent = function (data) {

  this.options.logger.debug('set pane', data)

  if (data.url) {
    this.url = data.url
  }

  if (data.refresh) {
    this.refresh = data.refresh
  }

  if (data.html) {
    this.html = data.html
  }

  this.emit('setContent', this)
}

module.exports = Pane