var Pane = require('../lib/pane')
  , events = require('events')

describe('Pane', function () {
  it('should emit when created', function(done) {
    var ee = new events.EventEmitter()
      , tmpAddedPane
    ee.on('paneAdded', function (addedPane) {
      tmpAddedPane = addedPane
      done()
    })
    var pane = new Pane(ee)
    pane.should.equal(tmpAddedPane)
  })

  describe('setContent()', function () {
    it('should have a setContent function', function() {
      var ee = new events.EventEmitter()
        , pane = new Pane(ee)
      pane.setContent.should.be.type('function')
    })

    it('should emit event when called', function(done) {
      var ee = new events.EventEmitter()
        , pane = new Pane(ee)
      pane.on('setContent', function (self) {
        self.should.equal(pane)
        done()
      })
      pane.setContent({})
    })

    it('should set properties provided', function() {
      var ee = new events.EventEmitter()
        , pane = new Pane(ee)
      pane.setContent(
        { url: 'foo'
        , refresh: 1
        , html: 'bar'})
      pane.url.should.equal('foo')
      pane.refresh.should.equal(1)
      pane.html.should.equal('bar')
    })

    it('should only set properties provided', function() {
      var ee = new events.EventEmitter()
        , pane = new Pane(ee)
      pane.setContent(
        { url: 'foo'
        , refresh: 1
        , html: 'bar'})
      pane.setContent(
        { url: 'foo2'
        , html: 'bar2'})
      pane.url.should.equal('foo2')
      pane.refresh.should.equal(1)
      pane.html.should.equal('bar2')
      pane.setContent(
        { url: 'foo3'
        , refresh: 3 })
      pane.url.should.equal('foo3')
      pane.refresh.should.equal(3)
      pane.html.should.equal('bar2')
    })
  })
})