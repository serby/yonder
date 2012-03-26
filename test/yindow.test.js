describe('yindow', function() {

  it('should be created with a yindow called y1 with a single horizontal container with a single pane', function() {
    var yindow = require('../lib/yindow').createYindow({name:'y1'});
    yindow.container.orientation.should.eql('h');
    yindow.name.should.eql('y1');
    yindow.container.items.length.should.eql(1);
  });

  describe('#find()', function() {
    it('should find the 0 index pane in a new yindow', function() {
      var yindow = require('../lib/yindow').createYindow({name:'y1'});
      yindow.find(0).url.should.eql('/yonder');
    });
  });

  describe('#hsplit()', function() {
    it('should create a second pane in the horizontal container', function() {
      var yindow = require('../lib/yindow').createYindow({name:'y1'});
      yindow.hsplit(0, { url: 'http://test' });
      yindow.container.orientation.should.eql('h');
      yindow.container.items.length.should.eql(2);
    });

    it('should create a third pane under 0 in a horizontal container', function() {
      var yindow = require('../lib/yindow').createYindow({name:'y1'});
      yindow.hsplit(0, { url: 'http://test' });
      yindow.hsplit(0, { url: 'http://third' });
      yindow.container.orientation.should.eql('h');
      yindow.container.items.length.should.eql(2);
      yindow.container.items[0].items.length.should.eql(2);
    });

    it('should correctly split a vertical container', function() {
      var yindow = require('../lib/yindow').createYindow({name:'y1'});
      yindow.vsplit(0, { url: 'http://1' });
      yindow.hsplit(1, { url: 'http://2' });
      yindow.container.orientation.should.eql('v');
      yindow.container.items[1].items[1].url.should.eql('http://2');
    });

    it('should correctly split a vertical container already in a horizontal container', function() {
      var yindow = require('../lib/yindow').createYindow({name:'y1'});
      yindow.hsplit(0, { url: 'http://1' });
      yindow.vsplit(0, { url: 'http://2' });

      yindow.hsplit(0, { url: 'http://0' });
      yindow.container.orientation.should.eql('h');
      yindow.container.items[0].orientation.should.eql('v');
    });
  });

  describe('#vsplit()', function() {
    it('should correctly split a horizontal container', function() {
      var yindow = require('../lib/yindow').createYindow({name:'y1'});
      yindow.hsplit(0, { url: 'http://1' });
      yindow.vsplit(0, { url: 'http://2' });
      yindow.container.orientation.should.eql('h');
      yindow.container.items[0].orientation.should.eql('v');
    });
  });
});