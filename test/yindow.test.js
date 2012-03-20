describe('yindow', function() {

  it('should be created with a single horizontal container with a single pane', function() {
    var yindow = require('../lib/yindow').createYindow({name:'y1'});
    yindow.should.eql({name:'y1',container:{orientation:"h",items:[{url:"/yonder",index:0}]}});
  });

  describe('#find()', function() {
    it('should find the 0 index pane in a new yindow', function() {
      var yindow = require('../lib/yindow').createYindow({name:'y1'});
      yindow.find(0).should.eql({ url: '/yonder', index: 0 });
    });
  });

  describe('#hsplit()', function() {
    it('should create a second pane in the horizontal container', function() {
      var yindow = require('../lib/yindow').createYindow({name:'y1'});
      yindow.hsplit(0, { url: 'http://test' });
      yindow.should.eql({name:'y1',container:{orientation:"h",items:[{url:"/yonder","index":0},{url:"http://test",index:1}]}});
    });

    it('should create a third pane under 0 in a horizontal container', function() {
      var yindow = require('../lib/yindow').createYindow({name:'y1'});
      yindow.hsplit(0, { url: 'http://test' });
      yindow.hsplit(0, { url: 'http://third' });
      yindow.should.eql({name:"y1",container:{orientation:"h",items:[{orientation:"h",items:[{url:"/yonder",index:0},{url:"http://third",index:2}]},{url:"http://test",index:1}]}});
    });

    it('should correctly split a vertical container', function() {
      var yindow = require('../lib/yindow').createYindow({name:'y1'});
      yindow.vsplit(0, { url: 'http://1' });
      yindow.hsplit(1, { url: 'http://2' });
      yindow.should.eql({name:"y1",container:{orientation:"v",items:[{url:"/yonder",index:0},{orientation:"h",items:[{url:"http://1",index:1},{url:"http://2",index:2}]}]}});
    });

    it('should correctly split a vertical container already in a horizontal container', function() {
      var yindow = require('../lib/yindow').createYindow({name:'y1'});
      yindow.hsplit(0, { url: 'http://1' });
      yindow.vsplit(0, { url: 'http://2' });

      yindow.hsplit(0, { url: 'http://0' });
      yindow.should.eql({"container":{"orientation":"h","items":[{"orientation":"v","items":[{"orientation":"h","items":[{"url":"/yonder","index":0},{"url":"http://0","index":3}]},{"url":"http://2","index":2}]},{"url":"http://1","index":1}]},"name":"y1"});
    });
  });

  describe('#vsplit()', function() {
    it('should correctly split a horizontal container', function() {
      var yindow = require('../lib/yindow').createYindow({name:'y1'});
      yindow.hsplit(0, { url: 'http://1' });
      yindow.vsplit(0, { url: 'http://2' });
      yindow.should.eql({name:"y1",container:{orientation:"h",items:[{orientation:"v",items:[{url:"/yonder",index:0},{url:"http://2",index:2}]},{url:"http://1",index:1}]}});
    });
  });
});